export const profile = {
  avatar: '/images/avatar1.png',
  name: 'Luciana Bianco',
  email: '',
};

interface Lancamento {
  id: number;
  imagem: string;
  passeio: string;
  data: string;
  duracao: string;
  quantidade: string;
  valor: number;
  status?: 'concluido' | 'cancelado' | 'pendente';
}

export const lancamentos: Lancamento[] = [
  {
    id: 1,
    imagem: '/images/atividades/mar/mar-4.jpeg',
    passeio: 'Escalada Cristo - RJ',
    data: '2025-03-12T08:00:00',
    duracao: '4 Horas',
    quantidade: '2 adultos x 181,93',
    valor: 363.86,
  },
  {
    id: 2,
    imagem: '/images/atividades/mar/mar-4.jpeg',
    passeio: 'Escalada Cristo - RJ',
    data: '2025-03-12T08:00:00',
    duracao: '4 Horas',
    quantidade: '2 adultos x 181,93',
    valor: 363.86,
  },
  {
    id: 3,
    imagem: '/images/atividades/mar/mar-4.jpeg',
    passeio: 'Escalada Cristo - RJ',
    data: '2025-03-12T08:00:00',
    duracao: '4 Horas',
    quantidade: '2 adultos x 181,93',
    valor: 363.86,
  },
  {
    id: 4,
    imagem: '/images/atividades/mar/mar-4.jpeg',
    passeio: 'Escalada Cristo - RJ',
    data: '2025-03-12T08:00:00',
    duracao: '4 Horas',
    quantidade: '2 adultos x 181,93',
    valor: 363.86,
    status: 'pendente',
  },
  {
    id: 5,
    imagem: '/images/atividades/mar/mar-4.jpeg',
    passeio: 'Escalada Cristo - RJ',
    data: '2025-03-12T08:00:00',
    duracao: '4 Horas',
    quantidade: '2 adultos x 181,93',
    valor: 363.86,
    status: 'pendente',
  },
  {
    id: 6,
    imagem: '/images/atividades/mar/mar-4.jpeg',
    passeio: 'Escalada Cristo - RJ',
    data: '2025-03-12T08:00:00',
    duracao: '4 Horas',
    quantidade: '2 adultos x 181,93',
    valor: 363.86,
    status: 'cancelado',
  },
];

export const activitiesOcean = [
  {
    id: '1',
    image: '/images/atividades/mar/mar-1.jpeg',
    tag: 'Atividades Aquáticas',
    stars: 5,
    title: 'Atividade 1',
    localizacao: 'Marina da Glória - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: true,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar2.png',
    },
    reserva: {
      timestamp: '2025-03-12T08:00:00',
      pessoas: 2,
      total: 363.86,
    },
  },
  {
    id: '2',
    image: '/images/atividades/mar/mar-2.jpeg',
    tag: 'Atividades Aquáticas',
    stars: 5,
    title: 'Atividade 2',
    localizacao: 'Marina da Glória - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: false,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar2.png',
    },
    reserva: {
      timestamp: '2025-03-12T08:00:00',
      pessoas: 2,
      total: 363.86,
    },
  },
  {
    id: '3',
    image: '/images/atividades/mar/mar-3.jpeg',
    tag: 'Atividades Aquáticas',
    stars: 5,
    title: 'Atividade 3',
    localizacao: 'Marina da Glória - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: true,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar2.png',
    },
    reserva: {
      timestamp: '2025-03-12T08:00:00',
      pessoas: 2,
      total: 363.86,
    },
  },
  {
    id: '4',
    image: '/images/atividades/mar/mar-4.jpeg',
    tag: 'Atividades Aquáticas',
    stars: 5,
    title: 'Atividade 4',
    localizacao: 'Marina da Glória - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: false,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar2.png',
    },
    reserva: {
      timestamp: '2025-03-12T08:00:00',
      pessoas: 2,
      total: 363.86,
    },
  },
  {
    id: '5',
    image: '/images/atividades/mar/mar-5.jpeg',
    tag: 'Atividades Aquáticas',
    stars: 5,
    title: 'Atividade 5',
    localizacao: 'Marina da Glória - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: false,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar2.png',
    },
    reserva: {
      timestamp: '2025-03-12T08:00:00',
      pessoas: 2,
      total: 363.86,
    },
  },
  {
    id: '6',
    image: '/images/atividades/mar/mar-6.jpeg',
    tag: 'Atividades Aquáticas',
    stars: 5,
    title: 'Atividade 6',
    localizacao: 'Marina da Glória - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: true,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar2.png',
    },
    reserva: {
      timestamp: '2025-03-12T08:00:00',
      pessoas: 2,
      total: 363.86,
    },
  },
  {
    id: '7',
    image: '/images/atividades/mar/mar-7.jpeg',
    tag: 'Atividades Aquáticas',
    stars: 5,
    title: 'Atividade 7',
    localizacao: 'Marina da Glória - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: false,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar2.png',
    },
    reserva: {
      timestamp: '2025-03-12T08:00:00',
      pessoas: 2,
      total: 363.86,
    },
  },
];

