"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

import { Button, Input } from "@/components";
import { loginSchema } from "@/schemas/user";

export default function Login() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormProps>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const handleSignInUser = async (values: LoginFormProps) => {
    const responsePostLogin = await fetch("api/public/login", {
      method: "POST",
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      }),
    });

    if (responsePostLogin.ok) {
      const data = await responsePostLogin.json();

      if (!!data.token) {
        await fetch("api/login", {
          headers: {
            Authorization: `Bearer ${data.token}`,
          },
        });

        return router.push("/");
      }
    } else {
      toast.error("Ocorreu um erro ao logar com seu usuário!");
    }
  };

  return (
    <div className="w-full px-4 pt-4 flex justify-center items-center h-screen bg-gradient-to-r from-gray-800 to-gray-700 max-sm:pb-20 max-sm:pt-10 max-sm:overflow-auto">
      <div className="flex w-full h-full max-sm:h-auto justify-around flex-col md:flex-row items-center">
        <div className="flex flex-col justify-center items-center">
          <div className="mt-24 max-sm:mt-20">
            <Image
              alt="logo-CIITA"
              src="/Logo_CIITA.png"
              className="no-styles max-sm:w-[160px] max-sm:h-[50px]"
              width={290}
              height={140}
            />
          </div>

          <div className="mt-8">
            <Image
              alt="logo-CIITA"
              src="/Logo_CIITA_PLUS.png"
              className="no-styles max-sm:w-[150px] max-sm:h-[50px]"
              width={310}
              height={170}
            />
          </div>

          <div className="-mt-12 max-sm:mt-0">
            <Image
              alt="logo-CIITA"
              src="/CIITA_PIP.png"
              className="no-styles max-sm:w-[210px] max-sm:h-[140px]"
              width={410}
              height={200}
            />
          </div>
        </div>
        <div className="md:w-[600px] md:h-[400px] w-full h-full max-sm:mt-0 p-8 rounded-md bg-white/20 backdrop-blur-md shadow-xl">
          <form onSubmit={handleSubmit(handleSignInUser)} className="w-full">
            <p className="text-center mb-5 text-green-50">Login</p>
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
            <div className="mb-7 w-full">
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

            <Button
              text="Entrar"
              type="submit"
              className="mb-10"
              loading={isSubmitting}
            />
          </form>
        </div>
      </div>
    </div>
  );
}
