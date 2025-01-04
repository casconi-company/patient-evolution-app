"use client";

import { Button, Input } from "@/components";
import { useRouter } from "next/navigation";

export default function Users() {
  const router = useRouter();

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

      <div className="mt-6"></div>
    </div>
  );
}