export const activitiesLand = [
  {
    id: '1',
    image: '/images/atividades/terra/terra-1.jpeg',
    tag: 'Atividades Terrestres',
    stars: 4,
    title: 'Atividade 1',
    localizacao: 'São Conrado - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: true,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar3.png',
    },
    reserva: {
      timestamp: '2024-12-12T16:00:00',
      pessoas: 4,
      total: 763.5,
    },
  },
  {
    id: '2',
    image: '/images/atividades/terra/terra-2.jpeg',
    tag: 'Atividades Terrestres',
    stars: 4,
    title: 'Atividade 2',
    localizacao: 'São Conrado - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: false,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar3.png',
    },
    reserva: {
      timestamp: '2024-12-12T16:00:00',
      pessoas: 3,
      total: 560.5,
    },
  },
  {
    id: '3',
    image: '/images/atividades/terra/terra-3.jpeg',
    tag: 'Atividades Terrestres',
    stars: 4,
    title: 'Atividade 3',
    localizacao: 'São Conrado - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: true,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar3.png',
    },
    reserva: {
      timestamp: '2024-12-12T16:00:00',
      pessoas: 4,
      total: 763.5,
    },
  },
  {
    id: '4',
    image: '/images/atividades/terra/terra-4.jpeg',
    tag: 'Atividades Terrestres',
    stars: 4,
    title: 'Atividade 4',
    localizacao: 'São Conrado - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: false,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar3.png',
    },
    reserva: {
      timestamp: '2024-12-12T16:00:00',
      pessoas: 3,
      total: 560.5,
    },
  },
  {
    id: '5',
    image: '/images/atividades/terra/terra-5.jpeg',
    tag: 'Atividades Terrestres',
    stars: 4,
    title: 'Atividade 5',
    localizacao: 'São Conrado - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: true,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar3.png',
    },
    reserva: {
      timestamp: '2024-12-12T16:00:00',
      pessoas: 4,
      total: 763.5,
    },
  },
  {
    id: '6',
    image: '/images/atividades/terra/terra-6.jpeg',
    tag: 'Atividades Terrestres',
    stars: 4,
    title: 'Atividade 6',
    localizacao: 'São Conrado - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: false,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar3.png',
    },
    reserva: {
      timestamp: '2024-12-12T16:00:00',
      pessoas: 3,
      total: 560.5,
    },
  },
  {
    id: '7',
    image: '/images/atividades/terra/terra-1.jpeg',
    tag: 'Atividades Terrestres',
    stars: 4,
    title: 'Atividade 7',
    localizacao: 'São Conrado - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    favorite: false,
    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar3.png',
    },
    reserva: {
      timestamp: '2024-12-12T16:00:00',
      pessoas: 3,
      total: 560.5,
    },
  },
];

