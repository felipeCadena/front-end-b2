"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/utils/cn"

function PriceRangeSlider({
  value,
  onChange,
  min = 0,
  max = 1000,
  step = 50,
}: {
  value: number[]
  onChange: (val: number[]) => void
  min?: number
  max?: number
  step?: number
}) {
  const safeValue = value ?? [min, max]

  return (
    <div className="space-y-6">
      <p className="bold">Valor da atividade:</p>

      {/* Inputs */}
      <div className="flex gap-4">
        <input
          type="number"
          className="w-full rounded-md border px-3 py-2 text-center font-medium"
          value={value[0]}
          onChange={(e) => {
            const raw = Number(e.target.value)
            if (isNaN(raw)) return // ignora valores inválidos
            const v = Math.min(raw, safeValue[1])
            onChange([v, safeValue[1]])
          }}
        />
        <input
          type="number"
          className="w-full rounded-md border px-3 py-2 text-center font-medium"
          value={value[1]}
          onChange={(e) => {
            const raw = Number(e.target.value)
            if (isNaN(raw)) return
            const v = Math.max(raw, safeValue[0])
            onChange([safeValue[0], v])
          }}
        />
      </div>

      {/* Slider */}
      <SliderPrimitive.Root
        min={min}
        max={max}
        step={step}
        value={safeValue}
        onValueChange={onChange}
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
  )
}

export { PriceRangeSlider }
