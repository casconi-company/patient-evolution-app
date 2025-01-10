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
export const getTotalUsersCount = async (filter?: string): Promise<number> => {
  const usersCollection = collection(db, "users");

  let usersQuery = query(usersCollection, orderBy("name"));

  if (filter) {
    usersQuery = query(
      usersQuery,
      where("email", ">=", filter),
      where("email", "<=", filter + "\uf8ff")
    );
  }

  const snapshot = await getCountFromServer(usersQuery);
  return snapshot.data().count;
};

//GET LIST
export const getUserList = async (
  pageSize: number,
  lastVisible?: QueryDocumentSnapshot<DocumentData> | null,
  filter?: string
): Promise<
  | {
      users: UserProps[];
      total: number;
      lastVisibleDoc: QueryDocumentSnapshot<DocumentData> | null;
    }
  | undefined
> => {
  try {
    const usersCollection = collection(db, "users");

    let usersQuery = query(usersCollection, orderBy("name"));

    if (filter) {
      usersQuery = query(
        usersQuery,
        where("email", ">=", filter),
        where("email", "<=", filter + "\uf8ff")
      );
    }

    if (lastVisible) {
      usersQuery = query(usersQuery, startAfter(lastVisible));
    }

    usersQuery = query(usersQuery, limit(pageSize));

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

    const totalUsers = await getTotalUsersCount(filter);

    return {
      users: usersData,
      total: totalUsers,
      lastVisibleDoc,
    };
  } catch (err) {
    console.error(err);
  }
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