export const activitiesAir = [
  {
    id: '1',
    image: '/images/atividades/ar/ar-1.jpeg',
    tag: 'Atividades Aéreas',
    stars: 3,
    title: 'Atividade 1',
    localizacao: 'Cosme Velho - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',

    parceiro: {
      nome: 'Ana Francisca Moraes',
      avatar: '/images/avatar1.png',
    },
    reserva: {
      timestamp: '2024-12-12T14:00:00',
      pessoas: 3,
      total: 496.5,
    },
  },
  {
    id: '2',
    image: '/images/atividades/ar/ar-2.jpeg',
    tag: 'Atividades Aéreas',
    stars: 3,
    title: 'Atividade 2',
    localizacao: 'Cosme Velho - RJ',
    favorite: true,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',

    parceiro: {
      nome: 'Roberto Gil',
      avatar: '/images/avatar1.png',
    },
    reserva: {
      timestamp: '2024-12-12T14:00:00',
      pessoas: 3,
      total: 496.5,
    },
  },
  {
    id: '3',
    image: '/images/atividades/ar/ar-3.jpeg',
    tag: 'Atividades Aéreas',
    stars: 3,
    title: 'Atividade 3',
    localizacao: 'Cosme Velho - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',

    parceiro: {
      nome: 'Vera Lúcia',
      avatar: '/images/avatar1.png',
    },
    reserva: {
      timestamp: '2024-12-12T14:00:00',
      pessoas: 3,
      total: 496.5,
    },
  },
  {
    id: '4',
    image: '/images/atividades/ar/ar-4.jpeg',
    tag: 'Atividades Aéreas',
    stars: 3,
    title: 'Atividade 4',
    localizacao: 'Cosme Velho - RJ',
    favorite: true,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',

    parceiro: {
      nome: 'Talisson Silva',
      avatar: '/images/avatar1.png',
    },
    reserva: {
      timestamp: '2024-12-12T14:00:00',
      pessoas: 3,
      total: 496.5,
    },
  },
  {
    id: '5',
    image: '/images/atividades/ar/ar-1.jpeg',
    tag: 'Atividades Aéreas',
    stars: 3,
    title: 'Atividade 5',
    localizacao: 'Cosme Velho - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',

    parceiro: {
      nome: 'Bruna Carvalho',
      avatar: '/images/avatar1.png',
    },
    reserva: {
      timestamp: '2024-12-12T14:00:00',
      pessoas: 3,
      total: 496.5,
    },
  },
  {
    id: '6',
    image: '/images/atividades/ar/ar-2.jpeg',
    tag: 'Atividades Aéreas',
    stars: 3,
    title: 'Atividade 6',
    localizacao: 'Cosme Velho - RJ',
    favorite: true,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',

    parceiro: {
      nome: 'Felipe Almeida',
      avatar: '/images/avatar1.png',
    },
    reserva: {
      timestamp: '2024-12-12T14:00:00',
      pessoas: 3,
      total: 496.5,
    },
  },
  {
    id: '7',
    image: '/images/atividades/ar/ar-3.jpeg',
    tag: 'Atividades Aéreas',
    stars: 3,
    title: 'Atividade 7',
    localizacao: 'Cosme Velho - RJ',
    favorite: true,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',

    parceiro: {
      nome: 'Ana Vasconcelos',
      avatar: '/images/avatar1.png',
    },
    reserva: {
      timestamp: '2024-12-12T14:00:00',
      pessoas: 3,
      total: 496.5,
    },
  },
];

