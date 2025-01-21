/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import MyTextarea from "../atoms/my-textarea";

type ControlledTextareaProps = {
    control: Control<any>;
    name: string;
} & React.ComponentProps<typeof MyTextarea>;

export default function ControlledTextarea({ control, name, ...rest }: ControlledTextareaProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <MyTextarea
                    {...field}
                    {...rest}
                    stateColor={error && "error"}
                    hint={error?.message}
                />
            )}
        />
    );
}
