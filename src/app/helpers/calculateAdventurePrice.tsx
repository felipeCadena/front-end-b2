const b2Tax = process.env.NEXT_PUBLIC_PERCENTAGE_TAX_B2;
const tax = process.env.NEXT_PUBLIC_PERCENTAGE_TAX;

function parseFormattedNumber(value: string | number): number {
    if (!value || value === "") return 0;
    // Remove pontos (milhar) e troca vírgula por ponto (decimal)
    const numericValue = Number(value.toString().replace(/\./g, "").replace(",", "."));
    // Retorna 0 se o resultado for NaN
    return isNaN(numericValue) ? 0 : numericValue;
}

export const calculateAdventurePrice = (
    partnerPrice: string | number | undefined | null
) => {
    const taxB2Percentage = Number(b2Tax) || 0;
    const taxPercentage = Number(tax) || 0;

    const price = parseFormattedNumber(partnerPrice || 0);

    const b2Fee = (price * taxB2Percentage) / 100;

    const taxTotal = (Number(b2Fee) * taxPercentage) / 100;

    const realTax = (taxTotal * taxPercentage) / 100;
    const allTax = taxTotal + realTax;

    const totalCliente = price + b2Fee + taxTotal + realTax;

    const response = {
        valorParceiro: price,
        b2Fee: b2Fee.toFixed(2),
        b2FeePercentage: taxB2Percentage,
        tax: Math.round((allTax + Number.EPSILON) * 100) / 100,
        totalCliente: Math.round((totalCliente + Number.EPSILON) * 100) / 100,
    };

    console.log(response)
    return response;
};
