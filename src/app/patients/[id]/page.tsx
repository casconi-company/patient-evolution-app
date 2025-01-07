"use client";
import { useState } from "react";

import {
  Button,
  ModalClinic,
  ModalDiagnostic,
  ModalTherapist,
} from "@/components";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

export default function DetailsPatient() {
  const router = useRouter();
  const params = useParams<{ uid: string }>();
  const [openModalClinic, setOpenModalClinic] = useState<boolean>(false);
  const [openModalDiagnostic, setOpenModalDiagnostic] =
    useState<boolean>(false);
  const [openModalTherapist, setOpenModalTherapist] = useState<boolean>(false);

  return (
    <div className="w-full px-4 pt-4 flex justify-center items-center h-full max-sm:pb-20 max-sm:pt-10 max-sm:overflow-auto md:px-10 lg:px-8 min-md:w-[1000px]">
      <div className="bg-zinc-800 p-4 rounded-lg w-full h-auto">
        <div className="flex flex-row justify-between max-md:flex-col">
          <h1 className="text-white text-xl font-semibold max-md:text-center">
            Detalhes do paciente
          </h1>

          <div className="flex flex-row items-center max-md:mt-4 flex-wrap max-md:justify-center">
            <div className="flex flex-col">
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
            <div className="flex flex-col">
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

      {openModalDiagnostic && (
        <ModalDiagnostic setOpenModal={setOpenModalDiagnostic} />
      )}

      {openModalClinic && <ModalClinic setOpenModal={setOpenModalClinic} />}

      {openModalTherapist && (
        <ModalTherapist setOpenModal={setOpenModalTherapist} />
      )}
    </div>
  );
}
