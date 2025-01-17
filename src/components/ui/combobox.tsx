"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Label } from "./label";

interface ComboboxOption {
  value: number;
  label: string;
}

interface ComboboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  data: ComboboxOption[];
  label?: string;
  variant?: "default" | "filter";
  placeholder?: string;
  className?: string;
  helperText?: string;
  readOnly?: boolean;
  tooltipMessage?: string;
  size?: "default" | "sm" | "lg";
}

const comboboxButtonVariants = cva(
  "inline-flex items-center justify-between gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        default: "h-10 px-3 py-1",
        sm: "h-8 px-2 text-xs",
        lg: "h-10 px-4",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export function Combobox<T extends FieldValues>({
  control,
  name,
  data,
  label,
  variant = "default",
  placeholder = "Selecione uma opção",
  className,
  helperText,
  readOnly,
  tooltipMessage,
  size = "default",
}: ComboboxProps<T>) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const [open, setOpen] = React.useState(false);
        const inputId = React.useId();

        const selectedOption = React.useMemo(() => {
          return data.find((d) => d.value === value);
        }, [data, value]);

        const selectedLabel = selectedOption ? selectedOption.label : "";

        return (
          <div className={cn("flex flex-col gap-2 w-full", className)}>
            {label && (
              <div className={cn("flex items-center gap-2")}>
                <Label htmlFor={inputId}>{label}</Label>
              </div>
            )}

            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={readOnly}
                  className={cn(comboboxButtonVariants({ size }))}
                >
                  {selectedLabel || placeholder}
                  <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                  <CommandInput placeholder="Pesquisar..." />
                  <CommandList>
                    <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
                    <CommandGroup>
                      {data.map((d) => (
                        <CommandItem
                          key={d.value}
                          value={d.value.toString()}
                          onSelect={() => {
                            onChange(d.value);
                            setOpen(false);
                          }}
                        >
                          {d.label}
                          <Check
                            className={cn(
                              "ml-auto h-4 w-4",
                              value === d.value ? "opacity-100" : "opacity-0"
                            )}
                          />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
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
