import { cn } from "@/utils/cn";
import MyIcon, { IconsMapTypes } from "../atoms/my-icon";
import React from "react";
import { CardContent, CardHeader, MyCard } from "./my-card";
import { MyCollapsible, CollapsibleContent, CollapsibleTrigger } from "../atoms/my-collapsible";
import HeadingWithIcon from "./heading-with-icon";

type CollapsibleCardProps = {
  children: React.ReactNode;
  iconName?: IconsMapTypes;
  heading: string;
  subheading?: string;
  appendRight?: React.ReactNode;
  containerClassName?: string;
  defaultOpen?: boolean;
  collapsibleProps?: React.ComponentProps<typeof MyCollapsible>;
} & React.HTMLAttributes<HTMLDivElement>;

const CollapsibleCard = React.forwardRef<HTMLDivElement, CollapsibleCardProps>(
  (
    {
      className,
      containerClassName,
      collapsibleProps,
      children,
      iconName,
      heading,
      subheading,
      appendRight,
      defaultOpen = true,
      ...props
    },
    ref,
  ) => (
    <MyCard
      ref={ref}
      className={containerClassName}
    >
      <MyCollapsible
        {...collapsibleProps}
        defaultOpen={defaultOpen}
      >
        <CardHeader className='flex flex-row items-center justify-between border-none'>
          <HeadingWithIcon
            iconName={iconName}
            heading={heading}
            subheading={subheading}
          />
          <div className='ml-auto mr-10 hidden sm:block'>{appendRight}</div>
          <CollapsibleTrigger className='transition-transform data-[state=closed]:rotate-0 data-[state=open]:rotate-180'>
            <MyIcon
              name='chevron-down'
              className='print:hidden'
            />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent
            className={cn("border-t p-6 print:border-none", className)}
            {...props}
          >
            {children}
          </CardContent>
        </CollapsibleContent>
      </MyCollapsible>
    </MyCard>
  ),
);

export default CollapsibleCard;
