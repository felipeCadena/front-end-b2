/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import MaskTextInput from "./mask-text-input";
import React from 'react';

type ControlledTextInputWithMaskProps = {
  control: Control<any>;
  name: string;
} & React.ComponentProps<typeof MaskTextInput>;

const ControlledTextInputWithMask = React.forwardRef<HTMLInputElement, ControlledTextInputWithMaskProps>(
  (
    { control, name, ...rest },
    ref,
  ) => {
    return (
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <MaskTextInput
            {...rest}
            value={value}
            ref={ref}
            onValueChange={({ value }) => onChange(value)}
            stateColor={error && "error"}
            hint={error?.message}
          />
        )}
      />
    );
  }
)

export default ControlledTextInputWithMask