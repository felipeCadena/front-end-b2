/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import { MyRadioGroup } from '../atoms/my-radio-group';

type ControlledRadioGroupProps = {
    control: Control<any>;
    name: string;
} & React.ComponentProps<typeof MyRadioGroup>

export default function ControlledRadioGroup({ control, name, ...rest }: ControlledRadioGroupProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <MyRadioGroup {...rest}
                    value={field.value}
                    onValueChange={(e) => field.onChange(e)}
                />
            )}
        />
    )
}
