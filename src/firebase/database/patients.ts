import { getAuth } from "firebase/auth";
import {
  doc,
  setDoc,
  getFirestore,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid"; // Biblioteca para gerar UUID
import { app } from "../config";

const auth = getAuth(app);
const db = getFirestore(app);

//*************************************
//ADD PATIENT
export const addPatient = async (
  patient: Omit<
    PatientProps,
    "id" | "updatedAt" | "clinicName" | "therapistName"
  >
) => {
  try {
    const uid = uuidv4(); // Gera um UUID único
    const createdAt = new Date().toISOString().replace("Z", ""); // Data de criação sem timezone

    const newPatient: PatientProps = {
      ...patient,
      createdAt,
      therapistId: "",
      diagnostic: "",
    };

    await setDoc(doc(db, "patients", uid), newPatient); // Grava no Firestore
    return { ...newPatient, uid }; // Retorna o paciente criado
  } catch (error) {
    console.error("Error adding patient:", error);
    throw new Error("Failed to add patient");
  }
};

//*************************************FUNC GET
//GET PATIENT
export const getPatientData = async (uid: string) => {
  try {
    const patientDocRef = doc(db, "patients", uid);
    const patientDoc = await getDoc(patientDocRef);

    if (patientDoc.exists()) {
      return patientDoc.data() as PatientProps;
    } else {
      throw new Error("Patient not found");
    }
  } catch (error) {
    console.log(error);
  }
};

//*************************************FUNC PUT
//PUT CLINIC
export const updatePatientClinic = async (uid: string, clinic: string) => {
  try {
    const patientDocRef = doc(db, "patients", uid);

    await updateDoc(patientDocRef, {
      clinic,
    });
  } catch (error) {
    console.log(error);
  }
};

//*************************************FUNC PUT
//PUT THERAPIST
export const updatePatientTherapist = async (
  uid: string,
  therapistId: string
) => {
  try {
    const patientDocRef = doc(db, "patients", uid);

    await updateDoc(patientDocRef, {
      therapistId,
    });
  } catch (error) {
    console.log(error);
  }
};

//*************************************FUNC PUT
//PUT THERAPIST
export const updatePatientDiagnostic = async (
  uid: string,
  diagnostic: string
) => {
  try {
    const patientDocRef = doc(db, "patients", uid);

    await updateDoc(patientDocRef, {
      diagnostic,
    });
  } catch (error) {
    console.log(error);
  }
};

//*************************************FUNC PUT
//PUT PATIENT
export const updatePatient = async (
  uid: string,
  patient: Omit<
    PatientProps,
    | "id"
    | "updatedAt"
    | "clinicName"
    | "therapistName"
    | "createdAt"
    | "therapistId"
    | "clinic"
    | "diagnostic"
  >
) => {
  try {
    const patientDocRef = doc(db, "patients", uid);

    await updateDoc(patientDocRef, {
      ...patient,
    });
  } catch (error) {
    console.log(error);
  }
};
