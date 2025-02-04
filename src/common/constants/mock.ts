export const profile = {
  avatar: "/images/avatar1.png",
  name: "Luciana Bianco",
  email: ""
}

export const activities = [
  {
    id: "1",
    image: "/images/mar.png",
    tag: "Atividade no Mar",
    stars: 5,
    title: "Passeio de barco",
    localizacao: "Marina da Glória - RJ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    favorite: true,
    parceiro: {
      nome: "Ana Francisca Moraes",
      avatar: "/images/avatar2.png",
    },
    reserva: {
      timestamp: "2025-03-12T08:00:00",
      pessoas: 2,
      total: 363.86
    }

  },
  {
    id: "2",
    image: "/images/ar.png",
    tag: "Atividade Aérea",
    stars: 3,
    title: "Escalada Cristo - RJ",
    localizacao: "Cosme Velho - RJ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",

    parceiro: {
      nome: "Ana Francisca Moraes",
      avatar: "/images/avatar1.png",
    },
    reserva: {
      timestamp: "2024-12-12T14:00:00",
      pessoas: 3,
      total: 496.50
    }
  },
  {
    id: "3",
    image: "/images/terra.png",
    tag: "Atividade Terrestre",
    stars: 4,
    title: "Voo de Parapente",
    localizacao: "São Conrado - RJ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    favorite: true,
    parceiro: {
      nome: "Ana Francisca Moraes",
      avatar: "/images/avatar3.png",
    },
    reserva: {
      timestamp: "2024-12-12T16:00:00",
      pessoas: 4,
      total: 763.50
    }
  },
  {
    id: "4",
    image: "/images/mar.png",
    tag: "Atividade no Mar",
    stars: 5,
    title: "Passeio de barco",
    localizacao: "Ilhas Tijuca - RJ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    parceiro: {
      nome: "Ana Francisca Moraes",
      avatar: "/images/avatar1.png",
    },
    data: "05/01",
    hora: "11:00",
    reserva: {
      timestamp: "2025-01-05T11:00:00",
      pessoas: 1,
      total: 247.30
    }
  },
  {
    id: "5",
    image: "/images/mar.png",
    tag: "Atividade no Mar",
    stars: 5,
    title: "Passeio de barco",
    localizacao: "Ilhas Tijuca - RJ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    parceiro: {
      nome: "Ana Francisca Moraes",
      avatar: "/images/avatar1.png",
    },
    data: "05/01",
    hora: "11:00",
    reserva: {
      timestamp: "2025-01-05T11:00:00",
      pessoas: 1,
      total: 247.30
    }
  },
  {
    id: "6",
    image: "/images/terra.png",
    tag: "Atividade Terrestre",
    stars: 4,
    title: "Voo de Parapente",
    localizacao: "São Conrado - RJ",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    favorite: true,
    parceiro: {
      nome: "Ana Francisca Moraes",
      avatar: "/images/avatar3.png",
    },
    reserva: {
      timestamp: "2024-12-12T16:00:00",
      pessoas: 4,
      total: 763.50
    }
  },
];

export const notifications = [
  {
    id: 1,
    title: "Atividade Monte Rio Cancelada",
    timestamp: "2025-02-01T17:50:00",
    reason:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    read: false,
    status: "cancelada",
    description: "Sua atividade foi cancelada por um dos nossos parceiros.",
    parceiro: {
      avatar: "/images/avatar1.png",
      nome: "Bruna Delduca"
    }
  },
  {
    id: 2,
    title: "Atividade Cristo Redentor - É hoje!",
    timestamp: "2025-01-31T11:00:00",
    reason:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    read: true,
    status: "pendente",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    parceiro: {
      avatar: "/images/avatar1.png",
      nome: "Felipe Almeida"
    }
  },
  {
    id: 3,
    title: "Atividade Cristo Redentor - Próxima",
    timestamp: "2025-01-30T08:30:00",
    reason:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    read: true,
    status: "pendente",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    parceiro: {
      avatar: "/images/avatar1.png",
      nome: "Talisson Silva"
    }
  },
  {
    id: 4,
    title: "Atividade Cristo Redentor - Agendada",
    timestamp: "2025-01-20T10:20:00",
    reason:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    read: true,
    status: "pendente",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    parceiro: {
      avatar: "/images/avatar1.png",
      nome: "Michel Nicolay"
    }
  },
  {
    id: 5,
    title: "Atividade Surfe - Realizada",
    timestamp: "2025-01-25T09:20:00",
    reason:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    read: false,
    status: "realizada",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quas.",
    parceiro: {
      avatar: "/images/avatar1.png",
      nome: "Bruna Delduca"
    }
  },
];

export const reviews = [
  {
    avatar: "/images/avatar1.png",
    name: "Luciana Bianco",
    date: "12/12/2022",
    description:
      "Eu adorei participar das atividades da B2 Adventure, eles cuidaram de tudo pra mim e garantiram minha segurança e tive uma experiência inesquecível!",
  },
  {
    avatar: "/images/avatar2.png",
    name: "Fátima Bernardo",
    date: "12/12/2024",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.",
  },
  {
    avatar: "/images/avatar3.png",
    name: "Eduardo Moraes",
    date: "12/12/2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.",
  },
  {
    avatar: "/images/avatar2.png",
    name: "Fátima Bernardo",
    date: "12/12/2024",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.",
  },
  {
    avatar: "/images/avatar1.png",
    name: "Luciana Bianco",
    date: "12/12/2022",
    description:
      "Eu adorei participar das atividades da B2 Adventure, eles cuidaram de tudo pra mim e garantiram minha segurança e tive uma experiência inesquecível!",
  },
  {
    avatar: "/images/avatar3.png",
    name: "Eduardo Moraes",
    date: "12/12/2023",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Enim habitasse eu eget ac morbi neque. Tempus, quam pellentesque massa quis.",
  },
];
