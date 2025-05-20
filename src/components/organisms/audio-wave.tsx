"use client";

import { useMemo } from "react";

interface AudioWaveformProps {
  currentTime: number;
  isPlaying: boolean;
  duration: number;
}

export default function AudioWaveform({
  currentTime,
  isPlaying,
  duration,
}: AudioWaveformProps) {
  // Gera um padrão fixo de 15 barras
  const wavePattern = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => {
      const baseHeight = 0.5 + Math.sin(i * 0.5) * 0.3;
      const randomVariation = Math.random() * 0.2;
      return Math.max(0.3, Math.min(0.8, baseHeight + randomVariation));
    });
  }, []);

  // Calcula qual barra deve estar colorida baseado no progresso normalizado
  const activeBarIndex = Math.floor(
    (currentTime / duration) * wavePattern.length
  );

  return (
    <div className="flex-1 flex items-center gap-[2px] h-8">
      {wavePattern.map((height, index) => (
        <div
          key={index}
          className={`w-[3px] rounded-full transition-colors duration-150 ${
            index <= activeBarIndex ? "bg-white" : "bg-white/30"
          }`}
          style={{
            height: `${height * 24}px`,
          }}
        />
      ))}
    </div>
  );
}
