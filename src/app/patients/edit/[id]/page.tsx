"use client";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Button, Input, Loader, Select } from "@/components";
import { patientSchema } from "@/schemas/patient";
import { clinicListOptions } from "@/constants/clinic";
import { useEffect, useState } from "react";

export default function EditPacient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<PatientFormProps>({
    defaultValues: {
      name: "",
      cpf: "",
      birthdate: "",
      clinic: "",
      documentNumber: "",
    },
    resolver: zodResolver(patientSchema),
  });

  const handleEditPatient = async (values: PatientFormProps) => {
    const responseEditPatient = await fetch(`/api/patient/${params.id}`, {
      method: "PUT",
      body: JSON.stringify({ ...values }),
    });

    if (responseEditPatient.ok) {
      await responseEditPatient.json();
      toast.success("Paciente cadastrado com sucesso!");
      router.back();
    } else {
      toast.error("Ocorreu um erro ao cadastrar novo usuário!");
    }
  };

  useEffect(() => {
    const getPatientData = async () => {
      try {
        const response = await fetch(`/api/patient/${params.id}`);

        if (response.ok) {
          const { data } = await response.json();

          reset({ ...data });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    getPatientData();
  }, []);

  return (
    <div className="w-full px-4 pt-4 flex justify-center items-center h-full max-sm:pb-20 max-sm:pt-10 max-sm:overflow-auto md:px-10 lg:px-8 min-md:w-[1000px]">
      {isLoading ? (
        <div className="w-full flex mt-10 flex-row justify-center overflow-hidden">
          <Loader />
        </div>
      ) : (
        <div className="flex w-full h-full max-sm:h-auto justify-around flex-col md:flex-row items-center">
          <form onSubmit={handleSubmit(handleEditPatient)} className="w-full">
            <p className="text-center mb-5 text-green-50">Editar paciente</p>
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
                  error={!!errors?.clinic?.message}
                  message={errors.clinic?.message}
                  options={clinicListOptions}
                  register={register}
                  name="clinic"
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
