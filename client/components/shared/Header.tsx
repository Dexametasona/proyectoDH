"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Menu, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { navbarOptions } from "@/constants";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";

const Header = () => {
  const router = useRouter();
  const { user, logoutContext, authData } = useAuthContext();

  const handleNavigation = (path: string) => {
    router.push(`${path}`);
  };
  if (authData !== null && authData.rol === 0) return <></>;
  return (
    <div className="h-20 bg-primary w-full p-4 rounded-b-3xl flex justify-between items-center sm:rounded-b-none z-50 sticky top-0">
      <div className="bg-secondary rounded-full flex items-center justify-center p-2 md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu className="text-white" />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navbarOptions.map((option) => (
              <DropdownMenuItem
                key={option.name}
                onClick={() => handleNavigation(option.link)}
              >
                {option.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Link href="/home" className="md:hidden cursor-pointer">
        <Image
          width={54}
          height={30}
          src={"/assets/icons/logo-mobile.svg"}
          alt={"logo"}
        />
      </Link>
      
      <Link href="/home" className="hidden md:block cursor-pointer">
      <div className="grid grid-cols-2 items-center ">
        {/* //<div> */}
        <Image
          width={128}
          height={48}
          src={"/assets/icons/logo-desktop.svg"}
          alt={"logo"}
         /> 
         {/* </div> */}
        <p className="text-white text-lg md:block hidden ">FUN STARTS HERE</p>
        </div>
      </Link>
      

      <div className="gap-8 md:flex hidden cursor-pointer text-white">
        {navbarOptions.map((option) => (
          <p
            key={option.name}
            onClick={() => handleNavigation(option.link)}
            className="hover:text-gray-400 transition-all ease-in-out duration-300"
          >
            {option.name}
          </p>
        ))}
      </div>
      <div className="auth-box flex">
        <div className="btns-box sm:flex items-center gap-2">
          {user ? (
            <>
              <p className="text-white text-md uppercase hidden sm:flex">
                {user.name + " " + user.lastname}
              </p>
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="border-secondary border-2 rounded-full w-10 grid place-items-center aspect-square">
                    <p className="text-white text-4xl">
                      {user.name.toUpperCase().charAt(0)}
                    </p>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10}>
                  <DropdownMenuItem
                    className="hover:bg-slate-400 ease-in-out transition-all duration-200"
                    onClick={() => logoutContext()}
                  >
                    <p className="cursor-pointer">Cerrar sesión</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div>
              <div className="sm:hidden">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="bg-secondary p-2 rounded-full">
                      <User></User>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent sideOffset={10}>
                    <DropdownMenuItem
                      className="hover:bg-slate-400 ease-in-out transition-all duration-300"
                      onClick={() => handleNavigation("/signup")}
                    >
                      <p className="cursor-pointer">Crear cuenta</p>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="hover:bg-slate-400 ease-in-out transition-all duration-300"
                      onClick={() => handleNavigation("/login")}
                    >
                      <p className="cursor-pointer">Iniciar sesión</p>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="hidden sm:flex gap-4">
                <Button
                  className="rounded-full text-sm border-white border hover:opacity-80"
                  onClick={() => handleNavigation("/signup")}
                >
                  Crear cuenta
                </Button>
                <Button
                  className="rounded-full text-sm hover:opacity-80"
                  variant={"secondary"}
                  onClick={() => handleNavigation("/login")}
                >
                  Iniciar sesión
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
