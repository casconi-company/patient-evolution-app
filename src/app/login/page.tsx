"use client";

import { Button, Input } from "@/components";
import Image from "next/image";

export default function Login() {
  return (
    <div className="w-full px-4 pt-4 flex justify-center items-center h-full bg-gradient-to-r from-gray-800 to-gray-700 max-sm:pb-20 max-sm:pt-10 max-sm:overflow-auto">
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
          <p className="text-center mb-5 text-green-50">Login</p>
          <div className="mb-5 w-full">
            <Input placeholder="email@email.com" label="email" />
          </div>
          <div className="mb-7 w-full">
            <Input placeholder="********" label="Senha" type="password" />
          </div>

          <Button text="Entrar" type="submit" className="mb-10" />
        </div>
      </div>
    </div>
  );
}
