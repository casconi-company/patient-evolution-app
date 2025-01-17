//import { uploadFile } from "../middlewares/googleStorageMiddleware";

import { getFirestore, doc, setDoc } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";
import { app } from "../config";
import { uploadFile } from "@/storage/gcs";
import path from "path";
import fs from "fs";

const db = getFirestore(app);

export const addEvolution = async (
  evolution: EvolutionFormProps,
  id: string
): Promise<EvolutionFormProps> => {
  try {
    const fileName = uuidv4();
    const evolutionId = uuidv4();

    if (evolution.file) {
      const tempFilePath = path.join(process.cwd(), "temp", fileName);
      fs.writeFileSync(tempFilePath, evolution.file);

      await uploadFile(tempFilePath, fileName);
    }

    const evolutionData: EvolutionFormProps = {
      ...evolution,
      patientId: id,
      fileId: fileName,
    };

    await setDoc(doc(db, "evolutions", evolutionId), evolutionData);

    return evolutionData;
  } catch (error) {
    console.error("Erro ao adicionar evolução:", error);
    throw new Error("Erro ao gravar evolução no banco de dados.");
  }
};
