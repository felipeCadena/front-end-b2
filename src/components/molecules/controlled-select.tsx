/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import { MySelect } from '../atoms/my-select';

type ControlledSelectProps = {
    control: Control<any>;
    name: string;
} & React.ComponentProps<typeof MySelect>

export default function ControlledSelect({ control, name, ...rest }: ControlledSelectProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <MySelect {...rest}
                    value={field.value}
                    onValueChange={(e) => field.onChange(e)}
                />
            )}
        />
    )
}
