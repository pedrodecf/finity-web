"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useId, useState } from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/primitive/tooltip";
import { Label } from "./label";

interface SingleDatePickerProps<T extends FieldValues> {
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

const singleDatePickerVariants = cva(
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

export function SingleDatePicker<T extends FieldValues>({
  control,
  name,
  label,
  variant = "default",
  placeholder = "Escolha uma data",
  className,
  helperText,
  disabledDates,
  readOnly = false,
  tooltipMessage,
  size = "default",
}: SingleDatePickerProps<T>) {
  const [open, setOpen] = useState(false);
  const inputId = useId();
  const hasError = !!helperText;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange, ref } }) => {
        return (
          <div className={cn("flex flex-col gap-2", className)}>
            {label && (
              <div className="flex items-center gap-2">
                <Label htmlFor={inputId}>{label}</Label>
              </div>
            )}

            <Popover open={open} onOpenChange={setOpen}>
              <TooltipProvider delayDuration={0}>
                {readOnly ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <PopoverTrigger asChild disabled={readOnly}>
                        <Button
                          id={inputId}
                          ref={ref}
                          variant="outline"
                          className={cn(
                            singleDatePickerVariants({ size }),
                            "justify-start text-left font-normal",
                            !value && "text-muted-foreground",
                            hasError &&
                              "border-alert-error focus:border-alert-error hover:border-alert-error focus:ring-alert-error/30"
                          )}
                          disabled
                        >
                          <CalendarIcon />
                          {value ? (
                            format(value, "dd/MM/yyyy", { locale: ptBR })
                          ) : (
                            <span>{placeholder}</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{tooltipMessage}</p>
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <PopoverTrigger asChild>
                    <Button
                      id={inputId}
                      ref={ref}
                      variant="outline"
                      className={cn(
                        singleDatePickerVariants({ size }),
                        "justify-start text-left font-normal",
                        !value && "text-muted-foreground",
                        hasError &&
                          "border-alert-error focus:border-alert-error hover:border-alert-error focus:ring-alert-error/30"
                      )}
                    >
                      <CalendarIcon />
                      {value ? (
                        format(value, "dd/MM/yyyy", { locale: ptBR })
                      ) : (
                        <span>{placeholder}</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                )}
              </TooltipProvider>

              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={value}
                  onSelect={(selectedDate) => {
                    onChange(selectedDate);
                    setOpen(false);
                  }}
                  initialFocus
                  disabled={disabledDates}
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
            {tooltipMessage && !readOnly && (
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
