import Eye from './my-icon/elements/eye';
import Hide from './my-icon/elements/hide';
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
import MyTextInput from './my-text-input';

import { Skeleton } from './my-skeleton';
import { cn } from '@/utils/cn';
import {
  formatCardNumber,
  formatCEP,
  formatCpfCnpj,
  formatPhoneNumber,
} from '@/utils/formatters';

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
  readonly isCpfCnpj?: boolean;
  readonly isCEP?: boolean;
  readonly isCardNumber?: boolean;
  readonly isPhoneNumber?: boolean;
  readonly placeholder?: string;
  readonly className?: string;
  readonly labelClassname?: string;
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
  readonly type?: HTMLInputTypeAttribute;
  readonly inputPadding?: string;
};

export default function MyFormInput<T extends FieldValues>({
  form,
  name,
  withMask,
  maskFormat,
  numeric,
  isCpfCnpj,
  isCardNumber,
  isCEP,
  isPhoneNumber,
  suffix,
  prefix,
  decimalScale = 2,
  className,
  type = 'text',
  label = '',
  placeholder = label ?? '',
  isLoading = false,
  disabled = false,
  inputPadding = 'pl-4',
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
          <FormControl>
            {withMask ? (
              !numeric ? (
                <PatternFormat
                  disabled={disabled}
                  placeholder={placeholder}
                  value={field.value}
                  customInput={MyTextInput}
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
                  customInput={MyTextInput}
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
                <MyTextInput
                  {...field}
                  value={field.value}
                  onChange={(e) => {
                    const rawValue = e.target.value;
                    let formattedValue = rawValue;

                    if (isCpfCnpj) {
                      formattedValue = formatCpfCnpj(rawValue);
                    } else if (isPhoneNumber) {
                      formattedValue = formatPhoneNumber(rawValue);
                    } else if (isCEP) {
                      formattedValue = formatCEP(rawValue);
                    } else if (isCardNumber) {
                      formattedValue = formatCardNumber(rawValue);
                    }

                    field.onChange({
                      target: {
                        name,
                        value: formattedValue,
                      },
                    });
                  }}
                  type={showPassword ? 'text' : type}
                  placeholder={placeholder}
                  disabled={disabled}
                  inputPadding={inputPadding}
                  label={label}
                  className="mt-2"
                />
                {type === 'password' && (
                  <MyButton
                    type="button"
                    variant="ghost"
                    className="absolute right-0 top-8 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <Hide aria-hidden="true" />
                    ) : (
                      <Eye aria-hidden="true" />
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

function LoadingState({ className }: { className?: string; label?: string }) {
  return (
    <FormItem className={cn('w-full', className)}>
      <Skeleton className="h-10 w-full bg-neutral-200" />
    </FormItem>
  );
}
