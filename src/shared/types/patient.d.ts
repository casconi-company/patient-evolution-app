declare type PatientProps = {
  id?: string;
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

declare type EvolutionFormProps = {
  date: string;
  time: string;
  evolution: string;
  therapistId: string;
  file?: File;
  therapistName?: string;
};
