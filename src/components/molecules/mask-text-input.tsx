import { NumericFormat, PatternFormat } from "react-number-format";
import MyTextInput, { MyTextInputProps } from "../atoms/my-text-input";
import React, { ComponentType } from "react";

type MaskTextInputProps = {
  inputMask?: keyof typeof maskMap;
} & MyTextInputProps &
  (React.ComponentProps<typeof NumericFormat> | React.ComponentProps<typeof PatternFormat>);

const maskMap = {
  cpf: "###.###.###-##",
  cnpj: "##.###.###/####-##",
  date: "##/##/####",
  phone: "(##) #####-####"
};

const MaskTextInput = React.forwardRef<HTMLInputElement, MaskTextInputProps>(
  (
    { inputMask, ...props },
    ref,
  ) => {
    return (
      <>
        {inputMask ? (
          <PatternFormat
            getInputRef={ref}
            customInput={MyTextInput as ComponentType<unknown>}
            format={maskMap[inputMask]}
            {...props}
          />
        ) : (
          <NumericFormat
            getInputRef={ref}
            customInput={MyTextInput as ComponentType<unknown>}
            thousandSeparator='.'
            decimalSeparator=','
            {...props}
          />
        )}
      </>
    );
  }
)

export default MaskTextInput;
