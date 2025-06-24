import JSZip from "jszip";
import { saveAs } from "file-saver";
import { Media } from "@/services/api/schedules";
import { toast } from "react-toastify";

// const downloadImagesAsZip = async (
//   photos: Media[],
//   zipFileName = "imagens.zip"
// ) => {
//   const zip = new JSZip();
//   const folder = zip.folder("fotos");
//   if (!folder) return;

//   const downloadPromises = photos.map(async (photo, index) => {
//     const downloadUrl = `${photo.url}?download=1`;
//     console.log("Baixando:", downloadUrl);
//     try {
//       const response = await fetch(downloadUrl);
//       console.log(`Response da foto ${index + 1}:`, response);
//       if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);

//       const blob = await response.blob();
//       console.log(`Imagem ${index + 1}: tamanho do blob =`, blob.size); // 👈 adicione isso

//       const fileName = photo.title ?? `foto-${index + 1}.jpg`;
//       folder.file(fileName, blob); // Adiciona a foto ao zip na pasta "fotos"
//     } catch (error) {
//       console.error(`Erro ao baixar a imagem ${index + 1}:`, error);
//     }
//   });

//   // Aguardando a conclusão de todas as promessas de download
//   await Promise.all(downloadPromises);

//   // Gerando o arquivo zip após o download de todas as imagens
//   const zipBlob = await zip.generateAsync({ type: "blob" });
//   console.log("ZIP gerado:", zipBlob);

//   // Salvando o arquivo zip
//   saveAs(zipBlob, zipFileName);
// };

export const downloadImagesAsZip = async (
  photos: Media[],
  zipFileName = "B2Adventure.zip"
) => {
  const zip = new JSZip();
  const folder = zip.folder("fotos");
  if (!folder) return;

  // Add detailed logging
  // console.log("Starting download of", photos.length, "images");

  const downloadPromises = photos.map(async (photo, index) => {
    try {
      // Use the URL directly
      const downloadUrl = `${photo.url}?download=1`;
      // console.log(`[${index + 1}/${photos.length}] Downloading:`, downloadUrl);

      // Fetch the image WITHOUT no-cors mode so we can access the response content
      const response = await fetch(downloadUrl, {
        cache: "no-cache",
        // Remove the no-cors mode to allow proper access to image data
      });

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }

      const blob = await response.blob();
      // console.log(
      //   `Image ${index + 1}: blob size =`,
      //   blob.size,
      //   "bytes, type =",
      //   blob.type
      // );

      // If blob is empty or too small, it might be an error
      if (blob.size < 100) {
        console.warn(
          `Warning: Image ${index + 1} is suspiciously small (${blob.size} bytes)`
        );
      }

      // Use a more reliable filename pattern
      const extension = blob.type.split("/")[1] || "jpg";
      const fileName = photo.title
        ? `${photo.title.replace(/[^a-z0-9\.]/gi, "_")}.${extension}`
        : `photo-${index + 1}.${extension}`;

      folder.file(fileName, blob);
      // console.log(`Added ${fileName} to zip (${blob.size} bytes)`);
    } catch (error) {
      console.error(`Error downloading image ${index + 1}:`, error);
    }
  });

  try {
    // Wait for all download promises to complete
    await Promise.all(downloadPromises);
    // console.log("All downloads completed, generating zip...");

    // Generate the zip file after all images are downloaded
    const zipBlob = await zip.generateAsync({
      type: "blob",
      compression: "DEFLATE",
      compressionOptions: { level: 6 },
    });
    // console.log("ZIP generated:", zipBlob.size, "bytes");

    if (zipBlob.size < 100) {
      console.error("Warning: Generated ZIP is very small, likely empty");
    }

    // Save the zip file
    saveAs(zipBlob, zipFileName);
    console.log("ZIP file saved as", zipFileName);
    toast.success("Fotos baixadas com sucesso!");
    return true;
  } catch (error) {
    console.error("Error generating or saving ZIP:", error);
    toast.error("Erro ao baixar as fotos");
    return false;
  }
};

export default downloadImagesAsZip;
