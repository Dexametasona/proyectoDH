import { API_URL } from "@/constants/environments";
import { useLoaderContext } from "@/context/loaderContext";
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: API_URL + "/api/v1",
});

export const useAxiosInterceptor = () => {
  const { setStatus } = useLoaderContext();

  axiosInstance.interceptors.request.use(
    (config) => {
      setStatus(true);
      return config;
    },
    (error) => {
      setStatus(false);
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      setStatus(false);
      return response;
    },
    (error) => {
      setStatus(false);
      return Promise.reject(error);
    }
  );
};

export default axiosInstance;
