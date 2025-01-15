"use client";

import { clinicListOptions } from "@/constants/clinic";
import { Button } from "../Button";
import { Select } from "../Select";
import Modal from "./Modal";
import { useForm } from "react-hook-form";

type ClinicFormProps = {
  clinic: string;
};

const ModalClinic = ({
  setOpenModal,
  onChangeValue,
  currentValue,
}: ModalWithFormProps<string>) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<ClinicFormProps>();

  const handleSubmitClinic = async (value: ClinicFormProps) => {
    try {
      await onChangeValue?.(value.clinic);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal onCloseModal={() => setOpenModal(false)} title="Alterar a clínica">
      <div className="w-full px-10 pt-4 pb-10">
        <form onSubmit={handleSubmit(handleSubmitClinic)}>
          <p className="mb-4">
            Alterar a clínica que este paciente está realizando os atendimentos
          </p>
          <Select
            options={clinicListOptions}
            name="clinic"
            register={register}
            placeholder="Clínica"
            value={currentValue}
            isModal
          />

          <Button
            text="Confirmar clínica"
            type="submit"
            className="mt-4"
            loading={isSubmitting}
          />
        </form>
      </div>
    </Modal>
  );
};

export default ModalClinic;
