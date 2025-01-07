"use client";
import Image from "next/image";
import Card from "./Card";
import { format } from "date-fns";

interface PatientCardProps {
  data: PatientProps;
  isShowTherapist?: boolean;
}

const PatientCard = ({ data, isShowTherapist = false }: PatientCardProps) => {
  return (
    <Card>
      <div className="flex flex-row justify-between">
        <div className="h-full mt-2">
          <p className="text-white font-medium text-base">{data.name}</p>

          <div className="flex flex-row mt-2">
            <p className="text-secondary text-sm mr-2">Nascimento</p>
            <p className="text-white text-sm">
              {format(data.birthdate, "dd/MM/yyyy")}
            </p>
          </div>

          {isShowTherapist && (
            <div className="flex flex-row mt-2">
              <p className="text-green-50 text-sm mr-2">Responsável</p>
              <p className="text-white text-sm">{data.therapistName}</p>
            </div>
          )}

          <div className="flex flex-row mt-2">
            <p className="text-blue-50 text-sm mr-2">Última atualização</p>
            <p className="text-white text-sm">
              {format(data.updatedAt, "dd/MM/yyyy")} às{" "}
              {format(data.updatedAt, "HH:mm")}
            </p>
          </div>
        </div>

        <Image
          alt={data.clinicName!}
          src="/CIITA_PIP.png"
          className="max-md:w-[120px] max-sm:h-[80px]"
          width={140}
          height={80}
        />
      </div>
    </Card>
  );
};

export default PatientCard;
