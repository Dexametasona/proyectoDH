import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { IAuthRes } from "@/types/IAuth";
import { IPagination } from "@/types/IPagination";
import { IUserParam, IUserRes } from "@/types/IUser";

export const getAllUsers = async (params: IUserParam) => {
  try {
    const { data } = await axios.get<IApiRes<IPagination<IUserShort>>>(
      `/users`,
      { params }
    );
    console.log("Get users short: ", data.data)
    return data.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return null;
  }
};

export const getFullUsers = async (
  params: IUserParam,
  authdata: IAuthRes
) => {
  try {
    const { data } = await axios.get<IApiRes<IPagination<IUserRes>>>(
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