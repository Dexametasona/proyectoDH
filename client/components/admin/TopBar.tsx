"use client"
import { useAuthContext } from "@/context/AuthContext";
import { ArrowLeftToLine } from "lucide-react";
import { useRouter } from "next/navigation";

const TopBar = () => {
  const router = useRouter();
  const {logoutContext, user} = useAuthContext();

  const handleBackHome = () => {
    logoutContext()
    router.push("/home"); // Redirige al inicio
  };
  

  return (
    <div className="flex items-center justify-between p-2 px-4  bg-black ">
      <h3 className="text-white font-semibold">Admin</h3>
      <p className="normal-case text-white tracking-widest font-semibold">Bienvenido {user?.name}</p>
      <ArrowLeftToLine
      className="hover:opacity-70 cursor-pointer"
       color="#ffffff"  onClick={handleBackHome}/>
    </div>
  );
};

export default TopBar;
