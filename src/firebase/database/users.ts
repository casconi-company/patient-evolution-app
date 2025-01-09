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
  where,
  getCountFromServer,
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

// GET TOTAL USERS
export const getTotalUsersCount = async (): Promise<number> => {
  const usersCollection = collection(db, "users");
  const snapshot = await getCountFromServer(usersCollection);
  return snapshot.data().count;
};

//GET LIST
export const getUserList = async (
  pageSize: number,
  lastVisible?: QueryDocumentSnapshot<DocumentData> | null,
  filter?: string
): Promise<{
  users: UserProps[];
  total: number;
  lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null;
}> => {
  const usersCollection = collection(db, "users");

  const usersQuery = !!lastVisible
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
      uid: doc.id,
    });
  });

  const lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];

  const totalUsers = await getTotalUsersCount();

  return {
    users: usersData,
    total: totalUsers,
    lastVisibleDoc,
  };
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
