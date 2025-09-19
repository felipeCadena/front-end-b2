"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";
import { cn } from "@/utils/cn";

function PriceRangeSlider({
  value,
  onChange,
  min = 0,
  max = 2000,
  step = 50,
}: {
  value: number[];
  onChange: (val: number[]) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const safeValue: [number, number] = [
    Number.isFinite(value?.[0]) ? Number(value[0]) : min,
    Number.isFinite(value?.[1]) ? Number(value[1]) : max,
  ];

  // Estados de texto para permitir digitação livre (com estados intermediários)
  const [minText, setMinText] = React.useState<string>(() =>
    String(safeValue[0])
  );
  const [maxText, setMaxText] = React.useState<string>(() =>
    String(safeValue[1])
  );
  const [minFocused, setMinFocused] = React.useState(false);
  const [maxFocused, setMaxFocused] = React.useState(false);

  // Sincroniza texto quando o valor vem de fora (slider, props), evitando mexer enquanto focado
  React.useEffect(() => {
    if (!minFocused) setMinText(String(safeValue[0]));
    if (!maxFocused) setMaxText(String(safeValue[1]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [safeValue[0], safeValue[1], minFocused, maxFocused]);

  const commitMin = () => {
    const n = Number(minText.replace(",", "."));
    const parsed = Number.isFinite(n) ? n : safeValue[0]; // se vazio/NaN, mantém atual
    const clamped = Math.max(min, Math.min(parsed, safeValue[1])); // [min, maxAtual]
    setMinText(String(clamped));
    onChange([clamped, safeValue[1]]);
    setMinFocused(false);
  };

  const commitMax = () => {
    const n = Number(maxText.replace(",", "."));
    const parsed = Number.isFinite(n) ? n : safeValue[1];
    const clamped = Math.min(max, Math.max(parsed, safeValue[0])); // [minAtual, max]
    setMaxText(String(clamped));
    onChange([safeValue[0], clamped]);
    setMaxFocused(false);
  };

  const onMinKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      commitMin();
    }
    if (e.key === "Escape") {
      setMinText(String(safeValue[0]));
      e.currentTarget.blur();
    }
  };

  const onMaxKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
      commitMax();
    }
    if (e.key === "Escape") {
      setMaxText(String(safeValue[1]));
      e.currentTarget.blur();
    }
  };

  return (
    <div className="space-y-6">
      <p className="font-bold">Valor da atividade:</p>

      {/* Inputs */}
      <div className="flex gap-4">
        <div className="relative max-w-40">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium">
            R$
          </span>
          <input
            type="number"
            className="w-full rounded-md border  pl-10 pr-1 py-2 text-left font-medium"
            value={minFocused ? minText : String(safeValue[0])}
            onFocus={() => setMinFocused(true)}
            onChange={(e) => setMinText(e.target.value)} // não clampa aqui!
            onBlur={commitMin} // só valida no commit
            onKeyDown={onMinKeyDown}
            placeholder="R$"
            min={min}
            max={safeValue[1]}
          />
        </div>
        <div className="relative max-w-40 ">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 font-medium">
            R$
          </span>
          <input
            type="number"
            className="w-full rounded-md border py-2  pl-10 pr-1 text-left font-medium"
            placeholder="R$"
            value={maxFocused ? maxText : String(safeValue[1])}
            onFocus={() => setMaxFocused(true)}
            onChange={(e) => setMaxText(e.target.value)}
            onBlur={commitMax}
            onKeyDown={onMaxKeyDown}
            min={safeValue[0]}
            max={max}
          />
        </div>
      </div>

      {/* Slider */}
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onValueChange={(val) => {
          const newVal: [number, number] = [
            Number.isFinite(val[0]) ? val[0] : min,
            Number.isFinite(val[1]) ? val[1] : max,
          ];
          onChange(newVal);
        }}
        className={cn(
          "relative flex w-full touch-none select-none items-center"
        )}
      >
        <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-gray-200">
          <SliderPrimitive.Range className="absolute h-full bg-primary-600" />
        </SliderPrimitive.Track>
        {safeValue.map((_, i) => (
          <SliderPrimitive.Thumb
            key={i}
            className="block size-5 rounded-full border border-gray-300 bg-white shadow hover:ring-4 hover:ring-green-200 focus:outline-none"
          />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
}

export { PriceRangeSlider };
