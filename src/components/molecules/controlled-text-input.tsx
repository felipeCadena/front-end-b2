/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import MyTextInput from "../atoms/my-text-input";
import React from 'react';

type ControlledTextInputProps = {
  control: Control<any>;
  name: string;
} & React.ComponentProps<typeof MyTextInput>;

const ControlledTextInput = React.forwardRef<HTMLInputElement, ControlledTextInputProps>(
  (
    { control, name, ...rest },
    ref,
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <MyTextInput
            {...field}
            {...rest}
            ref={ref}
            stateColor={error && "error"}
            hint={error?.message}
          />
        )}
      />
    );
  }
)

export default ControlledTextInput;