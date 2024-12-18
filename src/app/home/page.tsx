import { PatientCard } from "@/components";

const myPatients: PatientProps[] = [
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

export default function Home() {
  return (
    <div className="w-full h-full p-6 lg:max-w-[800px]">
      {myPatients.map((item, index) => (
        <PatientCard key={index} data={item} />
      ))}
    </div>
  );
}
