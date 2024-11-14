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

const Header = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(`${path}`);
  };

  return (
    <div className="h-20 bg-primary w-full p-4 rounded-b-3xl flex justify-between items-center sm:rounded-b-none z-50 sticky top-0">
      <div className="bg-secondary rounded-full flex items-center justify-center p-2 sm:hidden">
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
      <Image
        width={54}
        height={30}
        src={"/assets/icons/logo-mobile.svg"}
        alt={"logo"}
        className="sm:hidden"
      />
      <Image
        width={128}
        height={48}
        src={"/assets/icons/logo-desktop.svg"}
        alt={"logo"}
        className="hidden sm:block"
      />
      <div className="gap-8 hidden sm:flex cursor-pointer text-white">
        {navbarOptions.map((option) => (
          <p key={option.name} onClick={() => handleNavigation(option.link)}>
            {option.name}
          </p>
        ))}
      </div>
      <div className="bg-secondary rounded-full flex items-center justify-center p-2 sm:hidden text-white">
        <User />
      </div>
      <div className="gap-2 sm:flex hidden">
        <Button className="rounded-full text-sm border-white border">
          Crear cuenta
        </Button>
        <Button className="rounded-full text-sm " variant={"secondary"}>
          Iniciar sesión
        </Button>
      </div>
    </div>
  );
};

export default Header;
