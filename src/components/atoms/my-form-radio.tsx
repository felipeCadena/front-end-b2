import { RadioGroup } from '@radix-ui/react-radio-group';
import { RadioItem } from './my-radio-group';
import React, { HTMLInputTypeAttribute } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './my-form';
import { cn } from '@/utils/cn';

type Props<T extends FieldValues> = {
  readonly form: UseFormReturn<T>;
  readonly name: Path<T>;
  readonly options: string[];
  readonly label?: string;
  readonly placeholder?: string;
  readonly className?: string;
  readonly labelClassname?: string;
  readonly isLoading?: boolean;
  readonly disabled?: boolean;
  readonly type?: HTMLInputTypeAttribute;
};

const MyFormRadio = <T extends FieldValues>({
  form,
  name,
  className,
  type = 'text',
  label = '',
  options,
  placeholder = label ?? '',
  isLoading = false,
  disabled = false,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="space-y-3 mb-4">
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className={cn('grid gap-2', className)}
            >
              {options.map((option) => (
                <FormItem
                  key={option}
                  className="flex items-center space-x-3 space-y-0"
                >
                  <FormControl>
                    <RadioItem label={option} value={option} />
                  </FormControl>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MyFormRadio;
