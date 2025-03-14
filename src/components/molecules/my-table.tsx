import { cn } from "@/utils/cn";
import * as React from "react";
import MyTypography from "../atoms/my-typography";

type MyTableProps = {
  heading?: React.ReactNode;
  headingActions?: React.ReactNode;
} & React.HTMLAttributes<HTMLTableElement>;

const MyTable = React.forwardRef<HTMLTableElement, MyTableProps>(
  ({ className, heading, headingActions, ...props }, ref) => (
    <div className={cn("relative w-full overflow-auto", className)}>
      {heading && (
        <div className="flex items-center justify-between border-b border-neutral-300 p-5">
          <MyTypography
            as="h3"
            variant="subtitle2"
            weight="medium"
            lightness={800}
          >
            {heading}
          </MyTypography>
          <div>{headingActions}</div>
        </div>
      )}
      <table
        ref={ref}
        className="w-full caption-bottom text-sm border-separate border-spacing-y-4"
        {...props}
      />
    </div>
  )
);

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "cursor-pointer border-b-2 border-gray-200 text-sm text-neutral-800",
      className
    )}
    {...props}
  />
));

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("text-neutral-700", className)} {...props} />
));

const TableFooter = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "font-medium text-neutral-600 [&>tr]:last:border-b-0",
      className
    )}
    {...props}
  />
));

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "hover:bg-muted/50 data-[state=selected]:bg-muted transition-colors",
      className
    )}
    {...props}
  />
));

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "text-muted-foreground h-12 px-4 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));

const TableCaption = React.forwardRef<
  HTMLTableCaptionElement,
  React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("text-muted-foreground mt-4 text-sm", className)}
    {...props}
  />
));

export {
  MyTable,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
