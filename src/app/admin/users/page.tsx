"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button, Input, Loader, Table, UserCard } from "@/components";
import { PAGE_SIZE } from "@/constants/pagination";

import { getUserList } from "@/firebase/database/users";
import { toast } from "react-toastify";
import { sendResetPasswordWithEmail } from "@/firebase/auth/Authentication";

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

const Actions = ({
  onClickEdit,
  onClickResetPassword,
  isLoadingResetPassword,
}: {
  onClickEdit: () => void;
  onClickResetPassword: () => Promise<void>;
  isLoadingResetPassword: boolean;
}) => {
  return (
    <div className="flex flex-row max-md:flex-col">
      <Button
        className="!bg-yellow-50 !h-8 w-[100px] mr-4 max-md:w-[120px] max-md:mb-4"
        textStyle="text-sm"
        text="Editar"
        onClick={onClickEdit}
      />

      <Button
        className="!bg-green-50 !h-8 px-2 w-[120px] flex flex-wrap"
        textStyle="text-xs w-full text-wrap"
        text="Alterar a senha"
        onClick={onClickResetPassword}
        loading={isLoadingResetPassword}
      />
    </div>
  );
};

export default function Users() {
  const router = useRouter();
  const [usersData, setUserData] = useState<UserTableProps[]>();
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [textFilter, setTextFilter] = useState<string>("");
  const [isLoadingResetPassword, setIsLoadingResetPassword] =
    useState<boolean>(false);

  const handleResetPasswordUser = async (email: string) => {
    setIsLoadingResetPassword(true);
    try {
      const { error } = await sendResetPasswordWithEmail(email);

      if (error) throw new Error();

      toast.success(
        "O e-mail para alterar a senha foi enviado para o seguinte endereço de e-mail: " +
          email
      );
    } catch (error) {
      toast.error(
        "Ocorreu erro ao tentar enviar e-mail de alteração de senha!"
      );
    } finally {
      setIsLoadingResetPassword(false);
    }
  };

  const handleGetUserList = async (filter?: string, isPagination?: boolean) => {
    if (!isLoadingMore && !isPagination) {
      setIsLoading(true);
    }

    try {
      const data = await getUserList(
        PAGE_SIZE,
        isPagination ? lastVisible : null,
        filter
      );

      const newUsers = data?.users.map((user: UserProps) => {
        return {
          uid: user.uid,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin ? "Sim" : "Não",
          actions: (
            <Actions
              onClickEdit={() => router.push(`/admin/users/edit/${user.uid}`)}
              onClickResetPassword={() => handleResetPasswordUser(user.email!)}
              isLoadingResetPassword={isLoadingResetPassword}
            />
          ),
        } as UserTableProps;
      });

      if (isPagination) {
        setUserData((prevUsers) => [
          ...(prevUsers || []),
          ...newUsers!.filter(
            (user) =>
              !(prevUsers || []).some((prevUser) => prevUser.uid === user.uid)
          ),
        ]);
      } else {
        setUserData(newUsers);
      }

      setLastVisible(data?.lastVisibleDoc);
      setTotalUsers(data?.total || 0);
    } catch (error) {
      toast.error("Ocorreu um erro ao carregar os usuários!");
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handlePageChange = () => {
    handleGetUserList(textFilter, true);
    setIsLoadingMore(true);
  };

  const handleChangeFilter = async () => {
    setUserData([]);
    setLastVisible(null);
    setIsLoading(true);
    setTotalUsers(0);

    await handleGetUserList(textFilter, false);
  };

  const handleKeyPressDown = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      handleChangeFilter();
    }
  };

  useEffect(() => {
    handleGetUserList();
  }, []);

  return (
    <div className="w-full px-4 pt-6 flex flex-col items-center h-full max-sm:pb-20 max-sm:pt-4 max-sm:overflow-auto lg:px-10 min-md:w-[1000px]">
      <div className="w-full flex flex-row justify-between">
        <h2 className="text-white text-2xl">Usuários</h2>
        <Button
          className="!w-[250px] lg:!w-[250px]"
          text="Cadastrar novo usuário"
          onClick={() => router.push("/admin/register")}
        />
      </div>
      <div className="mt-4 w-full flex flex-row">
        <Input
          placeholder="pesquisar por email do usuário"
          onChange={(event) => setTextFilter(event.target.value)}
          onKeyDown={handleKeyPressDown}
        />
        <Button
          text="Pesquisar"
          className="w-[140px] ml-4 !bg-blue-50"
          onClick={handleChangeFilter}
        />
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

      {!usersData?.length && !isLoading && (
        <p className="mt-10">Não há usuários cadastrados</p>
      )}

      {isLoading ? (
        <div className="w-full mt-10 flex flex-row justify-center overflow-hidden">
          <Loader />
        </div>
      ) : (
        !!usersData?.length && (
          <div className="mt-6 w-full md:hidden">
            {usersData.map((user) => (
              <UserCard data={user} />
            ))}
          </div>
        )
      )}

      {usersData?.length! < totalUsers! && (
        <div className="w-full flex justify-center mt-4">
          <Button
            text="Carregar mais"
            className="!bg-yellow-50 !h-10 md:w-[200px]"
            textStyle="text-sm "
            onClick={handlePageChange}
            loading={isLoadingMore}
          />
        </div>
      )}
    </div>
  );
}
