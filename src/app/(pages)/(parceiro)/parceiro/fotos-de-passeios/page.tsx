import { activities } from '@/common/constants/mock'
import MyTypography from '@/components/atoms/my-typography'
import ActivitiesPhotos from '@/components/organisms/activities-photos'
import React from 'react'

export default function FotosDePasseios() {
  return (
    <main className='m-6'>
        <div className="">
          <MyTypography variant="subtitle1" weight="semibold">
            Passeios com fotos
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" lightness={500} className='mt-1'>
            Enviar fotos ou vídeos da atividade <span className='font-bold'>até dia 05/04/2025</span>
          </MyTypography>
        </div>
        <ActivitiesPhotos activities={activities} />
    </main>
  )
}
