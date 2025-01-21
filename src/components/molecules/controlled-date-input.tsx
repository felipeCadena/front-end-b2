/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import DateInput from './date-input';

type ControlledDateInputProps = {
    control: Control<any>;
    name: string;
} & Omit<React.ComponentProps<typeof DateInput>, 'onDateChange'>;

export default function ControlledDateInput({ control, name, ...rest }: ControlledDateInputProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState: { error } }) => (
                <DateInput
                    {...rest}
                    onDateChange={field.onChange}
                    date={field.value}
                    stateColor={error && "error"}
                    hint={error?.message}
                />
            )}
        />
    );
}
