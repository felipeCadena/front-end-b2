import {
  GroupedRecurrences,
  Recurrence,
} from '@/components/organisms/activity-date-picker';
import { Adventure, AdventureSchedule } from '@/services/api/adventures';
import { format, parseISO } from 'date-fns';

export const getYearsArray = (): string[] => {
  const currentYear = new Date().getFullYear();
  const years = [];

  for (let year = 2025; year <= currentYear; year++) {
    years.push(String(year));
  }

  // Inclui o próximo ano apenas se o currentYear > 2025
  if (currentYear > 2025) {
    years.push(String(currentYear + 1));
  }

  return years;
};

export function isPastActivity(date: string | Date): boolean {
  const activityDate = new Date(date);
  const now = new Date();

  return activityDate.getTime() < now.getTime();
}

export function getData(timestamp: string, year?: boolean) {
  const date = new Date(timestamp);
  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = String(date.getFullYear()); // Pegando os últimos dois dígitos do ano

  return year ? `${dia}/${mes}/${ano}` : `${dia}/${mes}`;
}

export function getHora(timestamp: string) {
  const date = new Date(timestamp);
  const horas = String(date.getHours()).padStart(2, '0'); // Hora com 2 dígitos
  const minutos = String(date.getMinutes()).padStart(2, '0'); // Minutos com 2 dígitos
  return `${horas}:${minutos}`; // Formato HH:mm
}

