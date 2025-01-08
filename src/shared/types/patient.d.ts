declare type PatientProps = {
  id: number;
  name: string;
  birthdate: string;
  updatedAt: string;
  clinicId: string;
  therapistId: string;
  documentNumber: string;
  clinicName?: string;
  therapistName?: string;
};

declare type PatientFormProps = {
  name: string;
  cpf: string;
  birthdate: string;
  clinicId: string;
  documentNumber: string;
};

declare type OptionProp = {
  id: string;
  label: string;
};
