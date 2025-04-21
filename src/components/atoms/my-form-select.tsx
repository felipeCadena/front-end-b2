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
  readonly disabled?: boolean;
};

const MyFormSelect = <T extends FieldValues>({
  form,
  name,
  disabled = false,
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
              <SelectTrigger disabled={disabled} className="w-[200px]">
                <SelectValue defaultValue={`1x de ${options[0]}`} />
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
