import axios from "@/lib/axiosInstance";
import { IApiRes } from "@/types/IApiRes";
import { ICategoryRes } from "@/types/ICategory";

export const getAllCategories = async () => {
  try {
    const { data } = await axios.get<IApiRes<ICategoryRes[]>>(`/category`);
    return data.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
};
