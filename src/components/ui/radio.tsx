"use client";

import { cva } from "class-variance-authority";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import React from "react";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./primitive/radio-group";
// ou onde quer que você tenha colocado o arquivo base do RadioGroup

/**
 * Estrutura de dados para cada opção do radio
 */
interface RadioOption {
  value: string;
  label: string;
}

/**
 * Props inspiradas no DatePicker e Combobox:
 *
 * - `control`, `name` (react-hook-form)
 * - `label`, `placeholder`, `variant`, `readOnly`, `tooltipMessage`
 * - `helperText`, `className`
 * - `size` (sm, default, lg)
 */
interface RadioProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;

  data: RadioOption[]; // Opções a serem listadas

  label?: string;
  variant?: "default" | "filter";
  placeholder?: string; // Pode ou não ser usado (aqui, pouco usual)
  className?: string;
  helperText?: string;
  readOnly?: boolean;
  tooltipMessage?: string;
  size?: "default" | "sm" | "lg";
}

/**
 * Estilização (CVA) para o container ou para o RadioGroup
 * (ajuste conforme seu design).
 */
const radioContainerVariants = cva(
  "flex flex-col gap-2", // Classes base
  {
    variants: {
      size: {
        default: "", // Sem incremento, pois o radio group em si não aumenta
        sm: "text-sm",
        lg: "text-lg",
      },
      variant: {
        default: "",
        filter: "",
      },
    },
    defaultVariants: {
      size: "default",
      variant: "default",
    },
  }
);

export function Radio<T extends FieldValues>({
  control,
  name,
  data,
  label,
  variant = "default",
  placeholder,
  className,
  helperText,
  readOnly,
  tooltipMessage,
  size = "default",
}: RadioProps<T>) {
  const inputId = React.useId();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <div className={cn("grid gap-2", className)}>
            {label && (
              <div className={cn("flex items-center gap-2")}>
                <Label htmlFor={inputId}>{label}</Label>
              </div>
            )}

            <RadioGroup
              value={value || ""}
              onValueChange={(val) => onChange(val)}
              disabled={readOnly}
              className={cn(radioContainerVariants({ size, variant }))}
            >
              {data.map((item) => (
                <div key={item.value} className="flex items-center space-x-2">
                  <RadioGroupItem
                    value={item.value}
                    id={`radio-${item.value}`}
                  />
                  <label
                    htmlFor={`radio-${item.value}`}
                    className={cn(
                      "cursor-pointer select-none",
                      readOnly && "cursor-not-allowed opacity-70"
                    )}
                  >
                    {item.label}
                  </label>
                </div>
              ))}
            </RadioGroup>

            {helperText && (
              <p className="text-xs text-red-500 font-normal mt-1">
                {helperText}
              </p>
            )}

            {tooltipMessage && (
              <p className="text-xs text-gray-500 mt-1 italic">
                {tooltipMessage}
              </p>
            )}
          </div>
        );
      }}
    />
  );
}
