"use client";
import { useForm } from "react-hook-form";

import { Button } from "../Button";
import { Select } from "../Select";
import Modal from "./Modal";
import { Input } from "../Input";
import { useEffect } from "react";

type DiagnosticFormProps = {
  diagnostic: string;
};
const ModalDiagnostic = ({
  setOpenModal,
  currentValue,
  onChangeValue,
}: ModalWithFormProps<string>) => {
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm<DiagnosticFormProps>();

  const handleSubmitDiagnostic = async (value: DiagnosticFormProps) => {
    try {
      await onChangeValue?.(value.diagnostic);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    reset({ diagnostic: currentValue });
  }, []);

  return (
    <Modal
      onCloseModal={() => setOpenModal(false)}
      title="Alterar o diagnóstico"
    >
      <div className="w-full px-10 pt-4 pb-10">
        <form onSubmit={handleSubmit(handleSubmitDiagnostic)}>
          <p className="mb-4">
            Alterar o diagnóstico que este paciente possui no momento
          </p>
          <Input
            name="diagnostic"
            register={register}
            placeholder="Diagnóstico"
          />

          <Button
            text="Confirmar diagnóstico"
            type="submit"
            className="mt-4"
            loading={isSubmitting}
          />
        </form>
      </div>
    </Modal>
  );
};

export default ModalDiagnostic;
