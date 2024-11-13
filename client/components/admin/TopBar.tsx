import { Button } from "@/components/ui/button";
import { ArrowLeftToLine, Menu } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const TopBar = () => {
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/home"); // Redirige al inicio
  };
  

  return (
    <div className="flex items-center justify-between p-2 px-4  bg-black ">
      <h3 className="text-white font-semibold">Admin</h3>
      <ArrowLeftToLine color="#ffffff"  onClick={handleBackHome}/>
      
    </div>
  );
};

export default TopBar;
