import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ScanSearch, Upload, Loader2, Sparkles } from 'lucide-react';
// `?url` makes Vite emit these as fingerprinted static assets instead of trying to
// transform the emscripten glue code as an app module (which breaks on its worker/thread setup).
import ortWasmUrl from 'onnxruntime-web/ort-wasm-simd-threaded.wasm?url';
import ortWasmMjsUrl from 'onnxruntime-web/ort-wasm-simd-threaded.mjs?url';

type Status = 'idle' | 'loading' | 'detecting' | 'done';

interface Prediction {
  bbox: [number, number, number, number];
  class: string;
  score: number;
}

const DEFAULT_IMG =
  'https://images.pexels.com/photos/378570/pexels-photo-378570.jpeg?auto=compress&cs=tinysrgb&w=1000';

const INPUT_SIZE = 640;
const SCORE_THRESHOLD = 0.3;

const MODEL_URL = `${import.meta.env.BASE_URL}models/yolo26s.onnx`;

const COCO_CLASSES = [
  'person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat',
  'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat',
  'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'backpack',
  'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball',
  'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket',
  'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple',
  'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair',
  'couch', 'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse',
  'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 'toaster', 'sink', 'refrigerator',
  'book', 'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush',
];

// Loaded lazily on first run so onnxruntime-web never bloats the initial page load.
// `any` keeps us from importing the heavy types statically.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let ortModule: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let sessionPromise: Promise<any> | null = null;

async function loadSession() {
  if (!sessionPromise) {
    sessionPromise = (async () => {
      const ort = await import('onnxruntime-web/wasm');
      ortModule = ort;
      // Single-threaded wasm needs no COOP/COEP headers, so it works on plain static hosting.
      ort.env.wasm.wasmPaths = { mjs: ortWasmMjsUrl, wasm: ortWasmUrl };
      ort.env.wasm.numThreads = 1;
      return ort.InferenceSession.create(MODEL_URL, { executionProviders: ['wasm'] });
    })();
  }
  return sessionPromise;
}

// Resizes into a padded 640x640 square (letterbox) the way YOLO26 was trained/exported,
// and returns the info needed to map boxes back to the original image's pixel space.
function preprocess(img: HTMLImageElement) {
  const w = img.naturalWidth;
  const h = img.naturalHeight;
  const scale = Math.min(INPUT_SIZE / w, INPUT_SIZE / h);
  const nw = Math.round(w * scale);
  const nh = Math.round(h * scale);
  const padX = (INPUT_SIZE - nw) / 2;
  const padY = (INPUT_SIZE - nh) / 2;

  const canvas = document.createElement('canvas');
  canvas.width = INPUT_SIZE;
  canvas.height = INPUT_SIZE;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgb(114,114,114)';
  ctx.fillRect(0, 0, INPUT_SIZE, INPUT_SIZE);
  ctx.drawImage(img, 0, 0, w, h, padX, padY, nw, nh);

  const { data: pixels } = ctx.getImageData(0, 0, INPUT_SIZE, INPUT_SIZE);
  const plane = INPUT_SIZE * INPUT_SIZE;
  const chw = new Float32Array(3 * plane);
  for (let i = 0; i < plane; i++) {
    chw[i] = pixels[i * 4] / 255;
    chw[plane + i] = pixels[i * 4 + 1] / 255;
    chw[2 * plane + i] = pixels[i * 4 + 2] / 255;
  }
  return { data: chw, scale, padX, padY };
}

// YOLO26 is end-to-end (NMS-free): output is already the final [x1,y1,x2,y2,score,class]
// rows in the padded 640x640 space, so we just threshold and undo the letterbox.
function postprocess(
  output: Float32Array,
  scale: number,
  padX: number,
  padY: number,
): Prediction[] {
  const predictions: Prediction[] = [];
  const rows = output.length / 6;
  for (let i = 0; i < rows; i++) {
    const o = i * 6;
    const score = output[o + 4];
    if (score < SCORE_THRESHOLD) continue;
    const x1 = (output[o] - padX) / scale;
    const y1 = (output[o + 1] - padY) / scale;
    const x2 = (output[o + 2] - padX) / scale;
    const y2 = (output[o + 3] - padY) / scale;
    const cls = Math.round(output[o + 5]);
    predictions.push({
      bbox: [x1, y1, x2 - x1, y2 - y1],
      class: COCO_CLASSES[cls] ?? `class ${cls}`,
      score,
    });
  }
  return predictions;
}

// Collapses raw predictions into "name x3" tallies, most frequent first.
function groupByClass(predictions: Prediction[]): { name: string; count: number }[] {
  const tally = new Map<string, number>();
  predictions.forEach((p) => tally.set(p.class, (tally.get(p.class) ?? 0) + 1));
  return [...tally.entries()]
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));
}

