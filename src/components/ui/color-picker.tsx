import * as React from "react";
import { ColorResult, SketchPicker } from "react-color";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

import { cn } from "@/lib/utils";
import { Label } from "./label";

type ColorPickerProps<T extends FieldValues> =
  React.InputHTMLAttributes<HTMLInputElement> &
    React.RefAttributes<HTMLInputElement> & {
      label?: string;
      helperText?: string;
      name: Path<T>;
      control: Control<T, unknown>;
    };

export const ColorPicker = <T extends FieldValues>({
  label,
  helperText,
  name,
  control,
  className,
  ...props
}: ColorPickerProps<T>) => {
  const inputId = React.useId();
  const [isOpen, setIsOpen] = React.useState(false);

  const popoverRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex w-full flex-col gap-2">
      {label && (
        <div className={cn("flex items-center gap-2")}>
          <Label htmlFor={inputId}>{label}</Label>
        </div>
      )}

      <Controller
        name={name}
        control={control}
        render={({ field: { ref, value, onChange, ...field } }) => {
          const handleTogglePicker = () => {
            setIsOpen((prev) => !prev);
          };

          const handleChangeColor = (color: ColorResult) => {
            onChange(color.hex); // salva em HEX
          };

          return (
            <div className="relative">
              <div className="flex items-center gap-2">
                <div
                  className="h-6 w-6 cursor-pointer rounded border border-border"
                  style={{ backgroundColor: value || "#ffffff" }}
                  onClick={handleTogglePicker}
                />

                <input
                  id={inputId}
                  ref={ref}
                  readOnly
                  value={value || ""}
                  onChange={(e) => onChange(e.target.value)}
                  onClick={handleTogglePicker}
                  className={cn(
                    "flex h-10 w-full rounded-lg border border-input bg-transparent px-3 py-1 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm cursor-pointer",
                    className
                  )}
                  {...field}
                  {...props}
                />
              </div>

              {isOpen && (
                <div ref={popoverRef} className="absolute z-10 mt-2">
                  <SketchPicker
                    color={value || "#ffffff"}
                    onChange={handleChangeColor}
                    presetColors={[]}
                    disableAlpha
                  />
                </div>
              )}
            </div>
          );
        }}
      />

      {helperText && (
        <p className="mt-1 text-xs font-normal text-red-500">{helperText}</p>
      )}
    </div>
  );
};
