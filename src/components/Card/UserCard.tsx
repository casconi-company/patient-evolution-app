"use client";
import Card from "./Card";

interface UserCardProps {
  data: UserProps;
  isShowTherapist?: boolean;
}

const UserCard = ({ data }: UserCardProps) => {
  return (
    <Card>
      <div className="flex flex-row justify-between">
        <div className="h-full mt-2">
          <p className="text-white font-medium text-base">{data.name}</p>

          <div className="flex flex-row mt-2">
            <p className="text-secondary text-sm mr-2">email</p>
            <p className="text-white text-sm">{data.email}</p>
          </div>

          <div className="flex flex-row mt-2">
            <p className="text-secondary text-sm mr-2">Administrador</p>
            <p className="text-white text-sm">{data.isAdmin ? "Sim" : "Não"}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default UserCard;
