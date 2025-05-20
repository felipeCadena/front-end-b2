const handleDownloadImage = async (imageURL: string, fileTitle: string) => {
  try {
    const response = await fetch(`${imageURL}?download=1`);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileTitle;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Erro ao baixar imagem', err);
  }
};

export default handleDownloadImage;
