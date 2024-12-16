"use client";
import { useAuthContext } from "@/context/AuthContext";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { FormEvent, useEffect, useState } from "react";
import { PenIcon } from "lucide-react";
import { validateUserLastname, validateUserName } from "@/lib/utils";
import { updateUser } from "@/services/userService";
import { IUserRes } from "@/types/IUser";
import Swal from "sweetalert2";
import ChangeEmailModal from "../modal/ChangeEmailModal";
import ChangePassModal from "../modal/ChangePassModal";
import isAuth from "@/guards/authGuard";

const ProfilePage = () => {
  const { user, loading, authData } = useAuthContext();

  const [name, setName] = useState("");
  const [currentUser, setCurrentUser] = useState<IUserRes | null>(null);
  const [lastname, setLastname] = useState("");
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [isLastnameEdit, setIsLastnameEdit] = useState(false);
  const [error, setError] = useState("");
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);

  useEffect(() => {
    if (loading) return;
    setCurrentUser(user);
    setName(user!.name);
    setLastname(user!.lastname);
  }, [loading, user]);

  if (currentUser === null) return null;

  const handleUpdateProfile = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateUserName(name)) {
      setError(
        "El nombre debe tener entre 2 a 50 caracteres, solo alfabéticos y espacios"
      );
      cleanErrorMessage();
      return;
    }
    if (!validateUserLastname(lastname)) {
      alert(lastname);
      setError(
        "El apellido debe tener entre 2 a 100 caracteres, solo alfabéticos y espacios"
      );
      cleanErrorMessage();
      return;
    }
    console.log("Nuevo profile: ", { name, lastname });
    try {
      const response = await updateUser(authData!, { name, lastname });
      setCurrentUser(response);
      setIsNameEdit(false);
      setIsLastnameEdit(false);
      Swal.fire({ title: "Actualizacion exitosa", icon: "success" });
    } catch (error) {
      console.error("error al actualizar el usuario, ", error);
      setError("Error al actualizar al usuario.");
      cleanErrorMessage();
    }
  };

  const cleanErrorMessage = () => {
    setTimeout(() => {
      setError("");
    }, 3000);
  };

  return (
    <div className="py-4 px-2 max-w-sm lg:max-w-5xl mx-auto ">
      <h3 className="font-bold text-4xl mb-4 text-center text-primary ">
        Perfil
      </h3>
      <section className="profile-container lg:flex items-center ">
        <div className="profile-letter w-1/2 mx-auto mb-4 lg:px-10">
          <div className="letter rounded-full aspect-square grid place-items-center bg-primary-soft">
            <span className="text-9xl text-white font-bold hidden lg:block">
              {currentUser.name.charAt(0) + "" + currentUser.lastname.charAt(0)}
            </span>
            <span className="text-7xl text-white font-bold lg:hidden">
              {currentUser.name.charAt(0)}
            </span>
          </div>
        </div>
        <div className="info-box grow">
          <div className="info grid grid-cols-12 lg:text-xl">
            <p className="col-span-3">Id</p>
            <span className="col-span-9 ">: {currentUser.id}</span>
            <p className="col-span-3">Creación</p>
            <span className="col-span-9 ">
              : {currentUser.createdAt.toString()}
            </span>
            <p className="col-span-3">Correo</p>
            <span className="col-span-9 font-bold">: {currentUser.email}</span>
            <form
              onSubmit={handleUpdateProfile}
              className="col-span-12 flex flex-col gap-y-2 py-4"
            >
              <div className="field flex border-2 border-primary rounded-lg">
                <Input
                  className={`${isNameEdit ? "" : "opacity-50"}`}
                  placeholder="Nombre"
                  value={name}
                  readOnly={!isNameEdit}
                  onChange={(e) => setName(e.target.value)}
                />
                <Button
                  className="transition-default hover:opacity-80 cursor-pointer"
                  onClick={() => setIsNameEdit(!isNameEdit)}
                  type="button"
                >
                  <PenIcon />
                </Button>
              </div>
              <div className="field flex border-2 border-primary rounded-lg">
                <Input
                  className={`${isLastnameEdit ? "" : "opacity-50"}`}
                  placeholder="Apellido"
                  value={lastname}
                  readOnly={!isLastnameEdit}
                  onChange={(e) => setLastname(e.target.value)}
                />
                <Button
                  className="transition-default hover:opacity-80 cursor-pointer"
                  onClick={() => setIsLastnameEdit(!isLastnameEdit)}
                  type="button"
                >
                  <PenIcon />
                </Button>
              </div>
              <Button
                className="self-end transition-default hover:opacity-80"
                variant={"secondary"}
                type="submit"
              >
                Guardar
              </Button>
            </form>
            
            <div className="col-span-12 flex flex-col items-start gap-2">
              <p className="text-sm text-error">{error}</p>
              <Button
                className="transition-default hover:opacity-80"
                type="button"
                onClick={() => setShowChangePassModal(true)}
              >
                Cambiar contraseña
              </Button>
              <Button
                className="transition-default hover:opacity-80"
                type="button"
                onClick={() => setShowChangeEmailModal(true)}
              >
                Cambiar correo
              </Button>
            </div>
          </div>
        </div>
      </section>
      {showChangeEmailModal ? (
        <ChangeEmailModal showModal={setShowChangeEmailModal} />
      ) : null}
      {showChangePassModal ? (
        <ChangePassModal showModal={setShowChangePassModal} />
      ) : null}
    </div>
  );
};

export default isAuth(ProfilePage);
