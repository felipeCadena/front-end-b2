import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { HTMLInputTypeAttribute, useState } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { NumericFormat, PatternFormat } from 'react-number-format';

import MyButton from './my-button';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '../atoms/my-form';
import { Input } from '@/components/ui/input';

import { Skeleton } from '../ui/skeleton';
import { cn } from '@/utils/cn';

type Props<T extends FieldValues> = {
  readonly form: UseFormReturn<T>;
  readonly name: Path<T>;

  readonly withMask?: boolean;
  readonly maskFormat?: string;
  readonly numeric?: boolean;
  readonly suffix?: string;
  readonly prefix?: string;
  readonly decimalScale?: number;
  readonly label?: string;
  readonly placeholder?: string;
  readonly className?: string;
  readonly labelClassname?: string;
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
  readonly type?: HTMLInputTypeAttribute;
};

export default function FormInput<T extends FieldValues>({
  form,
  name,
  withMask,
  maskFormat,
  numeric,
  suffix,
  prefix,
  decimalScale = 2,
  className,
  labelClassname,
  type = 'text',
  label = '',
  placeholder = label ?? '',
  isLoading = false,
  disabled = false,
}: Props<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return isLoading ? (
    <LoadingState className={className} label={label} />
  ) : (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn('w-full', className)}>
          {label && (
            <FormLabel className={cn('text-lg font-bold', labelClassname)}>
              {label}
            </FormLabel>
          )}
          <FormControl>
            {withMask ? (
              !numeric ? (
                <PatternFormat
                  disabled={disabled}
                  placeholder={placeholder}
                  value={field.value}
                  customInput={Input}
                  format={maskFormat || ''}
                  onValueChange={(values) => {
                    field.onChange({
                      target: {
                        name,
                        value: values.value,
                      },
                    });
                  }}
                />
              ) : (
                <NumericFormat
                  customInput={Input}
                  value={field.value}
                  decimalSeparator=","
                  allowedDecimalSeparators={[',', '.']}
                  decimalScale={decimalScale}
                  suffix={suffix}
                  prefix={prefix}
                  fixedDecimalScale={false}
                  placeholder={placeholder}
                  onValueChange={(values) => {
                    field.onChange({
                      target: {
                        name,
                        value: values.value,
                      },
                    });
                  }}
                />
              )
            ) : (
              <div className="relative">
                <Input
                  {...field}
                  type={showPassword ? 'text' : type}
                  placeholder={placeholder}
                  disabled={disabled}
                />
                {type === 'password' && (
                  <MyButton
                    type="button"
                    variant="ghost"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOffIcon
                        className="h-4 w-4 text-neutral-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <EyeIcon
                        className="h-4 w-4 text-neutral-400"
                        aria-hidden="true"
                      />
                    )}
                  </MyButton>
                )}
              </div>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

function LoadingState({
  className,
  label,
}: {
  className?: string;
  label?: string;
}) {
  return (
    <FormItem className={cn('w-full', className)}>
      {label && <FormLabel>{label}</FormLabel>}
      <Skeleton className="h-10 w-full bg-neutral-200" />
    </FormItem>
  );
}
