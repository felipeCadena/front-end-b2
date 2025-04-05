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

// Transforme minutos ou dias em horas
export function convertToHours(timeString: string) {
  const mappings = {
    '30 min': 0.5,
    '1 hora': 1,
    '3 horas': 3,
    '5 horas': 5,
    '12 horas': 12,
    '24 horas': 24,
    '48 horas': 48,
    '72 horas': 72,
    '5 dias': 5 * 24,
  } as const;

  return mappings[timeString as keyof typeof mappings] ?? null;
}

export function convertToTimeString(hours: number) {
  const mappings = {
    '30 min': 0.5,
    '1 hora': 1,
    '3 horas': 3,
    '5 horas': 5,
    '12 horas': 12,
    '24 horas': 24,
    '48 horas': 48,
    '72 horas': 72,
    '5 dias': 5 * 24,
  } as const;

  return (
    Object.keys(mappings).find(
      (key) => mappings[key as keyof typeof mappings] === Number(hours)
    ) ?? null
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
