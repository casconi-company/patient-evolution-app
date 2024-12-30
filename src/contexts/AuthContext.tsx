"use client";

import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

import { getUserData } from "@/firebase/database/users";
import { app } from "@/firebase/config";

const auth = getAuth(app);

interface AuthContextProps {
  userFirebase: User | null;
  userData?: UserProps | null;
  loading: boolean;
  setUserData?: Dispatch<SetStateAction<UserProps | undefined>>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userFirebase, setUserFirebase] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState<UserProps>();

  const getUserDatabase = async (uid: string) => {
    const userDatabase = await getUserData(uid);

    setUserData({
      isAdmin: userDatabase?.isAdmin!,
      name: userDatabase?.name!,
      uid,
    });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth!,
      (user) => {
        if (user) {
          setUserFirebase(user);
          getUserDatabase(user.uid);
        } else {
          console.log("usuário não autenticado");
          setUserFirebase(null);
        }

        setLoading(false);
      },
      (error) => console.log(error)
    );

    return () => unsubscribe();
  }, [auth]);

  return (
    <AuthContext.Provider
      value={{ userFirebase, userData, loading, setUserData }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
