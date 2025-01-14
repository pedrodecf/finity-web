import { cn } from "@/lib/utils";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { ButtonHTMLAttributes, JSX, ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./native/tooltip";

type Side = "top" | "bottom" | "left" | "right";

type ToolTipProps = {
  text?: string;
  formattedText?: JSX.Element;
  side?: Side;
  asChild?: boolean;
  children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function ToolTip({
  text,
  formattedText,
  children,
  side = "top",
  disabled = false,
  asChild = false,
  className,
  ...props
}: ToolTipProps) {
  return (
    <TooltipProvider disableHoverableContent={false} delayDuration={0}>
      <Tooltip>
        <TooltipTrigger
          disabled={disabled}
          asChild={asChild}
          className={cn("disabled:opacity-40 cursor-pointer", className)}
          {...props}
        >
          {children}
        </TooltipTrigger>
        <TooltipContent side={side} className="border-0 bg-white text-light-0">
          {formattedText ? formattedText : <p className="text-black">{text}</p>}

          <TooltipArrow className="fill-white group:data-[state=delayed-open]:animate-in group:data-[state=instant-open]:animate-in group:data-[state=closed]:animate-out" />
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
