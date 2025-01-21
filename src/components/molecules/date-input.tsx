import { useEffect, useState } from 'react'
import MaskTextInput from './mask-text-input'
import { formatISO } from 'date-fns'
import MyIcon from '../atoms/my-icon'

type DateInputProps = {
    date?: string
    onDateChange: (date: string) => void
} & React.ComponentProps<typeof MaskTextInput>

export default function DateInput({ date, onDateChange, ...rest }: DateInputProps) {
    const [inputValue, setInputValue] = useState(date || '')

    useEffect(() => {
        const parts = inputValue.split('/').map(Number);

        if (parts.length === 3) {
            const [day, month, year] = parts;

            const isValidDate = (d: number, m: number, y: number) => {
                const date = new Date(y, m - 1, d);
                return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
            };

            if (isValidDate(day, month, year)) {
                const date = new Date(year, month - 1, day);
                onDateChange(formatISO(date));
            } else {
                onDateChange('');
            }
        } else {
            onDateChange('');
        }
    }, [inputValue]);

    return (
        <MaskTextInput
            inputMask='date'
            value={inputValue}
            onValueChange={({ formattedValue }) => {
                setInputValue(formattedValue)
            }}
            {...rest}
        />
    )
}