const LiveDetection: React.FC = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [count, setCount] = useState<number | null>(null);
  const [detected, setDetected] = useState<{ name: string; count: number }[]>([]);
  const [src, setSrc] = useState(DEFAULT_IMG);
  const autoRunOnLoad = useRef(false);

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (canvas && ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const draw = (predictions: Prediction[]) => {
    const img = imgRef.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const fontSize = Math.max(16, Math.round(canvas.width / 45));
    ctx.lineWidth = Math.max(2, Math.round(canvas.width / 320));
    ctx.font = `600 ${fontSize}px "Fira Code", monospace`;

    predictions.forEach((p) => {
      const [x, y, w, h] = p.bbox;
      // box
      ctx.strokeStyle = '#22d3ee';
      ctx.shadowColor = 'rgba(34,211,238,0.8)';
      ctx.shadowBlur = 12;
      ctx.strokeRect(x, y, w, h);
      ctx.shadowBlur = 0;

      // label
      const label = `${p.class} ${(p.score * 100).toFixed(0)}%`;
      const tw = ctx.measureText(label).width;
      const ty = y > fontSize + 6 ? y : y + h;
      ctx.fillStyle = '#22d3ee';
      ctx.fillRect(x - ctx.lineWidth / 2, ty - fontSize - 6, tw + 12, fontSize + 6);
      ctx.fillStyle = '#05080f';
      ctx.fillText(label, x + 6, ty - 6);
    });
  };

  const runDetection = async () => {
    const img = imgRef.current;
    if (!img) return;

    setStatus(sessionPromise ? 'detecting' : 'loading');
    setCount(null);
    setDetected([]);
    clearCanvas();

    try {
      const session = await loadSession();
      setStatus('detecting');

      // Ensure the image is fully decoded before inference
      if (!img.complete) await new Promise((r) => (img.onload = r));

      const { data, scale, padX, padY } = preprocess(img);
      const input = new ortModule.Tensor('float32', data, [1, 3, INPUT_SIZE, INPUT_SIZE]);
      const feeds = { [session.inputNames[0]]: input };
      const results = await session.run(feeds);
      const output = results[session.outputNames[0]].data as Float32Array;
      const predictions = postprocess(output, scale, padX, padY);

      draw(predictions);
      setCount(predictions.length);
      setDetected(groupByClass(predictions));
      setStatus('done');
    } catch (err) {
      console.error('Detection failed:', err);
      setStatus('idle');
      sessionPromise = null;
    }
  };

  // Auto-run detection once the newly uploaded image has actually loaded into the DOM.
  useEffect(() => {
    if (autoRunOnLoad.current) {
      autoRunOnLoad.current = false;
      runDetection();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    clearCanvas();
    setCount(null);
    setDetected([]);
    setStatus('idle');
    autoRunOnLoad.current = true;
    setSrc(URL.createObjectURL(file));
  };

  const busy = status === 'loading' || status === 'detecting';

  return (
    <section id="live-demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-dark-950 relative">
      <div className="absolute inset-0 bg-detect-grid opacity-40" />
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-12">
          <span className="section-tag mb-4">// live_demo</span>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-serif text-dark-900 dark:text-white">
            Try <span className="gradient-text">Object Detection</span> Live
          </h2>
          <p className="text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
            A real object-detection model (YOLO26 + ONNX Runtime Web) running entirely in your
            browser — no server. Upload your own image and watch the bounding boxes appear
            immediately.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="glass-card p-4 sm:p-6">
            <div className="relative rounded-lg overflow-hidden border border-primary-500/30">
              <img
                ref={imgRef}
                src={src}
                crossOrigin="anonymous"
                alt="Detection sample"
                className="w-full h-auto block"
              />
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full pointer-events-none"
              />
              {busy && (
                <div className="absolute inset-0 flex items-center justify-center bg-dark-950/60 backdrop-blur-sm">
                  <div className="flex items-center gap-3 text-primary-300 font-mono text-sm">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {status === 'loading' ? 'Loading model…' : 'Detecting…'}
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-5">
              <div className="font-mono text-sm text-dark-600 dark:text-dark-400 min-h-[1.25rem]">
                {status === 'done' && count !== null && (
                  <span className="text-secondary-300 flex items-center gap-2">
                    <Sparkles size={15} /> {count} object{count === 1 ? '' : 's'} detected
                  </span>
                )}
                {status === 'idle' && count === null && 'Ready when you are.'}
              </div>

              <div className="flex items-center gap-3">
                <label className="btn-secondary cursor-pointer text-sm">
                  <Upload size={16} className="mr-2" /> Upload image
                  <input type="file" accept="image/*" className="hidden" onChange={onUpload} />
                </label>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={runDetection}
                  disabled={busy}
                  className="btn-primary text-sm disabled:opacity-60"
                >
                  <ScanSearch size={16} className="mr-2" /> Run detection
                </motion.button>
              </div>
            </div>

            {status === 'done' && detected.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-primary-500/10">
                {detected.map((d) => (
                  <span
                    key={d.name}
                    className="inline-flex items-center gap-1.5 font-mono text-xs py-1 px-2.5 rounded-full bg-primary-500/10 border border-primary-500/30 text-primary-300"
                  >
                    {d.name}
                    {d.count > 1 && <span className="text-primary-500/70">×{d.count}</span>}
                  </span>
                ))}
              </div>
            )}
          </div>

          <p className="text-center text-xs text-dark-500 font-mono mt-4">
            First run downloads the model (~37&nbsp;MB) — give it a few seconds. Demo uses
            YOLO26-small (NMS-free, end-to-end); my production system uses YOLO + BoT-SORT.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LiveDetection;
