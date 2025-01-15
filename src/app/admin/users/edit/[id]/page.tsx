"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useParams, useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button, Input, Loader, Switch } from "@/components";
import { editUserSchema } from "@/schemas/user";
import { useEffect, useState } from "react";
export default function EditUser() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EditUserProps>({
    defaultValues: {
      name: "",
      isAdmin: false,
    },
    resolver: zodResolver(editUserSchema),
  });

  register("isAdmin");
  const isUserAdmin = watch("isAdmin");

  const handleSubmitEditUser = async (values: EditUserProps) => {
    const responseEditUser = await fetch(`/api/user/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: values.name,
        isAdmin: values.isAdmin || false,
      }),
    });

    if (responseEditUser.ok) {
      router.push("/admin/users");
    } else {
      toast.error("Ocorreu um erro ao editar usuário!");
    }
  };

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await fetch(`/api/user/${params.id}`);

        if (response.ok) {
          const { data } = await response.json();
          reset({ name: data.name, isAdmin: data.isAdmin });
        }
      } catch (error) {
        toast.error("Ocorreu um erro ao buscar dados do usuário!");
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, []);

  return (
    <div className="w-full md:max-w-[1000px] px-4 pt-4 flex justify-center items-center h-full max-sm:pb-20 max-sm:pt-10 max-sm:overflow-auto md:px-10 lg:px-8 min-md:w-[1000px]">
      {isLoading ? (
        <div className="w-full flex mt-10 flex-row justify-center overflow-hidden">
          <Loader />
        </div>
      ) : (
        <div className="flex w-full h-full max-sm:h-auto justify-around flex-col md:flex-row items-center">
          <form
            onSubmit={handleSubmit(handleSubmitEditUser)}
            className="w-full"
          >
            <p className="text-center mb-5 text-green-50">Editar usuário</p>
            <div className="mb-5 w-full">
              <Input
                placeholder="Nome"
                label="Nome"
                register={register}
                name="name"
                error={!!errors?.name?.message}
                message={errors.name?.message}
              />
            </div>

            <div className="w-full mb-7 flex">
              <Switch
                checked={isUserAdmin!}
                onChange={(event) => setValue("isAdmin", event.target.checked)}
              />
              <p className="text-gray-500 text-md ml-2">
                Usuário será Administrador?
              </p>
            </div>

            <div className="flex flex-row w-full justify-center">
              <Button
                text="Cancelar"
                className="mb-10 !bg-red-400 md:w-[250px] mr-10"
                onClick={() => router.back()}
              />
              <Button
                text="Editar"
                type="submit"
                className="mb-10 !bg-blue-50 md:w-[250px]"
                loading={isSubmitting}
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
