import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Mask, masks } from "@/lib/mask";
import { cn } from "@/lib/utils";
import { Label } from "./label";

type InputProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> &
    React.RefAttributes<HTMLInputElement> & {
      label?: string;
      helperText?: string;
      name: Path<T>;
      control: Control<T, unknown>;
      mask?: Mask;
    };

export const Input = <T extends FieldValues>({
  label,
  helperText,
  name,
  control,
  className,
  mask,
  ...props
}: InputProps<T>) => {
  const inputId = React.useId();

  return (
    <div className="flex flex-col gap-2 w-full">
      {label && (
        <div className={cn("flex items-center gap-2")}>
          <Label htmlFor={inputId}>{label}</Label>
        </div>
      )}
      <div className="">
        <Controller
          name={name!}
          control={control}
          render={({ field: { ref, value, onChange, ...field } }) => (
            <input
              id={inputId}
              value={mask ? masks(mask, value) : value || ""}
              onChange={(e) =>
                onChange(mask ? masks(mask, e.target.value) : e.target.value)
              }
              className={cn(
                "flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
              )}
              style={{
                WebkitBoxShadow: "0 0 0 1000px transparent inset",
                boxShadow: "0 0 0 1000px transparent inset",
              }}
              autoComplete="off"
              {...field}
              {...props}
              ref={ref}
            />
          )}
        />
      </div>
      {helperText && (
        <p className="text-xs text-red-500 font-normal mt-1">{helperText}</p>
      )}
    </div>
  );
};
