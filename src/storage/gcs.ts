import { Storage } from "@google-cloud/storage";
import fs from "fs";

// Inicializa o cliente do Google Cloud Storage
const storage = new Storage({
  credentials: JSON.parse(process.env.GCLOUD_KEYFILE || "{}"),
  projectId: process.env.GCLOUD_PROJECT_ID,
});

// Referência ao bucket
const bucketName = process.env.BUCKET_NAME;
const bucket = storage.bucket(bucketName!);

/**
 * Faz upload de um arquivo ao bucket.
 * @param {string} fileName - Nome do arquivo local.
 * @param {string} destination - Nome do arquivo no bucket.
 */
export async function uploadFile(fileName: string, destination: string) {
  try {
    if (!fs.statSync(fileName).isFile()) {
      throw new Error("O caminho especificado não é um arquivo válido");
    }

    await bucket.upload(fileName, {
      destination,
    });
  } catch (error) {
    console.error("Erro ao fazer upload:", error);
    throw new Error();
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
  expiresIn: number = 7200 // Padrão: 2 hora
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
