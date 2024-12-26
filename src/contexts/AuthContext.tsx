"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";

import { auth } from "@/firebase/config";
import { getUserData } from "@/firebase/database/users";

interface AuthContextProps {
  userFirebase: User | null;
  userData?: UserProps | null;
  loading: boolean;
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserFirebase(user);
        getUserDatabase(user.uid);
      } else {
        setUserFirebase(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ userFirebase, userData, loading }}>
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
