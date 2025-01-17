import { Storage } from "@google-cloud/storage";
import path from "path";

// Inicializa o cliente do Google Cloud Storage
const storage = new Storage({
  keyFilename: process.env.GCLOUD_KEYFILE,
  projectId: process.env.GCLOUD_PROJECT_ID,
});

// Referência ao bucket
const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName!);

/**
 * Faz upload de um arquivo ao bucket.
 * @param {string} filename - Nome do arquivo local.
 * @param {string} destination - Nome do arquivo no bucket.
 */
export async function uploadFile(filename: string, destination: string) {
  try {
    await bucket.upload(filename, {
      destination,
    });
    console.log(`${filename} foi enviado para o bucket ${bucketName}`);
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
  }
}

/**
 * Gera uma URL assinada para acessar um arquivo no Google Cloud Storage.
 * @param fileName Nome do arquivo no bucket.
 * @param expiresIn Segundos até a URL expirar.
 * @returns Uma URL assinada.
 */
export async function generateSignedUrl(
  fileName: string,
  expiresIn: number = 3600 // Padrão: 1 hora
): Promise<string> {
  const options = {
    version: "v4" as const,
    action: "read" as const,
    expires: Date.now() + expiresIn * 1000, // Tempo de expiração em milissegundos
  };

  // Gera a URL assinada
  const [url] = await storage
    .bucket(process.env.BUCKET_NAME!)
    .file(fileName)
    .getSignedUrl(options);

  return url;
}

export default bucket;
