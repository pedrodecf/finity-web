"use client";

import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";
import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Label } from "./label";
import { RadioGroup, RadioGroupItem } from "./primitive/radio-group";

interface RadioAvatarOption {
  value: string;
}

interface RadioAvatarProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  data: RadioAvatarOption[];
  className?: string;
  helperText?: string;
  readOnly?: boolean;
  label?: string;
  size?: "default" | "sm" | "lg";
}

export function RadioAvatar<T extends FieldValues>({
  control,
  name,
  data,
  className,
  helperText,
  label,
  readOnly,
  size = "default",
}: RadioAvatarProps<T>) {
  const inputId = React.useId();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const serializedValue = value ? String(value) : "";

        return (
          <div className={cn("flex flex-col gap-3", className)}>
            {label && (
              <div className="flex items-center gap-2">
                <Label htmlFor={inputId}>{label}</Label>
              </div>
            )}
            <RadioGroup
              value={serializedValue}
              onValueChange={(val) => {
                onChange(val);
              }}
              disabled={readOnly}
              className="flex flex-wrap gap-4"
            >
              {data.map((item) => {
                const IconComponent = (LucideIcons[
                  item.value as keyof typeof LucideIcons
                ] || LucideIcons.HelpCircle) as React.ElementType;

                const isSelected = serializedValue === item.value;

                return (
                  <div key={item.value}>
                    <RadioGroupItem
                      value={item.value}
                      id={`radio-avatar-${item.value}`}
                      className="hidden"
                    />
                    <label
                      htmlFor={`radio-avatar-${item.value}`}
                      className={cn(
                        "flex items-center justify-center rounded-lg border transition-colors cursor-pointer p-2",
                        readOnly && "cursor-not-allowed opacity-70",
                        isSelected
                          ? "border-input bg-primary"
                          : "border-input hover:bg-primary"
                      )}
                    >
                      <IconComponent size={24} />
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
          </div>
        );
      }}
    />
  );
}
