import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { ICharacteristicRes } from "@/types/ICharacteristic";

export const getAllCharacteristics = async () => {
  try {
    const { data } = await axios.get<IApiRes<ICharacteristicRes[]>>(`/characteristic`);
    return data.data;
  } catch (error) {
    console.error("Error fetching characteristic: ", error);
    return [];
  }
};
