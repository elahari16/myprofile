import React from 'react';

/**
 * Wraps any content in a YOLO-style detection box: animated corner
 * brackets, a confidence label, and an optional sweeping scan line.
 * This is the signature visual motif of the portfolio.
 */
interface DetectionFrameProps {
  children: React.ReactNode;
  /** Label shown in the top-left tag, e.g. "person" */
  label?: string;
  /** Confidence value shown after the label, e.g. "0.99" */
  confidence?: string;
  /** Render the moving scan line overlay */
  scan?: boolean;
  className?: string;
}

const corner =
  'absolute w-6 h-6 border-primary-400 pointer-events-none';

const DetectionFrame: React.FC<DetectionFrameProps> = ({
  children,
  label = 'person',
  confidence = '0.99',
  scan = true,
  className = '',
}) => {
  return (
    <div className={`relative ${className}`}>
      {children}

      {/* corner brackets */}
      <span className={`${corner} top-0 left-0 border-t-2 border-l-2 rounded-tl-md`} />
      <span className={`${corner} top-0 right-0 border-t-2 border-r-2 rounded-tr-md`} />
      <span className={`${corner} bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md`} />
      <span className={`${corner} bottom-0 right-0 border-b-2 border-r-2 rounded-br-md`} />

      {/* confidence label */}
      {label && (
        <span className="absolute -top-3 left-3 z-20 font-mono text-[10px] sm:text-xs px-2 py-0.5 rounded bg-primary-500 text-dark-950 font-bold shadow-[0_0_12px_rgba(34,211,238,0.7)]">
          {label} {confidence}
        </span>
      )}

      {/* sweeping scan line */}
      {scan && (
        <div className="absolute inset-0 overflow-hidden rounded-[inherit] pointer-events-none">
          <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-300/80 to-transparent animate-scan" />
        </div>
      )}
    </div>
  );
};

export default DetectionFrame;
