"use client";

import {
  getAuhtData,
  getAuthUser,
  login,
  logout,
} from "@/services/authService";
import { IAuthReq, IAuthRes, User } from "@/types/IAuth";
import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

interface AuthContextType {
  user: User | null;
  authData: IAuthRes | null;
  loginContext: (credential: IAuthReq) => Promise<IAuthRes>;
  logoutContext:()=>void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authData, setAuthData] = useState<IAuthRes | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const currentUser = await getAuthUser();
        const currentAuthData = getAuhtData()
        setUser(currentUser);
        setAuthData(currentAuthData)
        return;
      } catch (error: unknown) {
        console.error("Usuario no autenticado: ", error);
        setUser(null);
        setAuthData(null);
      }
    })();
  }, []);

  const loginContext = async (credential: IAuthReq) => {
    try {
      const authData = await login(credential);
      setAuthData(authData);
      const currentUser = await getAuthUser();
      setUser(currentUser);
      return authData;
    } catch (error) {
      console.error(error)
      setAuthData(null);
      setUser(null);
      throw error;
    }
  };

  const logoutContext = () => {
    logout();
    setUser(null)
    setAuthData(null)
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authData,
        loginContext,
        logoutContext
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be within an AuthContextProvider context"
    );
  }

  return context;
};
