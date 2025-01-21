'use client';

import { useState } from 'react';
import MyCheckbox from '../atoms/my-checkbox';
import { MySelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../atoms/my-select';
import { cn } from '@/utils/cn';

type SelectWithCheckboxProps = {
    label: string;
    value: string;
    setValue: (value: string | undefined) => void;
    defaultValue?: string;
    defaultChecked?: boolean;
    items: string[];
} & React.ComponentProps<typeof MySelect>

const SelectWithCheckbox = ({ label, value, setValue, defaultValue, defaultChecked = false, items, ...rest }: SelectWithCheckboxProps) => {
    const [checked, setChecked] = useState(defaultChecked);

    return (<div className='grid grid-cols-2 items-center'>
        <MyCheckbox
            label={label}
            checked={checked}
            onCheckedChange={(checked: boolean) => {
                setChecked(checked)
                !checked && setValue(defaultValue)
            }
            }
        />
        <MySelect
            disabled={!checked}
            value={value}
            onValueChange={(value) => setValue(value)}
            {...rest}
        >
            <SelectTrigger>
                <SelectValue />
            </SelectTrigger>

            <SelectContent>
                {
                    items.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)
                }
            </SelectContent>
        </MySelect>
    </div>)
}

export default SelectWithCheckbox;