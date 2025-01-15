"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Label } from "./label";

interface DatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  variant?: "default" | "filter";
  placeholder?: string;
  className?: string;
  helperText?: string;
  disabledDates?: (date: Date) => boolean;
  readOnly?: boolean;
  tooltipMessage?: string;
  size?: "default" | "sm" | "lg";
}

const datePickerVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      size: {
        default: "h-10 px-3 py-1",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-10 rounded-lg px-8",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export function DatePicker<T extends FieldValues>({
  control,
  name,
  label,
  variant = "default",
  placeholder = "Escolha uma data",
  className,
  helperText,
  disabledDates,
  readOnly,
  tooltipMessage,
  size = "default",
}: DatePickerProps<T>) {
  const inputId = React.useId();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        return (
          <div className={cn("flex flex-col gap-2", className)}>
            {label && (
              <div className={cn("flex items-center gap-2")}>
                <Label htmlFor={inputId}>{label}</Label>
              </div>
            )}

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    datePickerVariants({ size }),
                    "justify-start text-left font-normal",
                    !value && "text-muted-foreground"
                  )}
                  disabled={readOnly}
                >
                  <CalendarIcon />
                  {value?.from ? (
                    value?.to ? (
                      <>
                        {format(value.from, "dd/MM/yyyy", { locale: ptBR })}
                        {" - "}
                        {format(value.to, "dd/MM/yyyy", { locale: ptBR })}
                      </>
                    ) : (
                      format(value.from, "dd/MM/yyyy", { locale: ptBR })
                    )
                  ) : (
                    <span>{placeholder}</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="single"
                  defaultMonth={value?.from}
                  selected={value}
                  onSelect={onChange}
                  numberOfMonths={1}
                  locale={ptBR}
                />
              </PopoverContent>
            </Popover>

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
