import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { IAuthRes } from "@/types/IAuth";
import { IProductShort } from "@/types/IProduct";

export const getAllFavoritesByUser = async (authData:IAuthRes) => {
  try {
    const { data } = await axios.get<IApiRes<IProductShort[]>>(`/favorites`, {headers:{
      Authorization:`Bearer ${authData.token}`
    }});
    console.log("Get favorites products short: ", data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching favorites: ", error);
    return [];
  }
};
