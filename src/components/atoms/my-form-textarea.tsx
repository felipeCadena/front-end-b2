import React from "react";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./my-form";
import MyTextarea from "./my-textarea";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";

type Props<T extends FieldValues> = {
  readonly form: UseFormReturn<T>;
  readonly name: Path<T>;
};

const MyFormTextarea = <T extends FieldValues>({ form, name }: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormControl>
            <MyTextarea
              {...field}
              stateColor={fieldState.error ? "error" : "warning"}
              hint={fieldState.error?.message}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default MyFormTextarea;
