"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button, Input, Switch } from "@/components";
import { signUpSchema } from "@/schemas/user";

export default function Register() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormProps>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      isAdmin: false,
    },
    resolver: zodResolver(signUpSchema),
  });

  const isUserAdmin = watch("isAdmin");

  const handleSignUpUser = async (values: LoginFormProps) => {
    const responseSignUpUser = await fetch("api/register", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (responseSignUpUser.ok) {
      router.push("/users");
    } else {
      toast.error("Ocorreu um erro ao logar com seu usuário!");
    }
  };

  return (
    <div className="w-full px-4 pt-4 flex justify-center items-center h-full max-sm:pb-20 max-sm:pt-10 max-sm:overflow-auto lg:px-8 md:w-[1000px]">
      <div className="flex w-full h-full max-sm:h-auto justify-around flex-col md:flex-row items-center">
        <form onSubmit={handleSubmit(handleSignUpUser)} className="w-full">
          <p className="text-center mb-5 text-green-50">
            Cadastrar novo usuário
          </p>
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
          <div className="mb-5 w-full">
            <Input
              placeholder="email@email.com"
              label="email"
              register={register}
              name="email"
              error={!!errors?.email?.message}
              message={errors.email?.message}
            />
          </div>
          <div className="flex flex-row justify-around max-md:flex-col">
            <div className="mb-7 w-[50%] max-md:w-full md:mr-10">
              <Input
                placeholder="********"
                label="Senha"
                type="password"
                name="password"
                register={register}
                error={!!errors?.password?.message}
                message={errors.password?.message}
              />
            </div>
            <div className="mb-7 w-[50%] max-md:w-full">
              <Input
                placeholder="********"
                label="Confirmar senha"
                type="password"
                name="confirmPassword"
                register={register}
                error={!!errors?.confirmPassword?.message}
                message={errors.confirmPassword?.message}
              />
            </div>
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
              text="Cadastrar"
              type="submit"
              className="mb-10 !bg-blue-50 md:w-[250px]"
              loading={isSubmitting}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
