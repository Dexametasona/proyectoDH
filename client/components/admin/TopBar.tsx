"use client"
import { useAuthContext } from "@/context/AuthContext";
import { ArrowLeftToLine } from "lucide-react";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

const TopBar = () => {
  const router = useRouter();
  const {logoutContext, user} = useAuthContext();

  const handleBackHome = () => {
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
        router.push("/home"); // Redirige al inicio
      }
    })
  };

  return (
    <div className="flex items-center justify-between p-2 px-4  bg-black ">
      <h3 className="text-white font-semibold">Admin</h3>
      <p className="normal-case text-white tracking-widest font-semibold">Bienvenido {user?.name} {user?.lastname}</p>
      <ArrowLeftToLine
      className="hover:opacity-70 cursor-pointer"
       color="#ffffff"  onClick={handleBackHome}/>
    </div>
  );
};

export default TopBar;
