"use client";

import { Button, Input, Table } from "@/components";
import { PAGE_SIZE } from "@/constants/pagination";
import { getUserList } from "@/firebase/database/users";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

const COLUMNS_USERS = [
  {
    key: "name",
    name: "Nome",
  },
  {
    key: "email",
    name: "e-mail",
  },
  {
    key: "isAdmin",
    name: "Administrador",
  },
  {
    key: "actions",
    name: "Ações",
  },
];

export default function Users() {
  const router = useRouter();
  const [usersData, setUserData] = useState<UserProps[]>();
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleGetUserList = async () => {
    try {
      const data = await getUserList(1, lastVisible);

      const newUsers = data.users.map((user: UserProps) => {
        return {
          uid: user.uid,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin ? "Sim" : "Não",
        };
      });

      setUserData((prevUsers) => [
        ...(prevUsers || []),
        ...newUsers
          .map((user) => {
            const existUser = (prevUsers || [])?.findIndex(
              (prevUser) => user.uid === prevUser.uid
            );

            if (existUser === -1) return user;
            else return {} as UserProps;
          })
          .filter((user) => !!user.uid),
      ]);
      setLastVisible(data.lastVisibleDoc);
      setTotalUsers(data.total);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = () => {
    handleGetUserList();
  };

  useEffect(() => {
    handleGetUserList();
  }, []);

  return (
    <div className="w-full px-4 pt-6 flex flex-col items-center h-full max-sm:pb-20 max-sm:pt-4 max-sm:overflow-auto lg:px-10 min-md:w-[1000px]">
      <div className="w-full flex flex-row justify-between">
        <h2 className="text-white text-2xl">Usuários</h2>
        <Button
          className="!w-[250px] max-md:!w-full"
          text="Cadastrar novo usuário"
          onClick={() => router.push("/admin/register")}
        />
      </div>
      <div className="mt-4 w-full">
        <Input placeholder="pesquisar por email do usuário" />
      </div>

      <div className="mt-6 w-full max-md:hidden">
        <Table
          columns={COLUMNS_USERS}
          data={usersData!}
          onChangePage={handlePageChange}
          total={totalUsers}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
