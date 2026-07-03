import React, { useEffect, useState } from 'react';

/**
 * Lightweight typewriter that cycles through a list of phrases:
 * types a phrase, pauses, deletes it, then moves to the next.
 * No external dependency — just a small state machine.
 */
interface TypingTextProps {
  phrases: string[];
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseMs?: number;
}

const TypingText: React.FC<TypingTextProps> = ({
  phrases,
  className = '',
  typingSpeed = 70,
  deletingSpeed = 35,
  pauseMs = 1400,
}) => {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];

    if (!deleting && text === current) {
      const t = setTimeout(() => setDeleting(true), pauseMs);
      return () => clearTimeout(t);
    }

    if (deleting && text === '') {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
      return;
    }

    const next = deleting
      ? current.slice(0, text.length - 1)
      : current.slice(0, text.length + 1);

    const t = setTimeout(() => setText(next), deleting ? deletingSpeed : typingSpeed);
    return () => clearTimeout(t);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pauseMs]);

  return (
    <span className={className}>
      {text}
      <span className="inline-block w-0.5 -mb-1 h-[1em] bg-primary-400 animate-blink ml-0.5 align-middle" />
    </span>
  );
};

export default TypingText;
