"use client";

import { queryClient } from "@/app/providers";
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
import { AxiosInstance } from "axios";
import { cva } from "class-variance-authority";
import { CommandLoading } from "cmdk";
import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { useInView } from "react-intersection-observer";
import { useDebounce } from "use-debounce";
import { Label } from "./label";

interface ComboboxOption {
  value: string | number;
  label: string;
}

interface ComboboxRequest {
  api: AxiosInstance;
  path: string;
  queries?: { [key: string]: any };
}

interface ComboboxProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  request?: ComboboxRequest;
  data?: ComboboxOption[];
  label?: string;
  variant?: "default" | "filter";
  placeholder?: string;
  className?: string;
  helperText?: string;
  readOnly?: boolean;
  tooltipMessage?: string;
  size?: "default" | "sm" | "lg";
  disabled?: boolean;
  preSelected?: ComboboxOption;
}

function useSelect({
  open,
  searchQuery,
  request,
  preSelected,
}: {
  open: boolean;
  searchQuery: string;
  request?: ComboboxRequest;
  preSelected?: ComboboxOption;
}) {
  const [options, setOptions] = React.useState<ComboboxOption[]>([]);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = React.useState(false);

  const fetchData = React.useCallback(
    async (pageToFetch: number, reset = false) => {
      if (!request) return;
      try {
        if (reset) {
          setOptions([]);
          setPage(1);
        }
        setLoading(true);
        const response = await request.api.get(request.path, {
          params: {
            ...request.queries,
            page: pageToFetch,
            quantity: 10,
            nome: searchQuery,
            orderBy: "nome",
            ordination: "asc",
          },
        });

        const { items = [], pages = 1 } = response.data;
        const newOptions: ComboboxOption[] = items.map((item: any) => ({
          value: item.id,
          label: item.nome,
        }));

        setOptions((prev) => (reset ? newOptions : [...prev, ...newOptions]));
        setHasNextPage(pageToFetch < pages);
      } catch {
      } finally {
        setLoading(false);
        setIsFetchingNextPage(false);
      }
    },
    [request, searchQuery]
  );

  React.useEffect(() => {
    if (request && open) {
      queryClient.invalidateQueries([request.path]);
      fetchData(1, true);
    }
  }, [open, fetchData, request]);

  function fetchNextPage() {
    if (!hasNextPage || isFetchingNextPage) return;
    setIsFetchingNextPage(true);
    setPage((p) => p + 1);
  }

  React.useEffect(() => {
    if (page > 1) {
      fetchData(page);
    }
  }, [page, fetchData]);

  React.useEffect(() => {
    if (
      preSelected &&
      !options.some((opt) => opt.value === preSelected.value)
    ) {
      setOptions((prev) => [...prev, preSelected]);
    }
  }, [preSelected, options]);

  return { options, loading, isFetchingNextPage, hasNextPage, fetchNextPage };
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
  request,
  data = [],
  label,
  variant = "default",
  placeholder = "Selecione uma opção",
  className,
  helperText,
  readOnly,
  tooltipMessage,
  size = "default",
  disabled = false,
  preSelected,
}: ComboboxProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [debouncedSearch] = useDebounce(searchText, 500);

  const {
    options: remoteOptions,
    loading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSelect({
    open,
    searchQuery: debouncedSearch,
    request,
    preSelected,
  });

  const { ref: lastItemRef, inView } = useInView();

  React.useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const finalData = request ? remoteOptions : data;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => {
        const selectedOption = finalData.find((item) => item.value === value);
        const selectedLabel = selectedOption?.label || "";

        return (
          <div className={cn("flex flex-col gap-2 w-full", className)}>
            {label && <Label>{label}</Label>}
            <Popover modal={true} open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  disabled={readOnly || disabled}
                  className={cn(comboboxButtonVariants({ size }))}
                >
                  {selectedLabel || placeholder}
                  <ChevronsUpDown className="h-4 w-4 opacity-50 shrink-0" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={5}
                className="w-[200px] p-0 pointer-events-auto"
              >
                <Command shouldFilter={false}>
                  {request && (
                    <CommandInput
                      placeholder="Pesquisar..."
                      value={searchText}
                      onValueChange={(val) => setSearchText(val)}
                    />
                  )}
                  <CommandList className="max-h-60 overflow-y-auto pointer-events-auto">
                    {loading ? (
                      <CommandLoading className="px-2 py-1.5">
                        Carregando...
                      </CommandLoading>
                    ) : (
                      <CommandEmpty>Nenhuma opção encontrada.</CommandEmpty>
                    )}
                    <CommandGroup>
                      {finalData.map((item, index) => {
                        const isLast = index === finalData.length - 1;
                        return (
                          <CommandItem
                            key={item.value}
                            ref={isLast ? lastItemRef : null}
                            value={String(item.label)}
                            onSelect={() => {
                              onChange(item.value);
                              setOpen(false);
                            }}
                          >
                            {item.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                item.value === value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        );
                      })}
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
