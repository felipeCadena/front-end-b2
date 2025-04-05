'use client';

import React from 'react';
import MyTextInput from '../atoms/my-text-input';
import MyIcon from '../atoms/my-icon';
import MyButton from '../atoms/my-button';
import { cn } from '@/utils/cn';
import { useQuery } from '@tanstack/react-query';
import { adventures } from '@/services/api/adventures';
import { useDebounce } from '@/hooks/useDebounce';
import useAdventures from '@/store/useAdventure';

export default function SearchActivity({ className }: { className?: string }) {
  const [chips, setChips] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState('');
  const { setAdventures, setSearchedAdventures } = useAdventures();

  const debouncedValue = useDebounce(search, 700);

  const { data: filterAdventure } = useQuery({
    queryKey: ['user', debouncedValue],
    queryFn: () => adventures.filterAdventures({ q: debouncedValue }),
  });

  return (
    <section className={cn('mt-2 md:w-2/3 md:mx-auto max-sm:px-4', className)}>
      <MyTextInput
        placeholder="Procurar atividade"
        noHintText
        withButton
        leftIcon={<MyIcon name="search" className="md:ml-2 max-sm:hidden" />}
        className="max-sm:pl-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        rightIcon={
          <>
            <MyIcon name="search" className="mr-4 md:hidden" />
            <MyButton
              variant="default"
              size="md"
              borderRadius="squared"
              className="mr-24 max-sm:hidden"
              onClick={() => {
                setAdventures(filterAdventure ?? []);
                setSearchedAdventures(debouncedValue);
              }}
            >
              Pesquisar
            </MyButton>
          </>
        }
      />
    </section>
  );
}
