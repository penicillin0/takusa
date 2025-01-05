import { useCallback, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';

type Props = {
  x: number;
  y: number;
};

export const Confetti = ({ x, y }: Props) => {
  const called = useRef(false);

  const fireConfetti = useCallback(() => {
    if (called.current) return;
    called.current = true;

    confetti({
      particleCount: 100,
      spread: 70,
      origin: {
        x: x / window.innerWidth,
        y: y / window.innerHeight,
      },
      colors: ['#6366F1', '#EC4899', '#10B981', '#F59E0B', '#8B5CF6'],
      ticks: 200,
    });
  }, [x, y]);

  useEffect(() => {
    fireConfetti();
  }, [fireConfetti]);

  return null;
};
