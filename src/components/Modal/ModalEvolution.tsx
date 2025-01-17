"use client";

import { format } from "date-fns";
import { Button } from "../Button";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import Modal from "./Modal";
import { useForm } from "react-hook-form";
import { evolutionPatientSchema } from "@/schemas/patient";
import { toast } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidv4 } from "uuid";

interface ModalEvolution extends ModalWithFormProps<string> {
  uid: string;
  name: string;
  clinic: string;
  userId?: string;
}

const ModalEvolution = ({
  setOpenModal,
  uid,
  name,
  userId,
  clinic,
}: ModalEvolution) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<EvolutionFormProps>({
    defaultValues: {
      evolution: "",
      date: format(new Date(), "yyyy-MM-dd"),
      time: format(new Date(), "HH:mm"),
      therapistId: userId,
      clinic: clinic,
    },
    resolver: zodResolver(evolutionPatientSchema),
  });

  console.log(errors);

  const handleSubmitEvolution = async (data: EvolutionFormProps) => {
    try {
      const formData = new FormData();

      formData.append("therapistId", data.therapistId);
      formData.append("clinic", data.clinic);
      formData.append("evolution", data.evolution);
      formData.append("date", data.date);
      formData.append("time", data.time);

      if (data.file && data.file.length > 0) {
        //@ts-ignore
        formData.append("file", data.file[0]);
      }

      await fetch(`/api/evolution/${uid}`, {
        method: "POST",
        body: formData,
      });

      toast.success("Evolução cadastrado com sucesso!");
      setOpenModal(false);
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar evolução!");
    }
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
            htmlFor="file"
          >
            Anexar arquivo
          </label>
          <input
            className="block bg-zinc-700 w-full text-sm text-gray-300 border 
            border-gray-600 rounded-lg cursor-pointer focus:outline-none p-1"
            id="file"
            type="file"
            {...register("file")}
          />

          <Button
            text="Enviar"
            type="submit"
            className="mt-4"
            loading={isSubmitting}
          />
        </form>
      </div>
    </Modal>
  );
};

export default ModalEvolution;