export const newActivities = [
  {
    id: 1,
    title: 'Mergulho em Ilha Grande',
    addressStreet: 'Avenida Infante Dom Henrique',
    addressPostalCode: '20021-140',
    addressNumber: 'S/N',
    addressComplement: '',
    addressNeighborhood: 'Glória',
    addressCity: 'Rio de Janeiro',
    addressState: 'RJ',
    addressCountry: 'Brasil',
    coordinates: '-22.916, -43.169',
    pointRefAddress: 'Marina da Glória',
    description:
      'Uma atividade emocionante no mar de Ilha Grande no estado do Rio de Janeiro!',
    itemsIncluded: ['Coletes salva-vidas', 'Instrutor'],
    duration: '2 horas',
    priceAdult: '200.00',
    priceChildren: '150.00',
    transportIncluded: false,
    picturesIncluded: true,
    typeAdventure: 'mar',
    averageRating: 5,
    qntRatings: 120,
    sumTotalRatings: 600,
    personsLimit: 10,
    partnerId: 1,
    partner: {
      id: 1,
      fantasyName: 'Thais Oliveira',
      logo: '/images/avatar2.png',
    },
    isInGroup: true,
    isChildrenAllowed: true,
    difficult: 2,
    daysBeforeSchedule: 2,
    daysBeforeCancellation: 1,
    onSite: true,
    adminApproved: true,
    suspend: false,
    hour: 8,
    isRepeatable: true,
    totalFavorites: 50,
    createdAt: '2025-01-01T08:00:00',
    updatedAt: '2025-03-30T12:00:00',
    images: [
      {
        id: 1,
        adventureId: 1,
        name: 'mar-1.jpeg',
        mimetype: 'image/jpeg',
        title: 'Atividade no mar',
        isDefault: true,
        url: '/images/atividades/mar/mar-1.jpeg',
      },
    ],
  },
  {
    id: 2,
    title: 'Trilha no Morro Dois Irmãos',
    addressStreet: 'Rua Cosme Velho',
    addressPostalCode: '22241-090',
    addressNumber: '513',
    addressComplement: '',
    addressNeighborhood: 'Cosme Velho',
    addressCity: 'Rio de Janeiro',
    addressState: 'RJ',
    addressCountry: 'Brasil',
    coordinates: '-22.943, -43.212',
    pointRefAddress: 'Pão de Açúcar',
    description:
      'Voo panorâmico incrível e uma trilha de tirar o folego de todo que visitam!!',
    itemsIncluded: ['Instrutor', 'Equipamento de segurança'],
    duration: '30 minutos',
    priceAdult: '500.00',
    priceChildren: '400.00',
    transportIncluded: false,
    picturesIncluded: true,
    typeAdventure: 'ar',
    averageRating: 4,
    qntRatings: 80,
    sumTotalRatings: 320,
    personsLimit: 5,
    partnerId: 2,
    partner: {
      id: 2,
      fantasyName: 'Bruno Moraes',
      logo: '/images/avatar1.png',
    },
    isInGroup: false,
    isChildrenAllowed: false,
    difficult: 3,
    daysBeforeSchedule: 3,
    daysBeforeCancellation: 2,
    onSite: true,
    adminApproved: true,
    suspend: false,
    hour: 14,
    isRepeatable: false,
    totalFavorites: 30,
    createdAt: '2025-01-05T14:00:00',
    updatedAt: '2025-03-30T12:00:00',
    images: [
      {
        id: 2,
        adventureId: 2,
        name: 'ar-1.jpeg',
        mimetype: 'image/jpeg',
        title: 'Voo de asa delta',
        isDefault: true,
        url: '/images/atividades/ar/ar-1.jpeg',
      },
    ],
  },
  {
    id: 3,
    title: 'Voo de Asa Delta na Pedra Bonita',
    addressStreet: 'Estrada da Gávea',
    addressPostalCode: '22610-000',
    addressNumber: 'S/N',
    addressComplement: '',
    addressNeighborhood: 'São Conrado',
    addressCity: 'Rio de Janeiro',
    addressState: 'RJ',
    addressCountry: 'Brasil',
    coordinates: '-22.996, -43.268',
    pointRefAddress: 'Pedra Bonita',
    description: 'Uma caminhada incrível com vista panorâmica!',
    itemsIncluded: ['Guia especializado', 'Seguro aventura'],
    duration: '3 horas',
    priceAdult: '100.00',
    priceChildren: '80.00',
    transportIncluded: false,
    picturesIncluded: true,
    typeAdventure: 'terra',
    averageRating: 4.5,
    qntRatings: 90,
    sumTotalRatings: 405,
    personsLimit: 15,
    partnerId: 3,
    partner: {
      id: 3,
      fantasyName: 'Lucas Santos',
      logo: '/images/avatar3.png',
    },
    isInGroup: true,
    isChildrenAllowed: true,
    difficult: 2,
    daysBeforeSchedule: 2,
    daysBeforeCancellation: 1,
    onSite: true,
    adminApproved: true,
    suspend: false,
    hour: 9,
    isRepeatable: true,
    totalFavorites: 40,
    createdAt: '2025-02-01T09:00:00',
    updatedAt: '2025-03-30T12:00:00',
    images: [
      {
        id: 3,
        adventureId: 3,
        name: 'trilha-1.jpeg',
        mimetype: 'image/jpeg',
        title: 'Trilha na Pedra Bonita',
        isDefault: true,
        url: '/images/atividades/terra/terra-1.jpeg',
      },
    ],
  },
  {
    id: 4,
    title: 'Passeio de Barco na Baía de Guanabara',
    addressStreet: 'Praça XV',
    addressPostalCode: '20010-010',
    addressNumber: 'S/N',
    addressNeighborhood: 'Centro',
    addressCity: 'Rio de Janeiro',
    addressState: 'RJ',
    addressCountry: 'Brasil',
    coordinates: '-22.901, -43.171',
    pointRefAddress: 'Marina da Praça XV',
    description: 'Desfrute de um passeio de barco com vistas incríveis!',
    itemsIncluded: ['Guia turístico', 'Coletes salva-vidas'],
    duration: '2 horas',
    priceAdult: '180.00',
    priceChildren: '120.00',
    transportIncluded: false,
    picturesIncluded: true,
    typeAdventure: 'mar',
    averageRating: 4.7,
    qntRatings: 95,
    sumTotalRatings: 450,
    personsLimit: 20,
    partnerId: 4,
    partner: {
      id: 4,
      fantasyName: 'Marina Rio',
      logo: '/images/avatar1.png',
    },
    isInGroup: true,
    isChildrenAllowed: true,
    difficult: 1,
    daysBeforeSchedule: 1,
    daysBeforeCancellation: 1,
    onSite: true,
    adminApproved: true,
    suspend: false,
    hour: 10,
    isRepeatable: true,
    totalFavorites: 60,
    createdAt: '2025-02-10T10:00:00',
    updatedAt: '2025-03-30T12:00:00',
    images: [
      {
        id: 4,
        adventureId: 4,
        name: 'barco-1.jpeg',
        mimetype: 'image/jpeg',
        title: 'Passeio de barco',
        isDefault: true,
        url: '/images/atividades/mar/mar-2.jpeg',
      },
    ],
  },
  {
    id: 5,
    title: 'Escalada na Urca',
    addressStreet: 'Pista Cláudio Coutinho',
    addressPostalCode: '22290-270',
    addressNumber: 'S/N',
    addressNeighborhood: 'Urca',
    addressCity: 'Rio de Janeiro',
    addressState: 'RJ',
    addressCountry: 'Brasil',
    coordinates: '-22.953, -43.165',
    pointRefAddress: 'Morro da Urca',
    description: 'Uma escalada emocionante com vista para o Pão de Açúcar!',
    itemsIncluded: ['Equipamento de escalada', 'Instrutor certificado'],
    duration: '4 horas',
    priceAdult: '300.00',
    priceChildren: '250.00',
    transportIncluded: false,
    picturesIncluded: true,
    typeAdventure: 'terra',
    averageRating: 4.8,
    qntRatings: 70,
    sumTotalRatings: 336,
    personsLimit: 6,
    partnerId: 5,
    partner: {
      id: 5,
      fantasyName: 'Aventura Carioca',
      logo: '/images/avatar2.png',
    },
    isInGroup: true,
    isChildrenAllowed: false,
    difficult: 4,
    daysBeforeSchedule: 3,
    daysBeforeCancellation: 2,
    onSite: true,
    adminApproved: true,
    suspend: false,
    hour: 7,
    isRepeatable: true,
    totalFavorites: 35,
    createdAt: '2025-02-15T07:00:00',
    updatedAt: '2025-03-30T12:00:00',
    images: [
      {
        id: 5,
        adventureId: 5,
        name: 'escalada-1.jpeg',
        mimetype: 'image/jpeg',
        title: 'Escalada na Urca',
        isDefault: true,
        url: '/images/atividades/terra/terra-4.jpeg',
      },
    ],
  },
];

