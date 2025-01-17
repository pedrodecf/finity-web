"use client";

import { cva } from "class-variance-authority";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import React from "react";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./primitive/radio-group";

interface RadioOption {
  value: string | boolean;
  label: string;
}

interface RadioProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  data: RadioOption[];
  label?: string;
  variant?: "default" | "filter";
  placeholder?: string;
  className?: string;
  helperText?: string;
  readOnly?: boolean;
  tooltipMessage?: string;
  size?: "default" | "sm" | "lg";
}

const radioContainerVariants = cva("flex flex-col gap-2", {
  variants: {
    size: {
      default: "",
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
});

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

  const parseValue = (
    val: string | undefined
  ): string | boolean | undefined => {
    if (val === "true") return true;
    if (val === "false") return false;
    return val;
  };

  const serializeValue = (val: string | boolean | undefined): string => {
    if (val === true) return "true";
    if (val === false) return "false";
    return val || "";
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const [open, setOpen] = React.useState(false);

        const serializedValue = serializeValue(value);

        return (
          <div className={cn("grid gap-2", className)}>
            {label && (
              <div className={cn("flex items-center gap-2")}>
                <Label htmlFor={inputId}>{label}</Label>
              </div>
            )}

            <RadioGroup
              value={serializedValue}
              onValueChange={(val) => {
                const parsed = parseValue(val);
                onChange(parsed);
              }}
              disabled={readOnly}
              className={cn(radioContainerVariants({ size, variant }))}
            >
              {data.map((item) => {
                const itemValue =
                  typeof item.value === "boolean"
                    ? item.value.toString()
                    : item.value;

                return (
                  <div key={itemValue} className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={itemValue}
                      id={`radio-${itemValue}`}
                      disabled={readOnly}
                    />
                    <label
                      htmlFor={`radio-${itemValue}`}
                      className={cn(
                        "cursor-pointer select-none",
                        readOnly && "cursor-not-allowed opacity-70"
                      )}
                    >
                      {item.label}
                    </label>
                  </div>
                );
              })}
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
