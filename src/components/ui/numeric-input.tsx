"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";
//@ts-ignore
import { Button, Group, Input, NumberField } from "react-aria-components";

export default function NumericInput({
  value,
  onChange,
  minValue,
  maxValue,
}: {
  value: number;
  onChange: (value: number) => void;
  minValue?: number;
  maxValue?: number;
}) {
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (newValue: number) => {
    if (minValue !== undefined && newValue < minValue) return;
    if (maxValue !== undefined && newValue > maxValue) return;
    setInternalValue(newValue);
    onChange(newValue);
  };

  return (
    <NumberField
      value={internalValue}
      onChange={handleChange}
      minValue={minValue}
      maxValue={maxValue}
    >
      <Group className="relative inline-flex h-9 w-full items-center overflow-hidden whitespace-nowrap rounded-lg border border-input text-sm shadow-sm shadow-black/5 ring-offset-background transition-shadow data-[focus-within]:border-ring data-[disabled]:opacity-50 data-[focus-within]:outline-none data-[focus-within]:ring-2 data-[focus-within]:ring-ring/30 data-[focus-within]:ring-offset-2">
        <Button
          slot="decrement"
          className="-ms-px flex aspect-square h-[inherit] items-center justify-center rounded-s-lg border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          onMouseDown={() => handleChange(internalValue - 1)}
        >
          <Minus size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
        <Input
          className="w-full grow bg-background px-3 py-2 text-center tabular-nums text-foreground focus:outline-none"
          value={internalValue}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleChange(Number(e.target.value))
          }
        />
        <Button
          slot="increment"
          className="-me-px flex aspect-square h-[inherit] items-center justify-center rounded-e-lg border border-input bg-background text-sm text-muted-foreground/80 ring-offset-background transition-shadow hover:bg-accent hover:text-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
          onMouseDown={() => handleChange(internalValue + 1)}
        >
          <Plus size={16} strokeWidth={2} aria-hidden="true" />
        </Button>
      </Group>
    </NumberField>
  );
}
