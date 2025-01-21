import { cn } from '@/utils/cn';
import { AlertDescription, MyAlert } from "../atoms/my-alert";
import MyIcon, { IconsMapTypes } from "../atoms/my-icon";
import MyTypography from "../atoms/my-typography";

const AlertCard = ({ iconName, descrition, className, ...rest }: { iconName: IconsMapTypes; descrition: React.ReactNode } &
  React.ComponentProps<typeof MyAlert>
) => {
  return (
    <MyAlert
      variant='primary'
      className={
        cn(
          'flex items-center md:justify-center gap-4 border-none py-4 md:flex-col md:items-start print:flex-col print:items-start',
          className
        )
      }
      {...rest}
    >
      <div className='flex h-14 w-14 items-center justify-center rounded-full border border-primary-500 bg-primary-100 text-primary-500'>
        <MyIcon
          name={iconName}
          variant='circled'
        />
      </div>
      <AlertDescription >
        <MyTypography weight='medium'>{descrition}</MyTypography>
      </AlertDescription>
    </MyAlert>
  );
};

export default AlertCard;
