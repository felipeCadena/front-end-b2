'use client';

import React from 'react';
import {
  MyDialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/molecules/my-dialog';
import MyButton from '@/components/atoms/my-button';
import MyIcon, { IconsMapTypes } from '@/components/atoms/my-icon';
import { cn } from '@/utils/cn';
import MyTextInput from '../atoms/my-text-input';
import TimePickerModal from '../molecules/time-picker';
import PeopleSelector from './people-selector';
import { MyDatePicker } from '../molecules/my-date-picker';

interface AvailabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
}

export const categories = [
  { id: 'ar', icon: 'ar', label: 'Ar' },
  { id: 'terra', icon: 'terra', label: 'Terra' },
  { id: 'mar', icon: 'mar', label: 'Mar' },
];

export default function AvailabilityModal({
  isOpen,
  onClose,
  onNext,
}: AvailabilityModalProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [selectedDates, setSelectedDates] = React.useState<Date[]>([]); // Estado para armazenar as datas selecionadas
  const [duration, setDuration] = React.useState('');

  return (
    <MyDialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white md:w-full fixed py-12 px-8 rounded-t-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Disponibilidade de Atividade
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 mt-6">
          <MyTextInput
            noHintText
            leftIcon={<MyIcon name="localizacao" />}
            placeholder="Localização"
            classNameLabel="text-black"
          />

          <MyDatePicker
            selectedDates={selectedDates}
            setSelectedDates={setSelectedDates}
          />

          <TimePickerModal value={duration} onChange={setDuration} />

          <PeopleSelector />

          <div className="mt-4">
            <p className="text-sm font-medium">Selecione a Categoria</p>
            <div className="grid grid-cols-3 gap-2 mt-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={cn(
                    'flex items-center justify-center p-4 rounded-lg transition-colors',
                    'border border-gray-200 hover:bg-gray-50',
                    selectedCategory === category.id &&
                      'bg-gray-100 border-primary-500'
                  )}
                >
                  <MyIcon name={category.icon as IconsMapTypes} />
                </button>
              ))}
            </div>
          </div>
        </div>
        <MyButton
          onClick={onNext}
          borderRadius="squared"
          size="lg"
          className="w-full mt-4"
          rightIcon={<MyIcon name="seta-direita" />}
        >
          Concluir
        </MyButton>
      </DialogContent>
    </MyDialog>
  );
}
