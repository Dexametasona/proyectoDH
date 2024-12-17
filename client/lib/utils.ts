import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import Swal from "sweetalert2";
import { IAlertActions } from "@/types/IAlertActions";
import { BaggageClaim, Lightbulb, MapPinned, Palette, Shield, UserCheck, Wrench } from "lucide-react";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const validateUserName = (name: string) => {
  if (name === null) return false;
  name = name.trim();
  const regexp = /^[a-zA-Zñ\s]+$/;
  if(!regexp.test(name)) return false;
  return name.length >= 2 && name.length <= 50;
};

export const validateUserLastname = (lastname: string) => {
  if (lastname === null) return false;
  lastname = lastname.trim();
  const regexp = /^[a-zA-Zñ\s]+$/;
  if(!regexp.test(lastname)) return false;
  return lastname.length >= 2 && lastname.length <= 100;
};

export const validateEmail = (email: string) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

export const validatePassword = (password: string) => {
  const re = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*(\W|_))(?!.* ).{8,16}$/;
  return re.test(password);
};

export const logout = async () => {
  localStorage.clear();
};
export const validateProductName = (name: string) => {
  if (name === null) return false;
  name = name.trim();
  return name.length >= 10 && name.length <= 100;
};

export const validateProductDescription = (text: string) => {
  if (text === null) return false;
  return text.trim().length > 0;
};

export const validateProductPrice = (value: number) => {
  if (value === null) return false;
  return value >= 1;
};
export const validateProductBrand = (text: string) => {
  if (text === null) return false;
  text = text.trim();
  return text.length >= 2 && text.length <= 50;
};
export const validateProductPhotos = (files: File[]) => {
  if (files === null) return false;
  return files.length >= 4 && files.length <= 8;
};
export const validateProductIds = (value: number) => {
  if (value === null) return false;
  return value >= 1;
};
export const validateSearchNameProduct = (text: string) => {
  if (text == null) return true;
  text = text.trim();
  if (text.length === 0) return true;
  if (text.length < 4) return false;
  const pattern = /^[a-zA-Z\s]+$/;
  return pattern.test(text);
};
export const showGuardAdminAlert = ({ success }: IAlertActions) => {
  Swal.fire({
    title: "Acceso denegado",
    html: "Necesitas permisos de administrador <br/> Rediriendo al inicio de sesión.",
    icon: "warning",
    iconColor: "#FF9E00",
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: success,
  });
};

export const showGuardAuthAlert = ({ success }: IAlertActions) => {
  Swal.fire({
    title: "Acceso denegado",
    html: "Necesitas iniciar sesión",
    icon: "warning",
    iconColor: "#FF9E00",
    timer: 3000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
    },
    willClose: success,
  });
};

export const getDateArray = (array:any) => {
  return array.flatMap((item:any) => {
    const shipStart = new Date(item.shipStart.toString()+"T00:00:00");
    const shipEnd = new Date(item.shipEnd.toString()+"T00:00:00");
    const dates = [];

    for (let d = shipStart; d <= shipEnd; d.setDate(d.getDate() + 1)) {
      dates.push(new Date(d));
    }

    return dates;
  });
};

export const getCharTypeFromId = (id: number) => {
  switch (id) {
    case 1:
      return { name: "Portabilidad", icon: BaggageClaim };
    case 2:
      return { name: "Ubicación", icon: MapPinned };
    case 3:
      return { name: "Resistencia", icon: Shield };
    case 4:
      return { name: "Montaje", icon: Wrench };
    case 5:
      return { name: "Uso", icon:  UserCheck};
    case 6:
      return { name: "Estetica", icon: Palette };
    default:
      return { name: "Otros", icon: Lightbulb };
  }
};
export function getErrorMessage(error:any) {
  const status = error.response?.status;
  switch (status) {
    case 400: return error.response?.data?.message || "Los datos enviados no son válidos.";
    case 401: return error.response?.data?.message ||"Necesitas iniciar sesión para realizar esta acción.";
    case 403: return error.response?.data?.message ||"No tienes permiso para realizar esta acción.";
    case 404: return error.response?.data?.message ||"El recurso solicitado no fue encontrado.";
    case 500: return error.response?.data?.message ||"Ocurrió un error en el servidor. Inténtalo más tarde.";
    default: return error.response?.data?.message || "Ocurrió un error inesperado. Inténtalo de nuevo.";
  }
}
