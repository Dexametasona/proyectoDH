import { API_URL } from "@/constants/environments";
import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
  baseURL:"https://proyectodh-13hj.onrender.com/api/v1"
})
=======
  baseURL: API_URL+"/api/v1",
});
>>>>>>> 1e7f9820f73ee74e8bfd80537e42ced15584388f

export default axiosInstance;
