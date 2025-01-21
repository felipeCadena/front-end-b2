'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import { MySelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../atoms/my-select';
import { Control, Controller, useFormContext } from "react-hook-form";
import ControlledSelect from './controlled-select';
import MyButton from '../atoms/my-button';
import { useEffect, useState } from 'react';

type ControlledSelectWithButtonProps = {
    control: Control<any>;
    name: string;
    options: { value: string; name?: string }[];
    label?: string;
    placeholder?: string;
    buttonLabel?: string;
};

export default function ControlledSelectWithButton({ control, name, options, label, placeholder, buttonLabel
}: ControlledSelectWithButtonProps) {

    const [selectedValue, setSelectedValue] = useState<string>('');

    return (
        <Controller
            control={control}
            name={name}
            render={({ field }) => {

                useEffect(() => {
                    if (field.value) {
                        setSelectedValue(field.value);
                    }
                }, [field.value]);

                return (<div className='flex items-end justify-between gap-4'>
                    <MySelect
                        value={selectedValue}
                        onValueChange={setSelectedValue}
                        disabled={Boolean(field.value) && Boolean(selectedValue)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder={placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {
                                options.map((element, index) => (
                                    <SelectItem key={index} value={element.value}>
                                        {element.name || element.value}
                                    </SelectItem>
                                ))
                            }
                        </SelectContent>
                    </MySelect>
                    <MyButton
                        variant='outline'
                        borderRadius='squared'
                        onClick={() => {
                            if (selectedValue) {
                                field.onChange(selectedValue);
                            }

                            if (selectedValue && field.value) {
                                setSelectedValue('');
                                field.onChange(undefined);
                            }
                        }}
                    >
                        {selectedValue && field.value ? 'Limpar' : 'Aplicar'}
                    </MyButton>
                </div>
                )
            }}
        />
    )
}
