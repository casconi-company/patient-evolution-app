"use client";

import { format } from "date-fns";
import { Button } from "../Button";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { evolutionPatientSchema } from "@/schemas/patient";

interface ModalEvolution extends ModalWithFormProps {
  uid: string;
  name: string;
  clinic: string;
  userId?: string;
}

const ModalClinic = ({
  setOpenModal,
  uid,
  name,
  userId,
  clinic,
}: ModalEvolution) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<{
    evolution: string;
    date: string;
    time: string;
    therapistId: string;
    clinic: string;
  }>({
    defaultValues: {
      evolution: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: format(new Date(), "HH:mm"),
      therapistId: userId,
      clinic: clinic,
    },
    resolver: yupResolver(evolutionPatientSchema),
  });

  const handleSubmitEvolution = (data: EvolutionFormProps) => {
    console.log(data);
    // Add evolution to database
    setOpenModal(false);
  };

  return (
    <Modal onCloseModal={() => setOpenModal(false)} title="Adicionar evolução">
      <div className="w-full px-10 pt-4 pb-10">
        <form onSubmit={handleSubmit(handleSubmitEvolution)}>
          <p className="mb-4">Descrever a evolução do paciente {name} </p>

          <div className="flex flex-row max-md:flex-col">
            <Input
              placeholder="dd/mm/aaaa"
              label="Data"
              type="date"
              name="date"
              containerProps="md:mr-4 mb-4"
              register={register}
              error={!!errors?.date?.message}
              message={errors.date?.message}
            />

            <Input
              placeholder="dd/mm/aaaa"
              label="Hora"
              type="time"
              name="time"
              containerProps="mb-8"
              register={register}
              error={!!errors?.date?.message}
              message={errors.date?.message}
            />
          </div>

          <Textarea
            placeholder="Descreva aqui a evolução do paciente"
            name="evolution"
            register={register}
          />

          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white mt-4"
            htmlFor="file_input"
          >
            Anexar arquivo
          </label>
          <input
            className="block bg-zinc-700 w-full text-sm text-gray-300 border 
            border-gray-600 rounded-lg cursor-pointer focus:outline-none p-1"
            id="file_input"
            type="file"
          />

          <Button text="Enviar" type="submit" className="mt-4" />
        </form>
      </div>
    </Modal>
  );
};

export default ModalClinic;
