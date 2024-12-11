import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { IAuthRes } from "@/types/IAuth";
import { IFavoriteRes } from "@/types/IFavorite";

export const getAllFavoritesByUser = async (authData: IAuthRes) => {
  try {
    const { data } = await axios.get<IApiRes<IFavoriteRes[]>>(`/favorites`, {
      headers: {
        Authorization: `Bearer ${authData.token}`,
      },
    });
    console.log("Get favorites products short: ", data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching favorites: ", error);
    return [];
  }
};
export const addFavorite = async (authData: IAuthRes, productId: number) => {
  try {
    const {data} = await axios.post<IApiRes<IFavoriteRes[]>>(
      "/favorites",
      { productId },
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    console.log("Producto anadido a favoritos con exito: ", data.data);
    return data.data;
  } catch (error) {
    console.log('Error al anadir a favoritos', error)
    throw error;
  }
};

export const removeFavorite = async (authData: IAuthRes, productId: number) => {
  try {
    const {data} = await axios.delete<IApiRes<IFavoriteRes[]>>(
      `/favorites/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${authData.token}`,
        },
      }
    );
    console.log("Producto anadido a favoritos con exito: ", data.data);
    return data.data;
  } catch (error) {
    console.log('Error al anadir a favoritos', error)
    const emptyResponse:IFavoriteRes[]=[]
    return emptyResponse;
  }
};

