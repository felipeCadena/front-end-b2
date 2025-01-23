import React from 'react'
import MyTextInput from '../atoms/my-text-input'
import MyIcon from '../atoms/my-icon'

export default function SearchActivity() {
  return (
    <section className='mt-2'>
        <MyTextInput 
        placeholder="Procurar atividade"  
        noHintText
        rightIcon={<MyIcon name="search" className='mr-2' />}
        />
    </section>
  )
}
