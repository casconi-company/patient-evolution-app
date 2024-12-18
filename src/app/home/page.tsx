import { Input, PatientCard } from "@/components";
import { Table } from "@/components/Table";

const myPatients: any[] = [
  {
    id: 1,
    name: "John Smith",
    birthdate: "2018-01-01T00:00:00",
    clinicName: "CIITA-PIP",
    updatedAt: "2024-12-01T00:00:00",
    therapistName: "Heloisa Briones",
  },
  {
    id: 2,
    name: "John Smith",
    birthdate: "2018-01-01T00:00:00",
    clinicName: "CIITA-PIP",
    updatedAt: "2024-12-01T00:00:00",
    therapistName: "Heloisa Briones",
  },
  {
    id: 3,
    name: "John Smith",
    birthdate: "2018-01-01T00:00:00",
    clinicName: "CIITA-PIP",
    updatedAt: "2024-12-01T00:00:00",
    therapistName: "Heloisa Briones",
  },
  {
    id: 4,
    name: "John Smith",
    birthdate: "2018-01-01T00:00:00",
    clinicName: "CIITA-PIP",
    updatedAt: "2024-12-01T00:00:00",
    therapistName: "Heloisa Briones",
  },
  {
    id: 5,
    name: "John Smith",
    birthdate: "2018-01-01T00:00:00",
    clinicName: "CIITA-PIP",
    updatedAt: "2024-12-01T00:00:00",
    therapistName: "Heloisa Briones",
  },
];

const tableColumns = [
  { key: "name", name: "Nome" },
  { key: "birthdate", name: "Data de nascimento" },
  { key: "clinicName", name: "Clínica" },
  { key: "therapistName", name: "Terapeuta" },
  { key: "updatedAt", name: "atualizado em" },
];

export default function Home() {
  return (
    <div className="w-full h-full p-6 lg:max-w-[1000px]">
      <p className="text-white text-2xl text-center mb-4">Meus pacientes</p>
      <Input name="filter" placeholder="Nome do paciente" />

      {myPatients.map((item, index) => (
        <PatientCard key={index} data={item} />
      ))}
    </div>
  );
}
