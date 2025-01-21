/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import MyCheckbox from '../atoms/my-checkbox';

type ControlledCheckboxProps = {
    control: Control<any>;
    name: string;
} & React.ComponentProps<typeof MyCheckbox>

export default function ControlledCheckbox({ control, name, ...rest }: ControlledCheckboxProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <MyCheckbox {...rest}
                    checked={field.value}
                    onCheckedChange={(e) => field.onChange(e)}
                />
            )}
        />
    )
}
