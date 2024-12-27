"use client";

import { Button } from "@/components";
import { useRouter } from "next/navigation";

export default function Users() {
  const router = useRouter();
  return (
    <div className="w-full px-4 pt-4 flex justify-center items-center h-full max-sm:pb-20 max-sm:pt-10 max-sm:overflow-auto lg:px-8 md:w-[1000px]">
      <div className="w-full flex flex-row justify-end">
        <Button
          className="!w-[250px]"
          text="Cadastrar novo usuário"
          onClick={() => router.push("/admin/register")}
        />
      </div>
    </div>
  );
}