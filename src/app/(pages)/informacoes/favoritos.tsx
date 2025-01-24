"use client"

import { activities } from '@/common/constants/mock'
import ActivitiesDetails from '@/components/organisms/activities-details'
import ActivitiesFilter from '@/components/organisms/activities-filter'
import SearchActivity from '@/components/organisms/search-activity'
import React from 'react'

export default function Favoritos() {
  return (
    <section className='mx-4 mb-15 space-y-8'>
        <SearchActivity />
        <ActivitiesFilter />
        <ActivitiesDetails activities={activities}/>
    </section>
  )
}
