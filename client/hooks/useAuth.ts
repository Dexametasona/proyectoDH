import { login, logout } from "@/services/authService";
import { IAuthReq } from "@/types/IAuth";
import { useState } from "react";

export const useAuth = () => {
  const [user, setUser] = useState(null);

  const handleLogin = async (credentials: IAuthReq) => {
    const data = await login(credentials);
    setUser(data);
  };

  const handleLogout = () => {
    logout();
    setUser(null);
  };
  return { user, handleLogin, handleLogout };
};
