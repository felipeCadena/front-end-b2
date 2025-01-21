'use client';

import { useState } from 'react';
import MyCheckbox from '../atoms/my-checkbox';
import MyTextInput from '../atoms/my-text-input';

const InputWithCheckbox = ({ label, value, setValue }: { label: string, value: number, setValue: (value: number) => void }) => {
    const [checked, setChecked] = useState(false);

    return (<div className='flex items-center justify-between'>
        <MyCheckbox
            label={label}
            checked={checked}
            onCheckedChange={(checked: boolean) => {
                setChecked(checked)
                setValue(checked ? 1 : 0)
            }
            }
        />
        <div>
            <MyTextInput
                placeholder='0'
                noHintText
                disabled={!checked}
                value={value}
                onChange={(e) => setValue(+e.target.value)}
            />
        </div>
    </div>)
}

export default InputWithCheckbox;