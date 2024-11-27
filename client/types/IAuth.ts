export interface IAuthRes {
  token : string,
  rol: number,
  id: number
}
export interface IAuthReq {
  email: string,
  password: string
}

export interface User {
  id: number;
  name: string;
  lastname: string;
  email: string;
  role: number;
  isEnabled: boolean;
  isDeleted: boolean;
  createdAt: Date;
}

export interface IUserReq {
  name: string;
  lastname: string;
  email: string;
  password: string;
}
