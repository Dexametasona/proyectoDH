import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { IAuthRes } from "@/types/IAuth";
import { IProductRes } from "@/types/IProduct";


const BASE_URL = "https://proyectodh-13hj.onrender.com/api/v1";

export const getAllProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/products`);

    return response.data.data.content;
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductById = async (id: string | string[]) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/${id}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return [];
  }
};


export const getAllUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);

    return response.data.data.content;
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
};

export const filterByName = async (name: string) => {
  try {
    const response = await axios.get(`${BASE_URL}/products/autocomplete/${name}`);

    console.log(response);
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (authData: IAuthRes, reservationData: any) => {
  try {
    const { data } = await axios.post<IApiRes<IProductRes>>(`/order`, reservationData, {
      headers: {
        Authorization: `Bearer ${authData?.token}`,
      },
    });
    console.log(data);
    console.log("Datos enviados:", reservationData);
    return data.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};