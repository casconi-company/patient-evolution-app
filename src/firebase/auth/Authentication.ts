import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { app } from "../config";

const auth = getAuth(app);

export const signIn = async (email: string, password: string) => {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth!, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
};

export const logout = async () => {
  let result = null,
    error = null;
  try {
    result = await signOut(auth!);
  } catch (e) {
    error = e;
  }

  return { result, error };
};
