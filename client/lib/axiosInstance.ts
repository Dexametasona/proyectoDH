import { API_URL } from "@/constants/environments";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_URL+"/api/v1",
});

export default axiosInstance;
