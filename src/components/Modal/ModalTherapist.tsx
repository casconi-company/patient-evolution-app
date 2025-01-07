"use client";
import { useForm } from "react-hook-form";

import { Button } from "../Button";
import { Select } from "../Select";
import Modal from "./Modal";

const ModalTherapist = ({ setOpenModal }: ModalWithFormProps) => {
  const { register } = useForm<{ therapist: string }>();

  return (
    <Modal onCloseModal={() => setOpenModal(false)} title="Alterar terapeuta">
      <div className="w-full px-10 pt-4 pb-10">
        <form>
          <p className="mb-4">
            Alterar terapeuta responsável que este paciente possui no momento
          </p>
          <Select
            options={[]}
            name="therapist"
            register={register}
            placeholder="Terapeuta"
            isModal
          />

          <Button text="Confirmar terapeuta" type="submit" className="mt-4" />
        </form>
      </div>
    </Modal>
  );
};

export default ModalTherapist;
