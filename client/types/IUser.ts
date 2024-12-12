// import { ICategoryRes } from "./ICategory";
import { IPaginationParam } from "./IPagination";

export interface IUserParam extends IPaginationParam{
  name?: string,
  lastname?: string,
  email?: string,
  role?: number,
  isDeleted?: boolean,
}

export interface IUserRes{
  id: number,
  name: string,
  lastname : string,
  email: string,
  role: number
}