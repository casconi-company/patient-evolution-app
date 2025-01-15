"use client";
import { useForm } from "react-hook-form";

import { Button } from "../Button";
import { Select } from "../Select";
import Modal from "./Modal";

type TherapistFormProps = {
  therapistId: string;
};

const ModalTherapist = ({
  setOpenModal,
  onChangeValue,
  currentValue,
  modalData,
}: ModalWithFormProps<string, OptionProp>) => {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<TherapistFormProps>();

  const handleSubmitTherapist = async (value: TherapistFormProps) => {
    try {
      await onChangeValue?.(value.therapistId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Modal onCloseModal={() => setOpenModal(false)} title="Alterar terapeuta">
      <div className="w-full px-10 pt-4 pb-10">
        <form onSubmit={handleSubmit(handleSubmitTherapist)}>
          <p className="mb-4">
            Alterar terapeuta responsável que este paciente possui no momento
          </p>
          <Select
            options={modalData || []}
            name="therapistId"
            register={register}
            placeholder="Terapeuta"
            value={currentValue}
            isModal
          />

          <Button
            text="Confirmar terapeuta"
            type="submit"
            className="mt-4"
            loading={isSubmitting}
          />
        </form>
      </div>
    </Modal>
  );
};

export default ModalTherapist;
