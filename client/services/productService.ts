import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { IAuthRes } from "@/types/IAuth";
import { IPagination } from "@/types/IPagination";
import { IProductParam, IProductRes, IProductShort } from "@/types/IProduct";

export const getAllProducts = async (params: IProductParam) => {
  try {
    const { data } = await axios.get<IApiRes<IPagination<IProductShort>>>(
      `/products`,
      { params }
    );
    console.log("Get products short: ", data.data);
    return data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getFullProducts = async (
  params: IProductParam,
  authdata: IAuthRes
) => {
  try {
    const { data } = await axios.get<IApiRes<IPagination<IProductRes>>>(
      `/products/all`,
      {
        params: { ...params, size: 10 },
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return null;
  }
};

export const getTopProducts = () =>
  getAllProducts({
    size: 10,
    sort: "avgScore",
  });

export const createProduct = async (
  authdata: IAuthRes,
  productData: FormData
) => {
  try {
    const { data } = await axios.post<IApiRes<IProductRes>>(
      `/products`,
      productData,
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const deleteProduct = async (authdata: IAuthRes, productId: number) => {
  try {
    const { data } = await axios.delete<IApiRes<string>>(
      `/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

export const updateProduct = async (
  authdata: IAuthRes,
  productData: FormData,
  productId: number
) => {
  try {
    const { data } = await axios.put<IApiRes<IProductRes>>(
      `/products/${productId}`,productData,
      {
        headers: {
          Authorization: `Bearer ${authdata.token}`,
        },
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};
