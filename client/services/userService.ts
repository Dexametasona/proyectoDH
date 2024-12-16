import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { IAuthReq, IAuthRes } from "@/types/IAuth";
import { IPagination } from "@/types/IPagination";
import { IUserParam, IUserPassword, IUserRes, IUserShort, IUserUpdate } from "@/types/IUser";

export const getFullUsers = async (
  params: IUserParam,
  authdata: IAuthRes
) => {
  try {
    const { data } = await axios.get<IApiRes<IPagination<IUserShort>>>(
      `/users`,
      {
        params: { ...params, size: 10 },
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const changeRole = async (authdata: IAuthRes, id: number, newRole: number) => {
  try {
    const { data } = await axios.post(
      `/users/role/${id}?role=${newRole}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      });
    console.log(data);
    console.log("Datos enviados:", newRole);
    return data.data;
  } catch (error) {
    console.error("Error changing role:", error);
    throw error;
  }
};

export const updateUser = async (authdata: IAuthRes, userData:IUserUpdate)=>{
  try {
    const { data } = await axios.put<IApiRes<IUserRes>>(
      `/users`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      });
    console.log("Datos actualizados:", data);
    return data.data;
  } catch (error) {
    console.error("Error updating:", error);
    throw error;
  }
}

export const changeEmail = async (authdata: IAuthRes, userData:IAuthReq)=>{
  try {
    const { data } = await axios.post<IApiRes<string>>(
      `/auth/change-email`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      });
    console.log("Datos actualizados:", data);
    return data.data;
  } catch (error) {
    console.error("Error updating:", error);
    throw error;
  }
}

export const changePassword = async (authdata: IAuthRes, userData:IUserPassword)=>{
  try {
    const { data } = await axios.post<IApiRes<string>>(
      `/auth/change-password`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      });
    console.log("Datos actualizados:", data);
    return data.data;
  } catch (error) {
    console.error("Error updating:", error);
    throw error;
  }
}