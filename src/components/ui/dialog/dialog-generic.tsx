import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../dialog";

type TDialogGeneric = {
  titleIcon?: React.ReactNode;
  title?: string;
  description?: string;
  footer?: string;
};

export function DialogGeneric({
  title,
  titleIcon,
  description,
  footer,
}: TDialogGeneric) {
  return (
    <DialogContent className="max-w-[432px] p-0">
      <DialogHeader>
        {!!title && (
          <DialogTitle className="p-4 border-b border-border w-full flex items-center gap-2">
            {titleIcon}
            {title}
          </DialogTitle>
        )}
        {!!description && (
          <DialogDescription className="px-4 py-1">
            {description}
          </DialogDescription>
        )}
      </DialogHeader>
      {!!footer && <DialogFooter className="py-3 px-4 w-full flex items-center gap-2">{footer}</DialogFooter>}
    </DialogContent>
  );
}
