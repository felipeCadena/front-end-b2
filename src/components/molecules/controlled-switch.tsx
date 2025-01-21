/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import MySwitch from '../atoms/my-switch'

type ControlledSwitchProps = {
    control: Control<any>;
    name: string;
} & React.ComponentProps<typeof MySwitch>

export default function ControlledSwitch({ control, name, ...rest }: ControlledSwitchProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <MySwitch {...rest}
                    checked={field.value}
                    onCheckedChange={(checked) => field.onChange(checked)}
                />
            )}
        />
    )
}
