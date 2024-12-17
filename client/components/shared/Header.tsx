"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { navbarOptions } from "@/constants";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import Swal from "sweetalert2";
import AuhtBox from "./AuthBox";
import { useEffect } from "react";

const Header = () => {
  const router = useRouter();
  const path = usePathname();
  const { user, logoutContext, authData, loading } = useAuthContext();
  useEffect(()=>{
    if(loading) return;
    if(!authData) return;
    if(authData.rol === 0 && !path.includes('admin')){
      router.push('/admin');
    }
  },[loading, authData, path, router])

  const handleLogout = () => {
    Swal.fire({
      title: "Cerrar sesión",
      icon: "question",
      text: "Esta seguro de cerrar sesión?",
      confirmButtonText: "Aceptar",
      showCancelButton:true,
      customClass: {
        confirmButton: "bg-[#008000]",
        title: "text-[#008000]",
      },
    }).then(response=>{
      if(response.isConfirmed){
        logoutContext();
      }
    })
  };

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
        <p className="text-white font-semibold  md:block hidden pl-3 ">FUN STARTS HERE</p>
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
      <AuhtBox 
      handleLogout={handleLogout} 
      handleNavigation={handleNavigation}
      user={user}
      />
    </div>
  );
};

export default Header;
