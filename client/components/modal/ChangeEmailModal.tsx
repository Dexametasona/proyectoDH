"use client";
import { Eye, EyeClosed, X } from "lucide-react";
import ModalOverlay from "../shared/ModalOverlay";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { validateEmail } from "@/lib/utils";
import { FormEvent, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { isAxiosError } from "axios";
import { IApiRes } from "@/types/IApiRes";
import { changeEmail } from "@/services/userService";

const ChangeEmailModal = ({ showModal}: { showModal: (state:boolean) => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPass, setShowPass] = useState(false);

  const { logoutContext, authData } = useAuthContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !validateEmail(email)) {
      setFormError("Ingrese un correo válido");
      clearMessage();
      return;
    }

    if (!password) {
      setFormError("La contraseña es requerida");
      clearMessage();
      return;
    }

    try {
      await changeEmail(authData!, { email, password });
      logoutContext();
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const response = error.response.data as IApiRes<unknown>;
        setFormError(response.message);
      } else {
        setFormError("Error inesperado, vuelve a intentarlo mas tarde.");
      }
      console.error("Error al actualizar", error);
      clearMessage();
    }
  };
  const clearMessage = () => {
    setTimeout(() => {
      setFormError("");
    }, 4000);
  };
  return (
    <ModalOverlay>
      <form
        className="bg-white shadow-lg rounded-md px-4 py-2 w-full relative max-w-md sm:px-2 sm:w-full sm:max-w-sm"
        onSubmit={handleSubmit}
      >
        <h2 className="tracking-wide font-bold mb-6 text-primary">
          CAMBIAR CORREO
        </h2>
        <p className="text-sm mb-4">
          Escribe tu contraseña, y a continuacion el nuevo correo.
        </p>
        <div className="field mb-6 relative">
          <Input
            className="rounded-full"
            id="password"
            type={showPass ? "text" : "password"}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-2 bottom-1/2 translate-y-1/2"
          >
            {showPass ? <Eye /> : <EyeClosed />}
          </button>
        </div>
        <div className="field mb-4">
          <Input
            className="rounded-full"
            id="email"
            type="email"
            placeholder="Nuevo correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <p className="text-sm mb-4">
          ADVERTENCIA. Al cambiar el correo, la cuenta se deshabilitara y
          deberas volver a verificar tu correo.
        </p>
        <div className="border-l-red-500 border-2  mb-4 rounded-sm shadow-sm bg-black text-white">
          <p>{formError}</p>
        </div>
        <div className="flex items-center justify-center flex-col gap-6">
          <Button
            type="submit"
            variant={"secondary"}
            className="w-full rounded-full transition-default hover:opacity-80"
          >
            Actualizar
          </Button>
        </div>
        <button
        type="button"
          className="absolute top-2 right-2 transition-default hover:opacity-80"
          onClick={()=>showModal(false)}
        >
          <X />
        </button>
      </form>
    </ModalOverlay>
  );
};

export default ChangeEmailModal;
