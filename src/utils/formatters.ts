export function getData(timestamp: string) {
  const date = new Date(timestamp);
  const dia = String(date.getDate()).padStart(2, "0"); // Dia com 2 dígitos
  const mes = String(date.getMonth() + 1).padStart(2, "0"); // Mês com 2 dígitos
  return `${dia}/${mes}`; // Formato DD/MM
}

export function getHora(timestamp: string) {
  const date = new Date(timestamp);
  const horas = String(date.getHours()).padStart(2, "0"); // Hora com 2 dígitos
  const minutos = String(date.getMinutes()).padStart(2, "0"); // Minutos com 2 dígitos
  return `${horas}:${minutos}`; // Formato HH:mm
}

export function isDateInPast(timestamp: string) {
  const today = new Date(); // Data atual
  today.setHours(0, 0, 0, 0); // Zerando as horas para considerar apenas a data
  const dateToCheck = new Date(timestamp); // Convertendo o timestamp para uma data

  return dateToCheck < today; // Verifica se a data é anterior a hoje
}

export function formatDate(timestamp: string): string {
  if (!timestamp) return "";
  
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  
  if (diffMinutes <= 20) {
    return "Agora pouco";
  }
  
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  const dayBeforeYesterday = new Date(today);
  dayBeforeYesterday.setDate(today.getDate() - 2);

  if (date >= today) {
    return "Hoje ";
  } else if (date >= yesterday) {
    return "Ontem ";
  } else if (date >= dayBeforeYesterday) {
    return "Anteontem ";
  }

  return date.toLocaleDateString();
}
