/* eslint-disable @typescript-eslint/no-explicit-any */
import { Control, Controller } from "react-hook-form";
import MySlider from '../atoms/my-slider';
import MyTextInput from '../atoms/my-text-input';

type ControlledSliderProps = {
    control: Control<any>;
    name: string;
} & React.ComponentProps<typeof MySlider> & React.ComponentProps<typeof MyTextInput>;

export default function ControlledSliderWithInput({ control, name, ...rest }: ControlledSliderProps) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => (
                <>
                    <MySlider {...rest}
                        value={[field.value]}
                        onValueChange={(e) => field.onChange(e[0])}
                    />
                    <MyTextInput
                        {...rest}
                        value={field.value}
                        placeholder='0'
                        type="number"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        noHintText
                    />
                </>
            )}
        />
    )
}
