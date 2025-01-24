import MyTypography from '@/components/atoms/my-typography'
import StarRating from '@/components/molecules/my-stars'
import React from 'react'
import CarouselReview from './carousel-review'

export default function FourthSection() {
    const reviews = [
        {
            avatar: '/images/avatar1.png',
            name: 'Luciana Bianco',
            date: '12/12/2022',
            description: 'Eu adorei participar das atividades da B2 Adventure, eles cuidaram de tudo pra mim e garantiram minha segurança e tive uma experiência inesquecível!'
        },
        {
            avatar: '/images/avatar2.png',
            name: 'Fátima Bernardo',
            date: '12/12/2024',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.'
        },
        {
            avatar: '/images/avatar3.png',
            name: 'Eduardo Moraes',
            date: '12/12/2023',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.'
        },
    ]
    
  return (
    <section className='my-20'>
        <MyTypography variant='heading2' weight='bold' className='text-center'>B2 Adventure</MyTypography>
        <MyTypography variant='subtitle3' weight='regular' lightness={400} className='text-center'>O que estão falando da gente</MyTypography>
        <div className='flex gap-2 items-center justify-center my-2'>
            <StarRating rating={4} />
            <MyTypography variant='body' weight='semibold'>4.4</MyTypography>
            <MyTypography variant='body' weight='regular'>(250 reviews)</MyTypography>
        </div>
        <CarouselReview reviews={reviews} />
    </section>
  )
}
