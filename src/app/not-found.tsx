'use client';

import MyButton from '@/components/atoms/my-button';
import MyTypography from '@/components/atoms/my-typography';
import { CardContent, MyCard } from '@/components/molecules/my-card';
import PATHS from '@/utils/paths';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="md:w-full flex items-center justify-center overflow-x-hidden">
      <MyCard className="p-12 my-8">
        <CardContent className="flex flex-col items-center justify-center">
          <MyTypography variant="heading2" weight="bold">
            OOPS!
          </MyTypography>
          <MyTypography variant="subtitle1" className="mt-4">
            Não encontramos a página que você está procurando.
          </MyTypography>
          <MyButton
            className="mt-8"
            borderRadius="squared"
            size="lg"
            onClick={() => router.push(PATHS.initial)}
          >
            Voltar para a página inicial
          </MyButton>
        </CardContent>
      </MyCard>
    </main>
  );
}