export function getTimeInterval(
  timestamp: number,
  additionalHours: number
): string {
  // Cria a data a partir do timestamp
  const startDate = new Date(timestamp);

  // Função auxiliar para formatar números com dois dígitos
  const pad = (n: number) => n.toString().padStart(2, '0');

  // Obtém as horas e minutos iniciais
  const startHours = pad(startDate.getHours());
  const startMinutes = pad(startDate.getMinutes());

  // Cria a data de término adicionando as horas extras
  const endDate = new Date(startDate);
  endDate.setHours(endDate.getHours() + additionalHours);
  const endHours = pad(endDate.getHours());
  const endMinutes = pad(endDate.getMinutes());

  return `${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
}

export function isDateInPast(timestamp: string) {
  const today = new Date(); // Data atual
  today.setHours(0, 0, 0, 0); // Zerando as horas para considerar apenas a data
  const dateToCheck = new Date(timestamp); // Convertendo o timestamp para uma data

  return dateToCheck < today; // Verifica se a data é anterior a hoje
}

export function formatDate(timestamp: string, year?: boolean): string {
  if (!timestamp) return '';

  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes <= 20) {
    return 'Agora pouco';
  }

  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dayBeforeYesterday = new Date(today);
  dayBeforeYesterday.setDate(today.getDate() - 2);

  if (date >= today) {
    return 'Hoje ';
  } else if (date >= yesterday) {
    return 'Ontem ';
  } else if (date >= dayBeforeYesterday) {
    return 'Anteontem ';
  }

  const dia = String(date.getDate()).padStart(2, '0');
  const mes = String(date.getMonth() + 1).padStart(2, '0');
  const ano = String(date.getFullYear()); // Pegando os últimos dois dígitos do ano

  return year ? `${dia}/${mes}/${ano}` : `${dia}/${mes}`;
}

export const formatPhoneNumber = (phoneNumberString?: string) => {
  if (!phoneNumberString) {
    return '';
  }
  return phoneNumberString
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{5})(\d)/, '$1-$2')
    .replace(/(-\d{4})\d+?$/, '$1');
};

export const formatCEP = (value: string) => {
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d)/, '$1-$2')
    .slice(0, 9);
};

export const formatCPF = (value: string | null) => {
  if (!value) return '';

  const newValue = value
    .replace(/\D/g, '')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2');

  return newValue;
};

export const formatCNPJ = (value?: string | null) => {
  if (!value) return '';

  const newValue = value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d{1,2})$/, '$1-$2');

  return newValue;
};

export const formatCpfCnpj = (value: string) => {
  if (!value) return '';
  if (value?.length <= 14) {
    return formatCPF(value);
  } else {
    return formatCNPJ(value);
  }
};

// Transforme minutos ou dias em horas
export function convertToHours(timeString: string) {
  const mappings = {
<<<<<<< HEAD
    '30 min': 0.5,
    '1 hora': 1,
    '3 horas': 3,
    '5 horas': 5,
    '12 horas': 12,
    '24 horas': 24,
    '48 horas': 48,
    '72 horas': 72,
    '5 dias': 5 * 24,
=======
    "24 horas": 24,
    "48 horas": 48,
    "72 horas": 72,
    "4 dias": 4 * 24,
    "5 dias": 5 * 24,
    "6 dias": 6 * 24,
    "7 dias": 7 * 24,
>>>>>>> 13f57fa29b01ec99ff1834fc28bed5b241c3155b
  } as const;

  return mappings[timeString as keyof typeof mappings] ?? null;
}

export function convertToTimeString(hours: number) {
  const mappings = {
<<<<<<< HEAD
    '30 min': 0.5,
    '1 hora': 1,
    '3 horas': 3,
    '5 horas': 5,
    '12 horas': 12,
    '24 horas': 24,
    '48 horas': 48,
    '72 horas': 72,
    '5 dias': 5 * 24,
=======
    "24 horas": 24,
    "48 horas": 48,
    "72 horas": 72,
    "4 dias": 4 * 24,
    "5 dias": 5 * 24,
    "6 dias": 6 * 24,
    "7 dias": 7 * 24,
>>>>>>> 13f57fa29b01ec99ff1834fc28bed5b241c3155b
  } as const;

  return (
    Object.keys(mappings).find(
      (key) => mappings[key as keyof typeof mappings] === Number(hours)
    ) ?? ""
  );
}

export const getDifficultyDescription = (number: number) => {
  const dificulties = [
    'Grau 1 - Iniciante / Muito Leve',
    'Grau 2 - Leve',
    'Grau 3 - Moderado / Intenso',
    'Grau 4 - Avançado / Difícil',
    'Grau 5 - Extremo / Muito Difícil',
  ];

  return dificulties[number - 1] || null;
};

export const getDifficultyNumber = (description: string) => {
  const dificulties = [
    'Grau 1 - Iniciante / Muito Leve',
    'Grau 2 - Leve',
    'Grau 3 - Moderado / Intenso',
    'Grau 4 - Avançado / Difícil',
    'Grau 5 - Extremo / Muito Difícil',
  ];

  const index = dificulties.indexOf(description);
  return index !== -1 ? index + 1 : null;
};

export const handleNameActivity = (name: string) => {
  switch (name) {
    case 'ar':
      return 'Atividades Aéreas';
    case 'terra':
      return 'Atividades Terrestres';
    case 'mar':
      return 'Atividades Aquáticas';
    default:
      return '';
  }
};

export function formatAddress(address: {
  addressStreet: string;
  addressNumber?: string;
  addressComplement?: string;
  addressNeighborhood?: string;
  addressCity: string;
  addressState: string;
  addressPostalCode?: string;
  addressCountry?: string;
}): string {
  const {
    addressStreet,
    addressNumber,
    addressComplement,
    addressNeighborhood,
    addressCity,
    addressState,
    addressPostalCode,
    addressCountry,
  } = address;

  const number =
    addressNumber && addressNumber !== 'SN' ? addressNumber : 's/n';

  const parts = [
    `${addressStreet}, ${number}`,
    addressComplement,
    addressNeighborhood,
    `${addressCity} - ${addressState}`,
    addressPostalCode,
    addressCountry === 'BR' ? 'Brasil' : addressCountry,
  ];

  // Remove qualquer parte que esteja vazia, nula ou undefined
  return parts.filter(Boolean).join(', ');
}

export const formatSearchFilter = (search: string) => {
  if (search === 'ar') {
    return 'Mostrando: Atividades aéreas';
  }

  if (search === 'mar') {
    return 'Mostrando: Atividades aquáticas';
  }

  if (search === 'terra') {
    return 'Mostrando: Atividades terrestres';
  }

  if (search === '') {
    return 'Atividades recém adicionadas:';
  }

  return `Esses são os resultados da sua busca: ${search}`;
};

export const formatPrice = (price: string | number) => {
  const formattedPrice = Number(price).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return formattedPrice;
};

export const formatTime = (scheduleTime: string) => {
  const splitTime = scheduleTime.split(':');
  const timeOfDay = Number(splitTime[0]) > 12 ? ' da tarde.' : ' da manhã.';
  const formattedTime = scheduleTime + timeOfDay;

  return formattedTime;
};

export const formatDificultyTag = (difficulty: number) => {
  if (difficulty >= 0 && difficulty < 3) {
    return 'bg-primary-900';
  }
  if (difficulty >= 3 && difficulty <= 4) {
    return 'bg-orange-200';
  }

  return 'bg-red-200';
};

export const formatIconName = (name: string) => {
  const lowerName = name?.toLowerCase();
  if (lowerName === 'fotos' || lowerName === 'foto') {
    return 'fotografia';
  }
  const accentRegex = /[\u0300-\u036f]/g;
  return lowerName?.normalize('NFD').replace(accentRegex, '');
};

export const selectActivityImage = (activity: Adventure) => {
  if (activity?.images) {
    if (activity.images.length > 0) {
      return activity.images[0]?.url;
    }
  }
  return `/images/atividades/${activity?.typeAdventure}/${activity?.typeAdventure}-1.jpeg`;
};

export const handleActivityImages = (activity: Adventure | undefined) => {
  if (!activity) {
    return [
      {
        url: `/images/atividades/ar/ar-1.jpeg`,
      },
    ];
  }
  if (!activity?.images || activity?.images.length === 0) {
    return [
      {
        url: `/images/atividades/${activity?.typeAdventure}/${activity?.typeAdventure}-1.jpeg`,
      },
      {
        url: `/images/atividades/${activity?.typeAdventure}/${activity?.typeAdventure}-2.jpeg`,
      },
      {
        url: `/images/atividades/${activity?.typeAdventure}/${activity?.typeAdventure}-3.jpeg`,
      },
    ];
  }

  return activity.images;
};

export const formatNotificationText = (text: string) => {
  const separateBRtags = text?.split(/<br>/);

  return separateBRtags;
};

export const extractActivityPrice = (notficationText: string) => {
  return (
    notficationText &&
    formatNotificationText(notficationText)
      .filter((text) => text.includes('Valor total do pedido'))[0]
      .split(':')[1]
      .trim()
  );
};

export const formatOrderStatus = (orderResponse: string) => {
  switch (orderResponse) {
    case 'Pedido Realizado':
      return 'realizada';
    case 'Pedido Cancelado':
      return 'cancelada';
    case 'Pedido Pendente':
      return 'pendente';
    default:
      return '';
  }
};

export const agruparRecorrencias = (
  recurrences: AdventureSchedule[] | undefined
) => {
  if (!recurrences) return { semanal: [], mensal: [] };

  // Agrupar por groupId
  const grupos = new Map<
    string,
    { weekly: number[]; monthly: number[]; hours: number[] }
  >();

  recurrences.forEach((rec) => {
    const grupo = grupos.get(rec.groupId) || {
      weekly: [],
      monthly: [],
      hours: [],
    };

    if (rec.type === 'WEEKLY') {
      grupo.weekly.push(rec.value);
    } else if (rec.type === 'MONTHLY') {
      grupo.monthly.push(rec.value);
    } else if (rec.type === 'HOUR') {
      grupo.hours.push(rec.value);
    }

    grupos.set(rec.groupId, grupo);
  });

  const semanal: {
    tipo: 'semanal';
    dias: number[];
    horarios: string[];
  }[] = [];

  const mensal: {
    tipo: 'mensal';
    dias: number[];
    horarios: string[];
  }[] = [];

  grupos.forEach(({ weekly, monthly, hours }) => {
    const horariosFormatados = hours
      .map((h) => {
        const hora = Math.floor(h / 100);
        const minuto = h % 100;
        return `${hora.toString().padStart(2, '0')}:${minuto
          .toString()
          .padStart(2, '0')}`;
      })
      .sort();

    if (weekly.length > 0) {
      semanal.push({
        tipo: 'semanal',
        dias: weekly.sort(),
        horarios: horariosFormatados,
      });
    }

    if (monthly.length > 0) {
      mensal.push({
        tipo: 'mensal',
        dias: monthly.sort((a, b) => a - b),
        horarios: horariosFormatados,
      });
    }
  });

  return { semanal, mensal };
};

export const formatRecurrencesToDates = (
  recurrences: Recurrence[],
  type?: 'weekly' | 'monthly'
) => {
  const reducedRecur = recurrences
    ? Object.values(
        recurrences.reduce(
          (acc, rec) => {
            const group = acc[rec.groupId] || {
              groupId: rec.groupId,
              recurrenceWeekly: [],
              dates: [],
              recurrenceHour: [],
            };

            const baseMonth = new Date().getMonth();
            const baseYear = new Date().getFullYear();
            const baseDay = new Date().getDate();

            if (rec.type === 'WEEKLY') {
              const date = new Date(baseYear, baseMonth, baseDay);
              while (date.getFullYear() === baseYear) {
                if (rec.value === date.getDay()) {
                  group.recurrenceWeekly.push(new Date(date));
                }
                date.setDate(date.getDate() + 1);
              }
            } else if (rec.type === 'MONTHLY') {
              const day = Number(rec.value);

              for (let i = baseMonth; i < 12; i += 1) {
                const date = new Date(baseYear, i, day);
                group.dates.push(date);
              }
            } else if (rec.type === 'HOUR') {
              const hours = Math.floor(rec.value / 100);
              const minutes = rec.value % 100;
              group.recurrenceHour.push(
                `${hours.toString().padStart(2, '0')}:${minutes
                  .toString()
                  .padStart(2, '0')}`
              );
            }

            acc[rec.groupId] = group;
            return acc;
          },
          {} as Record<
            string,
            {
              dates: Date[];
              recurrenceHour: string[];
              recurrenceWeekly: Date[];
              groupId: string;
            }
          >
        )
      )
    : [];

  if (type === 'monthly') {
    const monthlyRecurrences = reducedRecur
      ?.filter((rec) => rec.dates.length > 0)
      .map(({ dates }) => dates)
      .flat();
    return monthlyRecurrences;
  }

  const weeklyRecurrences = reducedRecur
    ?.filter((rec) => rec.dates.length === 0)
    .map(({ recurrenceWeekly }) => recurrenceWeekly)
    .flat();

  return weeklyRecurrences;
};

export const getWeeklyRecurrenceTime = (
  selected: Date | undefined,
  recurrenceGroup: GroupedRecurrences
) => {
  const selectedWeekDay = selected?.getDay();
  const selectedWeekDayActivityTime = recurrenceGroup?.semanal?.filter((rec) =>
    rec?.dias.some((day) => day === selectedWeekDay)
  )[0];

  if (!selectedWeekDayActivityTime?.horarios) {
    const selectedMonthlyDay = recurrenceGroup.mensal.filter((rec) =>
      rec.dias.some((day) => day === selected?.getDate())
    )[0];

    return selectedMonthlyDay?.horarios ?? [];
  }

  return selectedWeekDayActivityTime?.horarios ?? [];
};

export const separateDecimals = (formattedPrice: string) => {
  const splitPrice = formattedPrice.split(',');
  return { reais: splitPrice[0], centavos: splitPrice[1] };
};

export const encontrarValorBrutoIdeal = (
  valorLiquidoDesejado: number,
  parcelas: number,
  taxaMensalAntecipacao: number,
  taxaFixaParcelamento: number,
  taxaPercentualParcelamento: number
): number => {
  let brutoMin: number = valorLiquidoDesejado;
  let brutoMax: number = valorLiquidoDesejado * 2;
  let brutoMeio: number = 0;
  const precisao = 1;

  while (brutoMax - brutoMin > precisao) {
    brutoMeio = (brutoMin + brutoMax) / 2;

    const valorLiquido =
      brutoMeio - taxaFixaParcelamento - brutoMeio * taxaPercentualParcelamento;
    const valorParcela = valorLiquido / parcelas;

    let valorAntecipado = 0;
    for (let i = 1; i <= parcelas; i++) {
      const valorPresente =
        valorParcela / Math.pow(1 + taxaMensalAntecipacao, i);
      valorAntecipado += valorPresente;
    }

    if (valorAntecipado < valorLiquidoDesejado) {
      brutoMin = brutoMeio;
    } else {
      brutoMax = brutoMeio;
    }
  }

  return parseFloat(brutoMeio.toFixed(2));
};

export const formatInstallmentOptions = (
  installmentNumber: number,
  totalPrice: number
) => {
  const ASAAS_TAXES = {
    credito_1x: {
      value: 0.49,
      percent: 0.0199,
    },
    credito_2x6: {
      // 2x até 6x
      value: 0.49,
      percent: 0.0249,
    },
    credito_7x12: {
      // 7x até 12x
      value: 0.49,
      percent: 0.0299,
    },
    pix_boleto: {
      value: 0.99,
      percent: 0,
    },
    antecipacao: {
      value: 0,
      percent: 0.017,
    },
  };
  const installmentArr: string | any[] = [];
  let initialInstallmentCount = 1;

  while (initialInstallmentCount <= installmentNumber) {
    if (initialInstallmentCount > 1) {
      const taxPercentage =
        initialInstallmentCount >= 2 && initialInstallmentCount <= 6
          ? ASAAS_TAXES['credito_2x6'].percent
          : ASAAS_TAXES['credito_7x12'].percent;
      const taxFixedValue =
        initialInstallmentCount >= 2 && initialInstallmentCount <= 6
          ? ASAAS_TAXES['credito_2x6'].value
          : ASAAS_TAXES['credito_7x12'].value;

      const value = encontrarValorBrutoIdeal(
        totalPrice,
        initialInstallmentCount,
        ASAAS_TAXES['antecipacao'].percent,
        taxFixedValue,
        taxPercentage
      );
      const installmentNumberString = initialInstallmentCount.toString();
      const total = formatPrice(value);
      const price = formatPrice(value / initialInstallmentCount);
      const splitPrice = separateDecimals(price);
      const splitTotalPrice = separateDecimals(total);
      installmentArr.push({
        installment: installmentNumberString,
        reais: `${installmentNumberString}x ${splitPrice.reais}`,
        centavos: splitPrice.centavos,
        totalReais: splitTotalPrice.reais,
        totalCentavos: splitTotalPrice.centavos,
      });
      initialInstallmentCount += 1;
    } else {
      const installmentNumberString = initialInstallmentCount.toString();
      const total = formatPrice(totalPrice);
      const price = formatPrice(totalPrice / initialInstallmentCount);
      const splitPrice = separateDecimals(price);
      const splitTotalPrice = separateDecimals(total);
      installmentArr.push({
        installment: installmentNumberString,
        reais: `${installmentNumberString}x ${splitPrice.reais}`,
        centavos: splitPrice.centavos,
        totalReais: splitTotalPrice.reais,
        totalCentavos: splitTotalPrice.centavos,
      });
      initialInstallmentCount += 1;
    }
  }

  return installmentArr;
};

export const getPartnerAvailableSchedules = (
  activity: Adventure | undefined
) => {
  if (activity) {
    const partnerSchedules = activity.schedules?.reduce(
      (acc, schedule) => {
        if (schedule.isAvailable) {
          // formata a data para UTC-3
          const forceStringDate = String(schedule.datetime);
          const localDateTime = new Date(schedule.datetime);
          const localHours = localDateTime
            .getHours()
            .toString()
            .padStart(2, '0');
          const localMinutes = localDateTime
            .getMinutes()
            .toString()
            .padStart(2, '0');

          const availableScheduleDateTime = `${localHours}:${localMinutes}`;

          const availableScheduleDate = forceStringDate.slice(0, 10);

          const formattedSchedule = {
            date: availableScheduleDate,
            time: [availableScheduleDateTime],
          };

          const existingAvailableSchedule = acc.find(
            (sch) => sch.date === formattedSchedule.date
          );

          if (!existingAvailableSchedule) {
            acc.push(formattedSchedule);
          }

          const alreadyScheduledTime = existingAvailableSchedule?.time.find(
            (time) => availableScheduleDateTime === time
          );

          if (!alreadyScheduledTime) {
            existingAvailableSchedule?.time.push(availableScheduleDateTime);
          }

          return acc;
        }
        return acc;
      },
      [] as { date: string; time: string[] }[]
    );

    return partnerSchedules;
  }
};

export const addPartnerScheduledTimeToSelectedDateTime = (
  selectedDate: Date | undefined,
  selectedDateTimes: string[],
  availablePartnerSchedules:
    | {
        date: string;
        time: string[];
      }[]
    | undefined
) => {
  if (selectedDate) {
    const partnerScheduleSelected = availablePartnerSchedules?.find(
      (sch) => sch.date === format(selectedDate, 'yyyy-MM-dd')
    );

    if (partnerScheduleSelected) {
      const timeAlreadyExists = partnerScheduleSelected.time.filter((time) =>
        selectedDateTimes.some((selectedTime) => selectedTime === time)
      );
      const filteredTimes = partnerScheduleSelected.time.filter((time) =>
        timeAlreadyExists.every((existingTime) => existingTime !== time)
      );

      return [...selectedDateTimes, ...filteredTimes].sort();
    } else {
      return selectedDateTimes;
    }
  }
  return selectedDateTimes;
};

export const formatCardNumber = (cardNumber: string): string => {
  return cardNumber
    .replace(/\D/g, '')
    .replace(/(.{4})/g, '$1 ')
    .trim();
};
