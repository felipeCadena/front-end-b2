import { MySelect, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/atoms/my-select';
import MyTextInput from '@/components/atoms/my-text-input';
import React from 'react'

export default function Step3() {
    const dificulties = ["Grau 1", "Grau 2", "Grau 3", "Grau 4", "Grau 5"];
  return (
    <section className='space-y-6'>

        <MySelect
        // value={value}
        // onValueChange={setValue}
        label="Grau de Dificuldade"
        className="text-base text-black"
      >
        <SelectTrigger className="py-6 my-1">
          <SelectValue placeholder="Selecione " />
        </SelectTrigger>
        <SelectContent>
          {dificulties.map((dificulty) => (
            <SelectItem key={dificulty} value={dificulty}>
              {dificulty}
            </SelectItem>
          ))}
        </SelectContent>
      </MySelect>

      <MyTextInput classNameLabel="text-base text-black" label="Duração" placeholder="4 horas e 30 minutos" className="mt-2" />

    </section>
  )
}
