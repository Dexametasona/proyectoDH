"use client";
import { Eye, EyeClosed, X } from "lucide-react";
import ModalOverlay from "../shared/ModalOverlay";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { validatePassword } from "@/lib/utils";
import { FormEvent, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { isAxiosError } from "axios";
import { IApiRes } from "@/types/IApiRes";
import { changePassword } from "@/services/userService";

const ChangePassModal = ({
  showModal,
}: {
  showModal: (state: boolean) => void;
}) => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);

  const { logoutContext, authData } = useAuthContext();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!password || password.trim().length === 0) {
      setFormError("La contraseña es requerida");
      clearMessage();
      return;
    }
    if (!validatePassword(newPassword)) {
      setFormError(
        "La nueva contraseña debe tener mínimo una mayúscula, minúscula, número y un carácter especial"
      );
      clearMessage();
      return;
    }

    try {
      await changePassword(authData!, { password, newPassword });
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
          CAMBIAR CONTRASEÑA
        </h2>
        <p className="text-sm mb-4">
          Escribe tu contraseña, y a continuacion la nueva contraseña.
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
        <div className="field mb-6 relative">
          <Input
            className="rounded-full"
            id="password"
            type={showNewPass ? "text" : "password"}
            placeholder="Nueva contraseña"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowNewPass(!showNewPass)}
            className="absolute right-2 bottom-1/2 translate-y-1/2"
          >
            {showNewPass ? <Eye /> : <EyeClosed />}
          </button>
        </div>
        <p className="text-sm mb-4">
          ADVERTENCIA. Al cambiar la contraseña seras expulsado de la sesión.
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
          onClick={() => showModal(false)}
        >
          <X />
        </button>
      </form>
    </ModalOverlay>
  );
};

export default ChangePassModal;
