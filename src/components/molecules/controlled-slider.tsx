/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import MySlider from '../atoms/my-slider';

type ControlledSliderProps = {
    control: Control<any>;
    name: string;
} & React.ComponentProps<typeof MySlider>

export default function ControlledSlider({ control, name, ...rest }: ControlledSliderProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <MySlider {...rest}
                    value={field.value}
                    onValueChange={(e) => field.onChange(e[0])}
                />
            )}
        />
    )
}
