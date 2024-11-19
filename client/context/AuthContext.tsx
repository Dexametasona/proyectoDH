"use client";

import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";

interface AuthContextType {
  isUser: boolean;
  isAdmin: boolean;
  setIsAdmin: Dispatch<SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [isUser, setIsUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    console.log(authToken);
    if (!authToken) {
      setIsUser(false);
    } else {
      setIsUser(true);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isUser,
        isAdmin,
        setIsAdmin,
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
      "useAuthContext must be within an AuthContextProvider context",
    );
  }

  return context;
};
