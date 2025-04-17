import React from 'react';
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './my-form';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import {
  MySelect,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './my-select';

type Props<T extends FieldValues> = {
  readonly form: UseFormReturn<T>;
  readonly name: Path<T>;
  readonly options: { value: string; label: string }[];
  readonly label?: string;
};

const MyFormSelect = <T extends FieldValues>({
  form,
  name,
  label = '',
  options,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <MySelect
            onValueChange={field.onChange}
            defaultValue={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger className="w-[80px]">
                <SelectValue defaultValue="1x" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </MySelect>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MyFormSelect;
