import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "@/utils/cn";

const MyBreadcrumb = React.forwardRef<
  HTMLElement,
  React.ComponentPropsWithoutRef<"nav"> & {
    separator?: React.ReactNode;
  }
>(({ ...props }, ref) => (
  <nav
    ref={ref}
    aria-label='breadcrumb'
    {...props}
  />
));

const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<"ol">>(
  ({ className, ...props }, ref) => (
    <ol
      ref={ref}
      className={cn(
        "flex flex-wrap items-center gap-1.5 break-words text-sm text-neutral-600 sm:gap-2.5",
        className,
      )}
      {...props}
    />
  ),
);

const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<"li">>(
  ({ className, ...props }, ref) => (
    <li
      ref={ref}
      className={cn("inline-flex items-center gap-1.5", className)}
      {...props}
    />
  ),
);

const BreadcrumbLink = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a"> & {
    asChild?: boolean;
  }
>(({ asChild, className, ...props }, ref) => {
  const Comp = asChild ? Slot : "a";

  return (
    <Comp
      ref={ref}
      className={cn("transition-colors hover:text-gray-700", className)}
      {...props}
    />
  );
});

const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      ref={ref}
      role='link'
      aria-disabled='true'
      aria-current='page'
      className={cn("font-normal text-gray-700", className)}
      {...props}
    />
  ),
);

const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<"li">) => (
  <li
    role='presentation'
    aria-hidden='true'
    className={cn("text-lg text-gray-300 [&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? ">"}
  </li>
);

const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    role='presentation'
    aria-hidden='true'
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    {"..."}
    <span className='sr-only'>More</span>
  </span>
);

export {
  MyBreadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
