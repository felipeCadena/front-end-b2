import { cn } from "@/utils/cn";
import MyIcon, { IconsMapTypes } from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";

type HeadingWithIconProps = {
  iconName?: IconsMapTypes;
  heading: string;
  preheading?: string;
  subheading?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function HeadingWithIcon({
  iconName,
  heading,
  subheading,
  preheading,
  className,
  ...props
}: HeadingWithIconProps) {
  return (
    <div
      className={cn("flex items-center gap-4", className)}
      {...props}
    >
      {iconName && (
        <MyIcon
          name={iconName}
          className='[&>svg]:stroke-neutral-800'
        />
      )}
      <div className='mt-1 flex flex-col'>
        {preheading && (
          <MyTypography
            variant='body'
            weight='medium'
            lightness={600}
          >
            {preheading}
          </MyTypography>
        )}
        <MyTypography
          variant='subtitle2'
          weight='medium'
        >
          {heading}
        </MyTypography>
        {subheading && (
          <MyTypography
            variant='body'
            weight='medium'
            lightness={600}
          >
            {subheading}
          </MyTypography>
        )}
      </div>
    </div>
  );
}