export const activities = [
  {
    id: '1',
    images: [],
    typeAdventure: 'mar',
    stars: 5,
    title: 'Atividade 1',
    localizacao: 'Marina da Glória - RJ',
    description:
      'Quisquam, quas. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetu. Lorem ipsum dolor sit amet consectetur',
    favorite: true,
    parceiro: {
      nome: 'Thais Oliveira',
      avatar: '/images/avatar2.png',
    },
    reserva: {
      timestamp: '2025-03-12T08:00:00',
      pessoas: 2,
      total: 363.86,
    },
  },
  {
    id: '2',
    images: [],
    typeAdventure: 'ar',
    stars: 3,
    title: 'Atividade 2',
    localizacao: 'Cosme Velho - RJ',
    description:
      'Quisquam, quas. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet. Quisquam, quas. Lorem ipsum dolor sit amet consectetur. consectetur adipisicing elit',

    parceiro: {
      nome: 'Bruno Moraes',
      avatar: '/images/avatar1.png',
    },
    reserva: {
      timestamp: '2024-12-12T14:00:00',
      pessoas: 3,
      total: 496.5,
    },
  },
  {
    id: '3',
    images: [],
    typeAdventure: 'terra',
    stars: 4,
    title: 'Atividade 3',
    localizacao: 'São Conrado - RJ',
    description:
      'Quisquam, quas. Lorem ipsum dolor sit amet consectetur. Lorem ipsum dolor sit amet consectetur adipisicing elit.',
    favorite: true,
    parceiro: {
      nome: 'Francisca Nogueira',
      avatar: '/images/avatar3.png',
    },
    reserva: {
      timestamp: '2024-12-12T16:00:00',
      pessoas: 4,
      total: 763.5,
    },
  },
  {
    id: '4',
    images: [],
    typeAdventure: 'mar',
    stars: 5,
    title: 'Atividade 4',
    localizacao: 'Ilhas Tijuca - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas. Lorem ipsum dolor sit amet consectetur',
    parceiro: {
      nome: 'Eduarda Enzo',
      avatar: '/images/avatar1.png',
    },
    data: '05/01',
    hora: '11:00',
    reserva: {
      timestamp: '2025-01-05T11:00:00',
      pessoas: 1,
      total: 247.3,
    },
  },
  {
    id: '5',
    images: [],
    typeAdventure: 'mar',
    stars: 1,
    title: 'Atividade 5',
    localizacao: 'Ilhas Tijuca - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas. Lorem ipsum dolor sit amet consectetur',
    parceiro: {
      nome: 'Sofia Moraes',
      avatar: '/images/avatar1.png',
    },
    data: '05/01',
    hora: '11:00',
    reserva: {
      timestamp: '2025-01-05T11:00:00',
      pessoas: 1,
      total: 247.3,
    },
  },
  {
    id: '6',
    images: [],
    typeAdventure: 'terra',
    stars: 2,
    title: 'Atividade 6',
    localizacao: 'São Conrado - RJ',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas. Lorem ipsum dolor sit amet consectetur',
    favorite: true,
    parceiro: {
      nome: 'Jorge Moraes',
      avatar: '/images/avatar3.png',
    },
    reserva: {
      timestamp: '2024-12-12T16:00:00',
      pessoas: 4,
      total: 763.5,
    },
  },
];

