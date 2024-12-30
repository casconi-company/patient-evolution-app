import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../config";

const auth = getAuth(app);
const db = getFirestore(app);

export const getUserData = async (uid: string) => {
  try {
    const userDocRef = doc(db, "users", uid);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data() as UserProps;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    console.log(error);
  }
};

export const createUser = async (user: SignUpFormProps) => {
  try {
    let result = null;

    result = await createUserWithEmailAndPassword(
      auth!,
      user.email,
      user.password
    );

    await setDoc(doc(db, "users", result.user.uid), {
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } catch (error) {
    console.log(error);
  }
};
