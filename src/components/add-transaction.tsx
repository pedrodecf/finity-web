import { cn } from "@/lib/utils";
import * as LucideIcons from "lucide-react";

type TAddButton = {
  className?: string;
  title: string;
  description: string;
  icon: string;
};

export default function AddButton({
  className,
  title,
  icon,
  description,
}: TAddButton) {
  const IconElement = LucideIcons[
    icon as keyof typeof LucideIcons
  ] as React.ElementType;

  return (
    <div
      className={cn(
        "flex h-full items-center rounded-lg bg-card p-4 gap-4 tablet:gap-2 group cursor-pointer border border-border text-left",
        className
      )}
    >
      <div className="rounded-lg bg-primary p-3 flex items-center gap-4 ">
        <IconElement
          size={38}
          className="text-white group-hover:scale-110 duration-500 ease-out "
        />
      </div>

      <div>
        <h2 className="font-semibold text-lg mobile:text-base truncate">{title}</h2>
        <p className="text-sub text-[13px] truncate">{description}</p>
      </div>
    </div>
  );
}
