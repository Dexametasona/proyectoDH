import { IPaginationParam } from "./IPagination";

export interface IUserParam extends IPaginationParam{
  name?: string,
  lastname?: string,
  email?: string,
  role?: number,
  isDeleted?: boolean,
}

export interface IUserShort{
  id: number,
  name: string,
  lastname : string,
  email: string,
  role: number
}

export interface IUserRes {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: number;
  isEnabled: boolean;
  isDeleted: boolean;
  createdAt: Date;
}

export interface IUserUpdate{
  name: string;
  lastname: string;
}

export interface IUserPassword{
  password:string;
  newPassword:string;
}