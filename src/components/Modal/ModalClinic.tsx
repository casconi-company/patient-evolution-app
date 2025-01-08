"use client";

import { clinicListOptions } from "@/constants/clinic";
import { Button } from "../Button";
import { Select } from "../Select";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

const ModalClinic = ({ setOpenModal }: ModalWithFormProps) => {
  const { register } = useForm<{ clinic: string }>();
  return (
    <Modal onCloseModal={() => setOpenModal(false)} title="Alterar a clínica">
      <div className="w-full px-10 pt-4 pb-10">
        <form>
          <p className="mb-4">
            Alterar a clínica que este paciente está realizando os atendimentos
          </p>
          <Select
            options={clinicListOptions}
            name="clinic"
            register={register}
            placeholder="Clínica"
            isModal
          />

          <Button text="Confirmar clínica" type="submit" className="mt-4" />
        </form>
      </div>
    </Modal>
  );
};

export default ModalClinic;
