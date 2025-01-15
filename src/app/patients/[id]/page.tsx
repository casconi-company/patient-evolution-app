"use client";
import { useEffect, useState } from "react";

import {
  Button,
  Loader,
  ModalClinic,
  ModalDiagnostic,
  ModalEvolution,
  ModalTherapist,
} from "@/components";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { differenceInYears, format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";
import { getUserData } from "@/firebase/database/users";
import { getClinicImage } from "@/helpers/clinic";
import { toast } from "react-toastify";

const evolutions = [
  {
    date: "2015-01-01T00:00:00",
    time: "16:40",
    evolution:
      "Teste de evolução do paciente mensagem de teste, o paciente teve uma melhora na coordenação",
  },
  {
    date: "2015-01-01T00:00:00",
    time: "16:40",
    evolution:
      "Teste de evolução do paciente mensagem de teste, o paciente teve uma melhora na coordenação",
  },
  {
    date: "2015-01-01T00:00:00",
    time: "16:40",
    evolution:
      "Teste de evolução do paciente mensagem de teste, o paciente teve uma melhora na coordenação",
  },
  {
    date: "2015-01-01T00:00:00",
    time: "16:40",
    evolution:
      "Teste de evolução do paciente mensagem de teste, o paciente teve uma melhora na coordenação",
  },
  {
    date: "2015-01-01T00:00:00",
    time: "16:40",
    evolution:
      "Teste de evolução do paciente mensagem de teste, o paciente teve uma melhora na coordenação",
  },
];

export default function DetailsPatient() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [openModalClinic, setOpenModalClinic] = useState<boolean>(false);
  const [openModalDiagnostic, setOpenModalDiagnostic] =
    useState<boolean>(false);
  const [openModalTherapist, setOpenModalTherapist] = useState<boolean>(false);
  const [openModalEvolution, setOpenModalEvolution] = useState<boolean>(false);
  const [patientData, setPatientData] = useState<PatientProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userOptions, setUserOptions] = useState<OptionProp[]>([]);
  const { userData } = useAuth();

  const getPatientData = async () => {
    try {
      const response = await fetch(`/api/patient/${params.id}`);

      if (response.ok) {
        const { data } = await response.json();
        let therapistName = "";
        let clinicImage = "";

        const responseUserOptions = await fetch("/api/user/options-list");

        if (responseUserOptions.ok) {
          const { data: userOptionsData } = await responseUserOptions.json();
          setUserOptions(userOptionsData);
        }

        if (!!data.therapistId) {
          const responseUser = await fetch(`/api/user/${data.therapistId}`);

          if (responseUser.ok) {
            const { data: user } = await responseUser.json();
            therapistName = user.name;
          }
        }

        clinicImage = getClinicImage(data.clinic);

        const newPatientData = {
          ...data,
          therapistName,
          clinicName: clinicImage,
        };
        setPatientData(newPatientData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateClinic = async (clinic: string) => {
    try {
      await fetch(`/api/patient/clinic/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ clinic }),
      });

      toast.success("Clinica atualizada com sucesso!");
      setOpenModalClinic(false);
      await getPatientData();
    } catch (err) {
      toast.error("Ocorreu um erro ao atualizar a clínica");
    }
  };

  const handleUpdateDiagnostic = async (diagnostic: string) => {
    try {
      await fetch(`/api/patient/diagnostic/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ diagnostic }),
      });

      toast.success("Diagnóstico atualizado com sucesso!");
      setOpenModalDiagnostic(false);
      await getPatientData();
    } catch (err) {
      toast.error("Ocorreu um erro ao atualizar o diagnóstico");
    }
  };

  const handleUpdateTherapist = async (therapistId: string) => {
    try {
      await fetch(`/api/patient/therapist/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ therapistId }),
      });

      toast.success("Terapeuta atualizada(o) com sucesso!");
      setOpenModalTherapist(false);
      await getPatientData();
    } catch (err) {
      toast.error("Ocorreu um erro ao atualizar a(o) Terapeuta");
    }
  };

  useEffect(() => {
    getPatientData();
  }, []);

  if (!isLoading && !patientData) {
    return (
      <div className="w-full pt-4 h-full max-sm:pb-20 max-sm:pt-10 md:px-10 lg:px-8 min-md:w-[1000px]">
        <p className="text-center">Paciente não encontrado!</p>
      </div>
    );
  }

  return (
    <div className="w-full pt-4 h-full max-sm:pb-20 max-sm:pt-10 md:px-10 lg:px-8 min-md:w-[1000px]">
      {isLoading ? (
        <div className="w-full flex mt-10 flex-row justify-center overflow-hidden">
          <Loader />
        </div>
      ) : (
        <>
          <div className="bg-zinc-800 p-4 rounded-lg mx-4 h-auto">
            <div className="flex flex-row justify-between max-md:flex-col">
              <h1 className="text-white text-xl font-semibold max-md:text-center">
                Detalhes do paciente
              </h1>

              <div className="flex flex-row items-center max-md:mt-4 flex-wrap max-md:justify-center">
                <div className="flex flex-col mr-4 max-sm:mx-0">
                  <Button
                    className="h-10 w-40 mb-4 mr-4"
                    textStyle="text-xs"
                    onClick={() => setOpenModalClinic(true)}
                    text="Alterar clínica"
                  />
                  <Button
                    className="!bg-green-50 mr-4 mb-4 h-10 w-40"
                    textStyle="text-xs"
                    onClick={() => setOpenModalDiagnostic(true)}
                    text="Alterar diagnóstico"
                  />
                </div>
                <div className="flex flex-col mr-4 max-sm:mx-1 ">
                  <Button
                    className="!bg-blue-50 mr-4 h-10 w-40 mb-4"
                    textStyle="text-xs"
                    onClick={() => setOpenModalTherapist(true)}
                    text="Alterar Terapeuta"
                  />
                  <Button
                    className="!bg-pink-50 mr-4 h-10 w-40 mb-4"
                    textStyle="text-xs"
                    onClick={() => router.push(`/patients/edit/${params.id}`)}
                    text="Editar paciente"
                  />
                </div>
              </div>
            </div>
            <p className="text-white text-[20px] mt-4">{patientData?.name}</p>
            <div className="mt-4 flex flex-row flex-wrap">
              <div className="flex flex-col">
                <div className="flex-col mt-4 mr-10">
                  <p className="text-blue-50 ">CPF</p>
                  <p className="text-white mt-2 text-sm">{patientData?.cpf}</p>
                </div>
                <div className="flex-col mt-4 mr-10">
                  <p className="text-blue-50 ">Data de nascimento</p>
                  <p className="text-white mt-2 text-sm">
                    {format(new Date(patientData?.birthdate!), "dd/MM/yyyy")} -{" "}
                    {differenceInYears(
                      new Date(),
                      new Date(patientData?.birthdate!)
                    )}{" "}
                    anos
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex-col mt-4 mr-10">
                  <p className="text-blue-50 ">Número de carteirinha</p>
                  <p className="text-white mt-2 text-sm">
                    {patientData?.documentNumber || "-"}
                  </p>
                </div>
                <div className="flex-col mt-4 mr-10">
                  <p className="text-blue-50 ">Diagnóstico</p>
                  <p className="text-white mt-2 text-sm">
                    {patientData?.diagnostic || "-"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col">
                <div className="flex-col mt-4 mr-10">
                  <p className="text-blue-50 ">Terapeuta</p>
                  <p className="text-white mt-2 text-sm">
                    {patientData?.therapistName || "-"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex-col mt-4">
              <p className="text-blue-50 mb-2">Clínica</p>
              <Image
                alt="image-clinic"
                src={patientData?.clinicName!}
                className="max-md:w-[200px] max-sm:h-[120px]"
                width={140}
                height={80}
              />
            </div>
          </div>

          <div className="mt-6 flex flex-row justify-between items-center mx-4">
            <h2 className="text-white text-xl font-semibold max-md:text-center">
              Evoluções
            </h2>

            <Button
              className="h-10 !w-[240px] mb-4"
              textStyle="text-xs"
              onClick={() => setOpenModalEvolution(true)}
              text="Cadastrar evolução"
            />
          </div>

          <div className="bg-zinc-800 p-4 rounded-lg mx-4 h-auto mb-6">
            {evolutions.map((evolution, index) => (
              <div
                className="border-b-2 border-secondary px-2 py-4 mb-4"
                key={index}
              >
                <div className="flex flex-row justify-between">
                  <p className="text-white text-sm">Heloisa Briones</p>

                  <p className="text-white text-sm">
                    {format(evolution.date, "dd/MM/yyyy")} às {evolution.time}
                  </p>
                </div>

                <div className="flex flex-row justify-between mt-4">
                  <p className="text-xs text-white mr-4">
                    {evolution.evolution}
                  </p>

                  <div className="flex flex-col">
                    <Button
                      className="!bg-red-500 h-8 w-40 mb-4 mr-4 max-md:!w-30"
                      textStyle="text-xs"
                      onClick={() => setOpenModalClinic(true)}
                      text="Excluir"
                    />
                    <Button
                      className="!bg-green-50 mr-4 mb-4 h-8 w-40"
                      textStyle="text-xs"
                      onClick={() => setOpenModalDiagnostic(true)}
                      text="Baixar arquivo"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {openModalDiagnostic && (
        <ModalDiagnostic
          setOpenModal={setOpenModalDiagnostic}
          onChangeValue={handleUpdateDiagnostic}
          currentValue={patientData?.diagnostic}
        />
      )}

      {openModalClinic && (
        <ModalClinic
          setOpenModal={setOpenModalClinic}
          onChangeValue={handleUpdateClinic}
          currentValue={patientData?.clinic}
        />
      )}

      {openModalTherapist && (
        <ModalTherapist
          setOpenModal={setOpenModalTherapist}
          onChangeValue={handleUpdateTherapist}
          currentValue={patientData?.therapistId}
          modalData={userOptions}
        />
      )}

      {openModalEvolution && (
        <ModalEvolution
          uid={params.id}
          setOpenModal={setOpenModalEvolution}
          name={patientData?.name!}
          clinic={patientData?.clinic!}
          userId={userData?.uid}
        />
      )}
    </div>
  );
}