export const notifications = [
  {
    id: 1,
    title: 'Atividade Monte Rio - Cancelada',
    timestamp: '2025-02-10T22:11:00',
    duracao: 2,
    group: 10,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: false,
    status: 'cancelada',
    description: 'Sua atividade foi cancelada por um dos nossos parceiros.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Bruna Delduca',
    },
  },
  {
    id: 2,
    title: 'Atividade Cristo Redentor - É hoje!',
    timestamp: '2025-01-31T11:00:00',
    duracao: 4,
    group: 8,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'pendente',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Felipe Almeida',
    },
  },
  {
    id: 3,
    title: 'Atividade Cristo Redentor - Próxima',
    timestamp: '2025-01-30T08:30:00',
    duracao: 1,
    group: 5,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'pendente',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Talisson Silva',
    },
  },
  {
    id: 4,
    title: 'Atividade Cristo Redentor - Agendada',
    timestamp: '2025-01-20T10:20:00',
    duracao: 3,
    group: 9,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'pendente',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Michel Nicolay',
    },
  },
  {
    id: 5,
    title: 'Atividade Surfe - Realizada',
    timestamp: '2025-01-25T09:20:00',
    duracao: 4,
    group: 5,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: false,
    status: 'realizada',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Bruna Delduca',
    },
  },
];

