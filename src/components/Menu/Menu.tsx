"use client";

import Image from "next/image";
import { CloseIcon } from "../icons";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "../Button";
import { usePathname } from "next/navigation";
import MenuItem from "./MenuItem";

interface MenuProps {
  handleClickMenu: () => void;
  isOpen: boolean;
  handleLogout: () => void;
}

const Menu = ({ handleClickMenu, isOpen, handleLogout }: MenuProps) => {
  const { userData } = useAuth();
  const pathname = usePathname();

  return (
    <div
      id="menu"
      className={`flex flex-col fixed top-0 left-0 w-[270px] md:max-w-[40%] h-full 
      bg-secondary transform transition-transform duration-300 ease-in-out z-20 ${
        isOpen ? "max-sm:translate-x-0" : "-translate-x-full md:translate-x-0"
      }
      `}
    >
      <div className="flex justify-between items-center px-2 md:hidden pt-2">
        <button onClick={handleClickMenu}>
          <CloseIcon />
        </button>
      </div>

      <div className="px-4 pt-4">
        <p className="text-green-50 font-medium text-md">
          Bem-vindo, {userData?.name}
        </p>
      </div>

      <div className="mt-2 px-4 opacity-100">
        <ul>
          <MenuItem
            text="Meus pacientes"
            href="/my-patients"
            isActive={pathname === "/my-patients"}
          />
          <MenuItem
            text="Pacientes"
            href="/patients"
            isActive={
              pathname.includes("/patients") && !pathname.includes("admin")
            }
          />
        </ul>
        {userData?.isAdmin && (
          <>
            <p className="text-green-50 font-medium text-md mt-4">
              Administrador
            </p>

            <div className="flex flex-col">
              <ul>
                <MenuItem
                  text="Usuários"
                  href="/admin/users"
                  isActive={pathname.includes("/admin/users")}
                />
              </ul>
            </div>
          </>
        )}
        <div className="w-full opacity-100 mt-8 absolute bottom-3">
          <Button
            text="Sair"
            className="!bg-red-500 h-8 md:max-w-[160px] !w-[130px]"
            textStyle="text-sm"
            onClick={handleLogout}
          />
        </div>
      </div>
    </div>
  );
};

export default Menu;
