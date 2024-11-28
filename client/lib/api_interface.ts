import axios from "@/lib/axiosInstance";

import { API_URL } from "@/constants/environments";
const BASE_URL = API_URL+"/api/v1"
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

// export const getProductById = async ({ id }: number) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/products/${id}`);
//   } catch (error) {}
// };

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
    const response = await axios.get(
      `${BASE_URL}/products/autocomplete/${name}`,
    );

    console.log(response);
    return response;
  } catch (error) {
    console.log(error)
  }
};

// export const selectDates = async (id) => {};

export const createDate = async (
  productId: number,
  shipAddress: string,
  shipEnd: string,
  shipStart: string,
  remarks: string,
) => {
  try {
    const response = await axios.post(`${BASE_URL}/dates`, {
      productId,
      shipAddress,
      shipEnd,
      shipStart,
      remarks,
    });

    return response.data;
  } catch (error) {
    console.error("Error creating date range:", error);
    return null;
  }
};

createDate(4, "Test", "2024-12-15", "2024-12-08", "comentarios");
