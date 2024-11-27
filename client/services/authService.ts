import { IApiRes } from "@/types/IApiRes";
import { IAuthReq, IAuthRes, IUserReq, User } from "@/types/IAuth";
import axios from "@/lib/axiosInstance";
import { isAxiosError } from "axios";

export const login = async (credentials: IAuthReq) => {
  try {
    const response = await axios.post<IApiRes<IAuthRes>>(
      "/auth/login",
      credentials
    );
    const { data } = response.data;

    localStorage.setItem("authData", JSON.stringify(data));
    return data;
  } catch (error: unknown) {
    if (isAxiosError(error) && error.response) {
      const apiError = error.response.data as IApiRes<unknown>;
      throw new Error(apiError.message);
    }
    throw new Error("Error inesperado");
  }
};

export const signIn = async (request: IUserReq) => {
  try {
    const {data} = await axios.post<IApiRes<User>>("auth/register", {
      ...request
    });
    console.log("Usuario creado",data.data)
  } catch (error:unknown) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("authData");
};

export const getAuhtData: () => IAuthRes | null = () => {
  const authData = localStorage.getItem("authData");
  if (authData === null) return null;
  return JSON.parse(authData);
};

export const getAuthUser = async () => {
  const authData = getAuhtData();
  if (authData) {
    try {
      const response = await axios.get<IApiRes<User>>("/auth", {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      });
      const { data } = response.data;
      return data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const apiError = error.response.data as IApiRes<unknown>;
        console.log(apiError.message);
      }
      return null;
    }
  }
  return null;
};
