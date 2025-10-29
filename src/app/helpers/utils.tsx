export const formatCurrency = (value: string) => {
    if (!value || value === "") return "0,00";
    const numeric = value.replace(/\D/g, "");
    if (!numeric || numeric === "") return "0,00";
    const parsedNumber = parseInt(numeric);
    if (isNaN(parsedNumber)) return "0,00";
    const number = (parsedNumber / 100).toFixed(2);
    return number.replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};