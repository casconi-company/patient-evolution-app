import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";

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