export const clientList = [
  {
    id: 1,
    atividade: 'Pedra da Gavea',
    name: 'Ana Francisca Moraes',
    quantidade: 4,
  },

  {
    id: 2,
    atividade: 'Pedra da Gavea',
    name: 'Larissa Freitas',
    quantidade: 6,
  },
  {
    id: 3,
    atividade: 'Pedra da Gavea',
    name: 'Bruno Almeida',
    quantidade: 2,
  },
  {
    id: 4,
    atividade: 'Pedra da Gavea',
    name: 'Bruno Almeida',
    quantidade: 2,
  },
  {
    id: 5,
    atividade: 'Pedra da Gavea',
    name: 'Bruno Almeida',
    quantidade: 2,
  },
  {
    id: 6,
    atividade: 'Pedra da Gavea',
    name: 'Bruno Almeida',
    quantidade: 2,
  },
  {
    id: 7,
    atividade: 'Pedra da Gavea',
    name: 'Bruno Almeida',
    quantidade: 2,
  },
  {
    id: 8,
    atividade: 'Pedra da Gavea',
    name: 'Bruno Almeida',
    quantidade: 2,
  },
  {
    id: 9,
    atividade: 'Pedra da Gavea',
    name: 'Bruno Almeida',
    quantidade: 2,
  },
  {
    id: 10,
    atividade: 'Pedra da Gavea',
    name: 'Bruno Almeida',
    quantidade: 2,
  },
];

export const notificationActivities = [
  {
    id: 1,
    title: 'Atividade Monte Rio',
    timestamp: '2025-02-10T22:11:00',
    duracao: 2,
    group: 10,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: false,
    status: 'cancelada',
    description: 'Sua atividade foi cancelada por um dos nossos parceiros.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Bruna Delduca',
    },
  },
  {
    id: 2,
    title: 'Atividade Cristo Redentor',
    timestamp: '2025-01-31T11:00:00',
    duracao: 4,
    group: 8,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'em andamento',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Felipe Almeida',
    },
  },
  {
    id: 3,
    title: 'Atividade Cristo Redentor',
    timestamp: '2025-01-30T08:30:00',
    duracao: 1,
    group: 5,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'pendente',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Talisson Silva',
    },
  },
  {
    id: 4,
    title: 'Atividade Cristo Redentor',
    timestamp: '2025-01-20T10:20:00',
    duracao: 3,
    group: 9,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'pendente',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Michel Nicolay',
    },
  },
  {
    id: 5,
    title: 'Atividade Surfe',
    timestamp: '2025-01-25T09:20:00',
    duracao: 4,
    group: 5,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: false,
    status: 'realizada',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Bruna Delduca',
    },
  },
];

export const recentActivities = [
  {
    id: 1,
    title: 'Atividade Monte Rio',
    timestamp: '2025-02-10T22:11:00',
    duracao: 2,
    group: 10,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: false,
    status: 'realizada',
    description: 'Sua atividade foi cancelada por um dos nossos parceiros.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Bruna Delduca',
    },
  },
  {
    id: 2,
    title: 'Atividade Cristo Redentor',
    timestamp: '2025-01-31T11:00:00',
    duracao: 4,
    group: 8,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'realizada',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Felipe Almeida',
    },
  },
];

export const hiddenActivities = [
  {
    id: 1,
    title: 'Atividade Monte Rio',
    timestamp: '2025-02-10T22:11:00',
    duracao: 2,
    group: 10,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: false,
    status: 'oculta',
    description: 'Sua atividade foi cancelada por um dos nossos parceiros.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Bruna Delduca',
    },
  },
  {
    id: 2,
    title: 'Atividade Cristo Redentor',
    timestamp: '2025-01-31T11:00:00',
    duracao: 4,
    group: 8,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'oculta',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Felipe Almeida',
    },
  },
  {
    id: 3,
    title: 'Atividade Cristo Redentor',
    timestamp: '2025-01-30T08:30:00',
    duracao: 1,
    group: 5,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'oculta',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Talisson Silva',
    },
  },
  {
    id: 4,
    title: 'Atividade Cristo Redentor',
    timestamp: '2025-01-20T10:20:00',
    duracao: 3,
    group: 9,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: true,
    status: 'oculta',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Michel Nicolay',
    },
  },
  {
    id: 5,
    title: 'Atividade Surfe',
    timestamp: '2025-01-25T09:20:00',
    duracao: 4,
    group: 5,
    reason:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    read: false,
    status: 'oculta',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.',
    parceiro: {
      avatar: '/images/avatar1.png',
      nome: 'Bruna Delduca',
    },
  },
];

