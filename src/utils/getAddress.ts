export const getAddress = async (cep: string) => {
  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const addressData = await response.json();

    console.log(addressData)
    return addressData;
  } catch (error) {
    console.error(error);
  }
};
