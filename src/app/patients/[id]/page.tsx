"use client";
import { useState } from "react";

import {
  Button,
  ModalClinic,
  ModalDiagnostic,
  ModalEvolution,
  ModalTherapist,
} from "@/components";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { useAuth } from "@/contexts/AuthContext";

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
  const params = useParams<{ uid: string }>();
  const [openModalClinic, setOpenModalClinic] = useState<boolean>(false);
  const [openModalDiagnostic, setOpenModalDiagnostic] =
    useState<boolean>(false);
  const [openModalTherapist, setOpenModalTherapist] = useState<boolean>(false);
  const [openModalEvolution, setOpenModalEvolution] = useState<boolean>(true);
  const { userData } = useAuth();

  return (
    <div className="w-full pt-4 h-full max-sm:pb-20 max-sm:pt-10 md:px-10 lg:px-8 min-md:w-[1000px]">
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
                onClick={() => router.push(`/patients/edit/${params.uid}`)}
                text="Editar paciente"
              />
            </div>
          </div>
        </div>
        <p className="text-white text-[20px] mt-4">John Doe</p>
        <div className="mt-4 flex flex-row flex-wrap">
          <div className="flex flex-col">
            <div className="flex-col mt-4 mr-10">
              <p className="text-blue-50 ">CPF</p>
              <p className="text-white mt-2 text-sm">893.323.323-33</p>
            </div>
            <div className="flex-col mt-4 mr-10">
              <p className="text-blue-50 ">Data de nascimento</p>
              <p className="text-white mt-2 text-sm">10/05/1990 - 23 anos</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex-col mt-4 mr-10">
              <p className="text-blue-50 ">Número de carteirinha</p>
              <p className="text-white mt-2 text-sm">133424324</p>
            </div>
            <div className="flex-col mt-4 mr-10">
              <p className="text-blue-50 ">Diagnóstico</p>
              <p className="text-white mt-2 text-sm">Em avaliação</p>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex-col mt-4 mr-10">
              <p className="text-blue-50 ">Terapeuta</p>
              <p className="text-white mt-2 text-sm">Heloisa Brione</p>
            </div>
          </div>
        </div>
        <div className="flex-col mt-4">
          <p className="text-blue-50 ">Clínica</p>
          <Image
            alt="image-clinic"
            src="/CIITA_PIP.png"
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
              <p className="text-white text-sm">Heloísa Briones</p>

              <p className="text-white text-sm">
                {format(evolution.date, "dd/MM/yyyy")} às {evolution.time}
              </p>
            </div>

            <div className="flex flex-row justify-between mt-4">
              <p className="text-xs text-white mr-4">{evolution.evolution}</p>

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

      {openModalDiagnostic && (
        <ModalDiagnostic setOpenModal={setOpenModalDiagnostic} />
      )}

      {openModalClinic && <ModalClinic setOpenModal={setOpenModalClinic} />}

      {openModalTherapist && (
        <ModalTherapist setOpenModal={setOpenModalTherapist} />
      )}

      {openModalEvolution && (
        <ModalEvolution
          uid="1"
          setOpenModal={setOpenModalEvolution}
          name="John Doe"
          clinic="ciita_pip"
          userId={userData?.uid}
        />
      )}
    </div>
  );
}
