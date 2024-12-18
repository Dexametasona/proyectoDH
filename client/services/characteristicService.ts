import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { IAuthRes } from "@/types/IAuth";
import { ICharacteristicReq, ICharacteristicRes } from "@/types/ICharacteristic";

export const getAllCharacteristics = async () => {
  try {
    const { data } = await axios.get<IApiRes<ICharacteristicRes[]>>(
      `/characteristic`
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching characteristic: ", error);
    throw error
  }
};
export const deleteCharacteristic = async (id: number, authdata: IAuthRes) => {
  try {
    const { data } = await axios.delete<IApiRes<string>>(
      `/characteristic/${id}`,
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error deleting characteristic: ", error);
    throw error
  }
};

export const updateCharacteristic = async (id: number, authdata: IAuthRes, char:ICharacteristicReq) => {
  try {
    const { data } = await axios.put<IApiRes<ICharacteristicRes>>(
      `/characteristic/${id}`,
      char,
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error updating characteristic: ", error);
    throw error
  }
};
export const createCharacteristic = async (authdata: IAuthRes, char:ICharacteristicReq) => {
  try {
    const { data } = await axios.post<IApiRes<ICharacteristicRes>>(
      `/characteristic`,char,
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error creating characteristic: ", error);
    throw error
  }
};
