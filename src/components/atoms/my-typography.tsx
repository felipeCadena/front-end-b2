import { cn } from "@/utils/cn";
import { type VariantProps, cva } from "class-variance-authority";

const typographyMap = cva("", {
  variants: {
    variant: {
      heading1: "text-[2rem]",
      heading2: "text-[1.5rem]",
      heading3: "text-[1.3rem]",
      heading6: "text-[1.725rem] leading-9",
      subtitle1: "md:text-[1.525rem] text-[1.125rem] leading-7",
      subtitle2: "text-[1.125rem] ",
      subtitle3: "text-[1rem] ",
      "body-big": "text-[0.9rem]",
      body: "md:text-[0.875rem] text-[0.775rem]",
      "body-small": "md:text-[0.825rem] text-[0.675rem]",
      button: "text-[0.775rem] ",
      caption: "text-[0.625rem]",
      label: "text-[0.875rem]",
    },
    weight: {
      light: "font-light",
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
      semibold: "font-semibold",
      extrabold: "font-extrabold"
    },
    lightness: {
      white: "text-neutral-000",
      400: "text-neutral-400",
      500: "text-neutral-500",
      600: "text-neutral-600",
      700: "text-neutral-700",
      800: "text-neutral-800",
      900: "text-neutral-900",
      1000: "text-neutral-1000",
    },
  },
  defaultVariants: {
    variant: "body",
    weight: "regular",
    lightness: 1000,
  },
});

type MyTypographyProps = {
  as?: keyof HTMLElementTagNameMap;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof typographyMap>;

export default function MyTypography({
  as,
  weight,
  children,
  className,
  lightness,
  variant,
}: MyTypographyProps) {
  const Component = as || "div";

  return (
    <Component className={cn(typographyMap({ variant, weight, lightness, className }))}>
      {children}
    </Component>
  );
}
