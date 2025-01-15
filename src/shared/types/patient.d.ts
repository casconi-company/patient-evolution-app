declare type PatientProps = {
  uid?: string;
  name: string;
  birthdate: string;
  createdAt: string;
  clinic: string;
  cpf: string;
  therapistId: string;
  documentNumber?: string;
  clinicName?: string;
  therapistName?: string;
  diagnostic?: string;
  updatedAt?: string;
};

declare type PatientFormProps = {
  name: string;
  cpf: string;
  birthdate: string;
  clinic: string;
  documentNumber: string;
  createdAt?: string;
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
