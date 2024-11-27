import axios from "axios";

const axiosInstance = axios.create({
  baseURL:"https://proyectodh-13hj.onrender.com/api/v1"
})

export default axiosInstance;