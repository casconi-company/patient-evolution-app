import { getAuth } from "firebase/auth";
import { doc, setDoc, getFirestore } from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // Biblioteca para gerar UUID
import { app } from "../config";

const auth = getAuth(app);
const db = getFirestore(app);

export const addPatient = async (
  patient: Omit<
    PatientProps,
    "id" | "updatedAt" | "clinicName" | "therapistName"
  >
) => {
  try {
    const id = uuidv4(); // Gera um UUID único
    const updatedAt = new Date().toISOString(); // Data de atualização

    const newPatient: PatientProps = {
      id,
      ...patient,
      updatedAt,
    };

    await setDoc(doc(db, "patients", id), newPatient); // Grava no Firestore
    return newPatient; // Retorna o paciente criado
  } catch (error) {
    console.error("Error adding patient:", error);
    throw new Error("Failed to add patient");
  }
};
