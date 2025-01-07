import {
  doc,
  getDoc,
  getFirestore,
  setDoc,
  collection,
  query,
  orderBy,
  startAfter,
  limit,
  getDocs,
  QueryDocumentSnapshot,
  DocumentData,
} from "firebase/firestore";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../config";
//import { firestore } from "../config";

const auth = getAuth(app);
const db = getFirestore(app);

//*************************************FUNC GET
//GET por ID
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

//GET LIST
export const getUserList = async (
  lastVisible: QueryDocumentSnapshot<DocumentData> | null,
  pageSize: number
): Promise<UserProps[]> => {
  const usersCollection = collection(db, "users");
  const usersQuery = lastVisible
    ? query(
        usersCollection,
        orderBy("name"),
        startAfter(lastVisible),
        limit(pageSize)
      )
    : query(usersCollection, orderBy("name"), limit(pageSize));

  const snapshot = await getDocs(usersQuery);

  const usersData: UserProps[] = [];
  snapshot.forEach((doc) => {
    const data = doc.data();
    usersData.push({
      name: data.name,
      email: data.email,
      isAdmin: data.isAdmin,
      uid: data.uid,
    });
  });

  return usersData;
};

//*************************************FUNC POST
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
