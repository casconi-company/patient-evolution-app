"use client";
import { useForm } from "react-hook-form";

import { Button } from "../Button";
import { Select } from "../Select";
import Modal from "./Modal";

const ModalDiagnostic = ({ setOpenModal }: ModalWithFormProps) => {
  const { register } = useForm<{ diagnostic: string }>();

  return (
    <Modal
      onCloseModal={() => setOpenModal(false)}
      title="Alterar o diagnóstico"
    >
      <div className="w-full px-10 pt-4 pb-10">
        <form>
          <p className="mb-4">
            Alterar o diagnóstico que este paciente possui no momento
          </p>
          <Select
            options={[]}
            name="diagnostic"
            register={register}
            placeholder="Diagnóstico"
            isModal
          />

          <Button text="Confirmar diagnóstico" type="submit" className="mt-4" />
        </form>
      </div>
    </Modal>
  );
};

export default ModalDiagnostic;
