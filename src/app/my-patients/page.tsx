"use client";
import { Button, Input, Loader, PatientCard, Table } from "@/components";
import { COLUMNS_PATIENTS } from "@/constants/patients";
import { useRouter } from "next/navigation";
import { useState } from "react";

type FilterProps = { name?: string; cpf?: string };

export default function MyPatients() {
  const router = useRouter();
  const [patientsData, setPatientsData] = useState<PatientProps[]>([]);
  const [lastVisible, setLastVisible] = useState<any>(null);
  const [totalPatients, setTotalPatients] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterProps | null>(null);

  const handleGetPatients = async (
    filterValues?: FilterProps | null,
    isPagination?: boolean
  ) => {};

  const handleChangeFilter = async () => {
    setPatientsData([]);
    setLastVisible(null);
    setIsLoading(true);
    setTotalPatients(0);

    await handleGetPatients(filters, false);
  };

  const handleKeyPressDown = (event: KeyboardEvent) => {
    if (event.code === "Enter") {
      handleChangeFilter();
    }
  };

  const handlePageChange = () => {
    handleGetPatients(filters, true);
    setIsLoadingMore(true);
  };

  return (
    <div className="w-full px-4 pt-4 flex flex-col justify-center items-center h-full max-sm:pb-20 max-sm:pt-4 max-sm:overflow-auto lg:px-8 min-md:w-[1000px]">
      <div className="w-full flex flex-row justify-between items-center max-md:flex-col">
        <h2 className="text-white text-2xl text-center max-md:mb-4">
          Meus Pacientes
        </h2>
      </div>

      <div className="mt-4 w-full flex flex-row max-md:flex-col">
        <Input
          placeholder="Nome do paciente"
          containerProps="mr-4 !w-[70%] max-md:!w-full"
          label="Nome"
          value={filters?.name}
          onChange={(event) =>
            setFilters((filter) => ({ ...filter, name: event.target.value }))
          }
          onKeyDown={handleKeyPressDown}
        />

        <Input
          placeholder="CPF"
          containerProps="!w-[25%] max-md:mt-4 max-md:!w-[50%] mr-4"
          label="CPF"
          mask="999.999.999-99"
          value={filters?.cpf}
          onChange={(event) =>
            setFilters((filter) => ({ ...filter, cpf: event.target.value }))
          }
          onKeyDown={handleKeyPressDown}
        />

        <Button
          text="Pesquisar"
          className="!w-[130px] !bg-blue-50 mt-6"
          onClick={handleChangeFilter}
        />
      </div>

      <div className="mt-6 w-full max-md:hidden">
        <Table
          columns={COLUMNS_PATIENTS}
          data={patientsData!}
          onChangePage={handlePageChange}
          total={totalPatients}
          isLoading={isLoading}
        />
      </div>

      {!patientsData?.length && !isLoading && (
        <p className="mt-10">Não possui pacientes!</p>
      )}

      {isLoading ? (
        <div className="w-full mt-10 flex flex-row justify-center overflow-hidden">
          <Loader />
        </div>
      ) : (
        !!patientsData?.length && (
          <div className="mt-6 w-full md:hidden">
            {patientsData.map((patient) => (
              <PatientCard data={patient} />
            ))}
          </div>
        )
      )}

      {patientsData?.length! < totalPatients! && (
        <div className="w-full flex justify-center mt-4">
          <Button
            text="Carregar mais"
            className="!bg-yellow-50 !h-10 md:w-[200px]"
            textStyle="text-sm "
            onClick={handlePageChange}
            loading={isLoadingMore}
          />
        </div>
      )}
    </div>
  );
}