export const reviews = [
  {
    avatar: '/images/avatar1.png',
    name: 'Luciana Bianco',
    date: '12/12/2022',
    description:
      'Eu adorei participar das atividades da B2 Adventure, eles cuidaram de tudo pra mim e garantiram minha segurança e tive uma experiência inesquecível!',
  },
  {
    avatar: '/images/avatar2.png',
    name: 'Fátima Bernardo',
    date: '12/12/2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.',
  },
  {
    avatar: '/images/avatar3.png',
    name: 'Eduardo Moraes',
    date: '12/12/2023',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.',
  },
  {
    avatar: '/images/avatar2.png',
    name: 'Fátima Bernardo',
    date: '12/12/2024',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.',
  },
  {
    avatar: '/images/avatar1.png',
    name: 'Luciana Bianco',
    date: '12/12/2022',
    description:
      'Eu adorei participar das atividades da B2 Adventure, eles cuidaram de tudo pra mim e garantiram minha segurança e tive uma experiência inesquecível!',
  },
  {
    avatar: '/images/avatar3.png',
    name: 'Eduardo Moraes',
    date: '12/12/2023',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.',
  },
];

export const album = [
  '/images/atividades/ar/ar-1.jpeg',
  '/images/atividades/ar/ar-2.jpeg',
  '/images/atividades/ar/ar-3.jpeg',
  '/images/atividades/ar/ar-4.jpeg',
  '/images/atividades/terra/terra-1.jpeg',
  '/images/atividades/terra/terra-2.jpeg',
  '/images/atividades/terra/terra-3.jpeg',
  '/images/atividades/mar/mar-1.jpeg',
  '/images/atividades/mar/mar-2.jpeg',
  '/images/atividades/mar/mar-3.jpeg',
  '/images/atividades/mar/mar-4.jpeg',
  '/images/atividades/mar/mar-5.jpeg',
  '/images/atividades/mar/mar-6.jpeg',
  '/images/atividades/mar/mar-7.jpeg',
];

export const mockAlbum = [
  {
    id: '73ae8d54-daf7-40a2-9888-2dc0d41a4065',
    url: '/images/atividades/ar/ar-1.jpeg',
    name: 'parapente.webp',
    title: '',
    description: '',
    mimetype: 'image/webp',
    adventureId: null,
    scheduleId: 'cm8xjofz00001csjwxj0u3hql',
    index: null,
    isDefault: false,
    createdAt: '2025-04-28T02:40:55.682Z',
    updatedAt: '2025-04-28T02:40:55.682Z',
  },
  {
    id: 'a6743760-1527-4086-a073-4e03b5dfbfd3',
    url: '/images/atividades/terra/terra-1.jpeg',
    name: 'cachoeira.webp',
    title: '',
    description: '',
    mimetype: 'image/webp',
    adventureId: null,
    scheduleId: 'cm8xjofz00001csjwxj0u3hql',
    index: null,
    isDefault: false,
    createdAt: '2025-04-28T02:40:55.682Z',
    updatedAt: '2025-04-28T02:40:55.682Z',
  },
  {
    id: 'c1da20e6-5b61-4f65-b452-38557ebe3578',
    url: '/images/atividades/mar/mar-3.jpeg',
    name: 'escalada.webp',
    title: '',
    description: '',
    mimetype: 'image/webp',
    adventureId: null,
    scheduleId: 'cm8xjofz00001csjwxj0u3hql',
    index: null,
    isDefault: false,
    createdAt: '2025-04-28T02:40:55.682Z',
    updatedAt: '2025-04-28T02:40:55.682Z',
  },
];
