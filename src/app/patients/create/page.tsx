"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, Input, Select } from "@/components";
import { patientSchema } from "@/schemas/patient";
import { clinicListOptions } from "@/constants/clinic";

export default function CreatePacient() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PatientFormProps>({
    defaultValues: {
      name: "",
      cpf: "",
      birthdate: "",
      clinicId: "",
      documentNumber: "",
    },
    resolver: zodResolver(patientSchema),
  });

  const handleSignUpUser = async (values: PatientFormProps) => {
    console.log(values);
    const responseSignUpUser = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({}),
    });

    if (responseSignUpUser.ok) {
      router.push("/admin/users");
    } else {
      toast.error("Ocorreu um erro ao cadastrar novo usuário!");
    }
  };

  return (
    <div className="w-full px-4 pt-4 flex justify-center items-center h-full max-sm:pb-20 max-sm:pt-10 max-sm:overflow-auto md:px-10 lg:px-8 min-md:w-[1000px]">
      <div className="flex w-full h-full max-sm:h-auto justify-around flex-col md:flex-row items-center">
        <form onSubmit={handleSubmit(handleSignUpUser)} className="w-full">
          <p className="text-center mb-5 text-green-50">
            Cadastrar novo paciente
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
          <div className="flex flex-row justify-around max-md:flex-col">
            <div className="mb-7 w-[50%] max-md:w-full md:mr-10">
              <Input
                placeholder="Número de carteirinha"
                label="Número de carteirinha"
                register={register}
                name="documentNumber"
                type="text"
                error={!!errors?.documentNumber?.message}
                message={errors.documentNumber?.message}
              />
            </div>
            <div className="mb-7 w-[50%] max-md:w-full">
              <Input
                placeholder="000.000.000-00"
                label="CPF"
                register={register}
                name="cpf"
                error={!!errors?.cpf?.message}
                message={errors.cpf?.message}
                mask="999.999.999-99"
              />
            </div>
          </div>
          <div className="flex flex-row justify-around max-md:flex-col">
            <div className="mb-7 w-[50%] max-md:w-full md:mr-10">
              <Input
                placeholder="dd/mm/aaaa"
                label="Data de nascimento"
                type="date"
                name="birthdate"
                register={register}
                error={!!errors?.birthdate?.message}
                message={errors.birthdate?.message}
              />
            </div>
            <div className="mb-7 w-[50%] max-md:w-full">
              <Select
                label="Clinica"
                placeholder="Clinica"
                error={!!errors?.clinicId?.message}
                message={errors.clinicId?.message}
                options={clinicListOptions}
                register={register}
                name="clinicId"
              />
            </div>
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
