"use client";

import { usePathname, useRouter } from "next/navigation";
import { PropsWithChildren, useState } from "react";

import { ArrowBackIcon, MenuIcon } from "../icons";
import { Menu } from "../Menu";
import { useAuth } from "@/contexts/AuthContext";

const notShowHeader = ["/login", "/sign-up"];
const Header = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { userData } = useAuth();

  const handleBackPage = () => {
    router.back();
  };

  const handleClickMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/logout");

      setIsMenuOpen(false);
      router.replace("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="h-full relative w-full">
      {!notShowHeader.includes(pathname) && (
        <>
          <div
            className={`h-12 w-full bg-blue-50 shadow-xl flex justify-center items-center ${
              isMenuOpen && `opacity-30`
            }`}
          >
            {/* {pathname !== "/" && (
              <button className="absolute left-0" onClick={handleBackPage}>
                <ArrowBackIcon />
              </button>
            )} */}

            <p className="text-white font-medium text-lg md:ml-[270px]">
              CIITA - Evolução do Paciente
            </p>

            <button
              className="flex items-center absolute left-0 ml-2"
              onClick={handleClickMenu}
            >
              <MenuIcon />
            </button>
          </div>
          <Menu
            handleClickMenu={handleClickMenu}
            isOpen={isMenuOpen}
            handleLogout={handleLogout}
          />
        </>
      )}
      <div
        className={`${isMenuOpen && `opacity-30`} ${
          !!userData && `md:pl-[16rem] flex flex-col items-center`
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default Header;
