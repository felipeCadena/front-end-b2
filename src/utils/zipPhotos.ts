import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { Media } from '@/services/api/schedules';

const downloadImagesAsZip = async (
  photos: Media[],
  zipFileName = 'imagens.zip'
) => {
  const zip = new JSZip();

  const folder = zip.folder('fotos');
  if (!folder) return;

  const downloadPromises = photos.map(async (photo, index) => {
    try {
      const response = await fetch(photo.url);
      const blob = await response.blob();
      const fileName = photo.title ?? `foto-${index + 1}.jpg`;
      folder.file(fileName, blob);
    } catch (error) {
      console.error(`Erro ao baixar a imagem ${index + 1}:`, error);
    }
  });

  await Promise.all(downloadPromises);

  zip.generateAsync({ type: 'blob' }).then((content) => {
    saveAs(content, zipFileName);
  });
};

export default downloadImagesAsZip;
