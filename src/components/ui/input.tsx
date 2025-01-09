import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "./label";

type InputProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> & {
    label?: string;
    helperText?: string;
    name: Path<T>;
    control: Control<T, unknown>;
  };

export const Input = <T extends FieldValues>({
  label,
  helperText,
  name,
  control,
  className,
  ...props
}: InputProps<T>) => {
  const inputId = React.useId();
  const hasError = helperText && helperText?.length > 0;

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <div className={cn("flex items-center gap-2")}>
          <Label htmlFor={inputId}>{label}</Label>
        </div>
      )}
      <div className="">
        <Controller
          name={name!}
          control={control}
          render={({ field: { ref, onChange, ...field } }) => (
            <input
              id={inputId}
              onChange={(e) => onChange(e.target.value)}
              className={cn(
                "flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                className
              )}
              {...field}
              {...props}
              ref={ref}
            />
          )}
        />
      </div>
      {hasError && (
        <p className="text-xs text-chart-5 font-normal">{helperText}</p>
      )}
    </div>
  );
};
