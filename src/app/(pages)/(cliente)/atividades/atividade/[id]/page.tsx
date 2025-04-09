'use client';

import MyIcon from '@/components/atoms/my-icon';
import MyTypography from '@/components/atoms/my-typography';
import CarouselImages from '@/components/organisms/carousel-images';
import { useParams, useRouter } from 'next/navigation';
import React from 'react';
import { album } from '@/common/constants/mock';
import MyBadge from '@/components/atoms/my-badge';
import StarRating from '@/components/molecules/my-stars';
import Image from 'next/image';
import MyButton from '@/components/atoms/my-button';
import PATHS from '@/utils/paths';
import { useQuery } from '@tanstack/react-query';
import { adventures } from '@/services/api/adventures';
import {
  formatAdventureType,
  formatDificultyTag,
  formatPrice,
} from '@/utils/formatters';
import User from '@/components/atoms/my-icon/elements/user';

export default function Atividade() {
  const router = useRouter();
  const { id } = useParams();
  const [favorite, setFavorite] = React.useState(false);

  const { data: fetchedActivity } = useQuery({
    queryKey: ['this_activity'],
    queryFn: () => adventures.getAdventureById(Number(id)),
  });

  console.log('ITEMS --> ', fetchedActivity?.itemsIncluded);

  const parsedItems: string[] = JSON.parse(`${fetchedActivity?.itemsIncluded}`);

  const images = [
    { url: '/images/atividades/montanha.webp' },
    { url: '/images/atividades/paraquedas.webp' },
    { url: '/images/atividades/mergulho.webp' },
    { url: '/images/atividades/moto.webp' },
    { url: '/images/atividades/parapente.webp' },
    { url: '/images/atividades/canoagem.webp' },
  ];

  return (
    <section className="my-10">
      <div className="relative">
        <MyIcon
          name="voltar-black"
          className="absolute z-20 top-8 left-8 md:hidden hover:cursor-pointer"
          onClick={() => router.back()}
        />

        <div className="md:hidden">
          <CarouselImages images={fetchedActivity?.images ?? ['']} />
        </div>
        <div className="max-sm:hidden flex flex-col my-8">
          <div className="flex items-start gap-8">
            <div>
              <MyTypography variant="heading2" weight="bold" className="">
                {fetchedActivity?.title}
              </MyTypography>
              <MyBadge variant="outline" className="p-1">
                {formatAdventureType(fetchedActivity?.typeAdventure as string)}
              </MyBadge>
            </div>

            <div className="space-y-4">
              <StarRating rating={fetchedActivity?.averageRating ?? 0} />
            </div>
          </div>
          <div className="flex gap-4 mt-4 max-sm:hidden">
            {fetchedActivity?.partner.logo ? (
              <Image
                alt="avatar"
                src={fetchedActivity?.partner.logo ?? ''}
                width={8}
                height={8}
                className="w-12 h-12 rounded-full object-contain"
              />
            ) : (
              <div className="flex justify-center items-center rounded-full bg-primary-900 w-10">
                <User fill="#000" />
              </div>
            )}

            <div>
              <MyTypography variant="label" weight="semibold">
                {fetchedActivity?.partner.fantasyName}
              </MyTypography>
              <MyTypography variant="label" weight="regular" lightness={400}>
                Parceiro e Guia de atividades
              </MyTypography>
            </div>
          </div>

          <div className="mt-4">
            <MyTypography variant="subtitle3" weight="bold" className="">
              Descrição da atividade:
            </MyTypography>
            <MyTypography variant="body-big" weight="regular" className="mt-1">
              {fetchedActivity?.description}
            </MyTypography>
          </div>
        </div>
        <div className="max-sm:hidden grid grid-cols-4 grid-rows-2 gap-4">
          {album.slice(0, 5).map((image, index) => (
            <Image
              key={index}
              src={image}
              alt="album"
              width={300}
              height={300}
              className={`h-full w-full rounded-lg object-cover ${index === 0 ? 'col-span-2 row-span-2 h-full' : ''}`}
            />
          ))}
        </div>

        {favorite && (
          <MyTypography
            variant="body-big"
            weight="bold"
            className="hidden md:block text-red-400 absolute z-50 top-11 right-24"
          >
            Favoritada!
          </MyTypography>
        )}

        <div
          className="cursor-pointer md:border  rounded-full md:w-12 md:h-12 absolute z-50 top-8 right-8 flex items-center justify-center"
          onClick={() => setFavorite(!favorite)}
        >
          <MyIcon
            name={favorite ? 'full-heart' : 'black-heart'}
            className="z-999"
          />
        </div>

        <div className="m-4 mx-6 md:hidden">
          <MyTypography variant="heading2" weight="bold" className="">
            {fetchedActivity?.title}
          </MyTypography>
          <div className="flex items-center justify-between">
            <MyBadge variant="outline" className="p-1">
              {formatAdventureType(fetchedActivity?.typeAdventure as string)}
            </MyBadge>
            <StarRating rating={fetchedActivity?.averageRating ?? 0} />
          </div>
        </div>

        <div className="mx-6 flex items-center gap-2 md:hidden">
          <Image
            alt="avatar"
            src={fetchedActivity?.partner.logo ?? ''}
            width={6}
            height={6}
            className="w-10 h-10 rounded-full object-contain"
          />
          <div>
            <MyTypography variant="notification" weight="semibold">
              {fetchedActivity?.partner.fantasyName}
            </MyTypography>
            <MyTypography
              variant="notification"
              weight="regular"
              lightness={400}
            >
              Parceiro e Guia de atividades
            </MyTypography>
          </div>
        </div>

        <div className="mx-6 mt-4 md:hidden">
          <MyTypography variant="subtitle3" weight="bold" className="">
            Descrição da atividade:
          </MyTypography>
          <MyTypography variant="body-big" weight="regular" className="mt-1">
            {fetchedActivity?.description}
          </MyTypography>
        </div>
      </div>

      <div className="mx-6">
        <div className="md:grid md:grid-cols-2 md:gap-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-4 my-10">
            {fetchedActivity?.transportIncluded && (
              <div className="flex items-center gap-2">
                <MyIcon
                  name="transporte"
                  className="p-2 bg-primary-900 rounded-md"
                />
                <MyTypography variant="body" weight="bold" className="">
                  Transporte
                </MyTypography>
              </div>
            )}

            {fetchedActivity?.picturesIncluded && (
              <div className="flex items-center gap-2">
                <MyIcon
                  name="fotografia"
                  className="p-2 bg-primary-900 rounded-md"
                />
                <MyTypography variant="body" weight="bold" className="">
                  Fotografia
                </MyTypography>
              </div>
            )}

            {parsedItems.map(
              (item) =>
                item && (
                  <div key={item} className="flex items-center gap-2">
                    <MyIcon
                      name={item as any}
                      className="p-2 bg-primary-900 rounded-md"
                    />
                    <MyTypography variant="body" weight="bold">
                      {item.charAt(0).toUpperCase() + item.slice(1)}
                    </MyTypography>
                  </div>
                )
            )}

            <div className="flex items-center gap-2">
              <MyIcon
                name="alimentacao"
                className="p-2 bg-primary-900 rounded-md"
              />
              <MyTypography variant="body" weight="bold" className="">
                Alimentação
              </MyTypography>
            </div>

            <div className="flex items-center gap-2">
              <MyIcon name="agua" className="p-2 bg-primary-900 rounded-md" />
              <MyTypography variant="body" weight="bold" className="">
                Água
              </MyTypography>
            </div>

            <div className="flex items-center gap-2">
              <MyIcon name="guia" className="p-2 bg-primary-900 rounded-md" />
              <MyTypography variant="body" weight="bold" className="">
                Guia
              </MyTypography>
            </div>

            <div className="flex items-center gap-2">
              <MyIcon
                name="combustivel"
                className="p-2 bg-primary-900 rounded-md"
              />
              <MyTypography variant="body" weight="bold" className="">
                Combustível
              </MyTypography>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:my-auto">
            <div className="bg-primary-900 py-2 rounded-md mb-2 md:h-fit">
              <MyTypography
                variant="body"
                weight="bold"
                className="text-center"
              >
                {fetchedActivity?.isInGroup
                  ? 'Atividade em grupo'
                  : 'Atividade individual'}
              </MyTypography>
            </div>

            <div className="bg-primary-900 py-2 rounded-md mb-2 md:h-fit">
              <MyTypography
                variant="body"
                weight="bold"
                className="text-center"
              >
                {fetchedActivity?.isChildrenAllowed
                  ? 'Permitido crianças'
                  : 'Proibido crianças'}
              </MyTypography>
            </div>

            <div
              className={`${formatDificultyTag(fetchedActivity?.difficult as number)} py-2 rounded-md mb-2 md:h-fit`}
            >
              <MyTypography
                variant="body"
                weight="bold"
                className="text-center"
              >
                {`Grau de dificuldade: ${fetchedActivity?.difficult}`}
              </MyTypography>
            </div>
          </div>
        </div>

        <div className="md:grid md:grid-cols-2 gap-8">
          <div className="md:w-2/3">
            <div className="my-10 flex items-center p-3 bg-[#F1F0F587] border border-primary-600/30 border-opacity-80 rounded-lg shadow-sm hover:bg-gray-100 relative">
              <div className="absolute inset-y-0 left-0 w-3 bg-primary-900 rounded-l-lg"></div>
              <MyIcon
                name="localizacaoRedonda"
                className="w-6 h-6 text-primary-900 ml-3"
              />
              <div className="ml-3">
                <MyTypography
                  variant="body-big"
                  weight="regular"
                  className="text-center"
                >
                  {fetchedActivity?.addressNeighborhood}
                </MyTypography>
              </div>
            </div>

            <div className="flex justify-between my-10">
              <div className="flex items-center gap-2">
                <MyIcon name="duracao" />
                <div>
                  <MyTypography variant="subtitle3" weight="bold" className="">
                    Duração da atividade
                  </MyTypography>
                  <MyTypography
                    variant="body-big"
                    weight="regular"
                    className="md:text-[1rem]"
                  >
                    {fetchedActivity?.duration}
                  </MyTypography>
                </div>
              </div>
              <MyIcon name="compartilhar" className="cursor-pointer" />
            </div>
          </div>

          <div>
            <div className="my-8">
              <MyTypography variant="subtitle3" weight="bold" className="">
                Política de cancelamento
              </MyTypography>
              <MyTypography
                variant="body-big"
                weight="regular"
                className="mt-1"
              >
                Este agendamento só será reembolsado se cancelado até 3 dias
                antes da data confirmada.
              </MyTypography>
            </div>

            <div>
              <div className="flex justify-between items-center mt-1">
                <MyTypography variant="subtitle3" weight="bold" className="">
                  Valor da atividade:
                </MyTypography>
                <MyTypography
                  variant="heading2"
                  weight="extrabold"
                  className="text-primary-600"
                >
                  {formatPrice(fetchedActivity?.priceAdult as string)}
                </MyTypography>
              </div>

              <MyButton
                variant="default"
                className="mt-4 w-full md:hidden"
                size="lg"
                borderRadius="squared"
                rightIcon={<MyIcon name="seta-direita" className="ml-3" />}
                onClick={() => router.push(PATHS.carrinho)}
              >
                Garantir sua vaga
              </MyButton>

              <MyButton
                variant="default"
                className="mt-4 w-full max-sm:hidden"
                size="lg"
                borderRadius="squared"
                rightIcon={<MyIcon name="seta-direita" className="ml-3" />}
                onClick={() => router.push(PATHS['finalizar-compra'])}
              >
                Garantir sua vaga
              </MyButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
