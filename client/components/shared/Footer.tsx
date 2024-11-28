"use client"
import { socialMedia } from "@/constants";
import { useAuthContext } from "@/context/AuthContext";
import Image from "next/image";
import React from "react";

const Footer = () => {

  const { authData } = useAuthContext();
  if(authData !== null && authData.rol === 0 ) return (<></>)
  return (
    <div className="h-24 w-full bg-primary flex justify-between items-center pt-6 px-6 pb-12 sm:pb-6 text-white">
      <div className="flex gap-3">
        {socialMedia.map(({ icon: Icon, name }) => (
          <Icon key={name} className="text-white w-6 h-6" />
        ))}
      </div>
      <p>© 2024 - Game Yard</p>
      <Image
        width={54}
        height={30}
        src={"/assets/icons/logo-mobile.svg"}
        alt={"logo"}
        className="sm:hidden"
      />
      <Image
        width={96}
        height={48}
        src={"/assets/icons/logo-mobile.svg"}
        alt={"logo"}
        className="hidden sm:block"
      />
    </div>
  );
};

export default Footer;
