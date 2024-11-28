import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
export const validateProductName = (name:string)=>{
  if(name === null) return false;
  name = name.trim();
  return name.length >=10 && name.length <=100;
}

export const validateProductDescription = (text:string)=>{
  if(text === null) return false;
  return text.trim().length >0;
}

export const validateProductPrice = (value:number)=>{
  if(value === null) return false;
  return value>=1;
}
export const validateProductBrand = (text:string)=>{
  if(text === null) return false;
  text = text.trim();
  return text.length >=2 && text.length <=50;
}
export const validateProductPhotos = (files:File[])=>{
  if(files === null) return false;
  return files.length >=4 && files.length <=8;
}
export const validateProductIds = (value:number)=>{
  if(value === null) return false;
  return value >= 1;
}
