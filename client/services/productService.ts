import axios from "@/lib/axiosInstance";
import { Product } from "@/types";
import { IApiRes } from "@/types/IApiRes";
import { IPagination } from "@/types/IPagination";
import { IProductParam } from "@/types/Iproduct";

export const getAllProducts = async (params: IProductParam) => {
  try {
    const { data } = await axios.get<IApiRes<IPagination<Product>>>(
      `/products`,
      { params }
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
