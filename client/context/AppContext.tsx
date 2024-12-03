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

interface AppContextType {
  windowWidth: number;
  isSmallScreen: boolean;
  adminMenuSelected: string | null;
  setAdminMenuSelected: Dispatch<SetStateAction<string>>;
  handleMenuChange: (menuLabel: string) => void;
  searchProductsList: object[];
  setSearchProductsList: Dispatch<SetStateAction<object[] | null>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [adminMenuSelected, setAdminMenuSelected] = useState("dashboard");
  const [searchProductsList, setSearchProductsList] = useState([]);

  const handleMenuChange = (menuLabel: string) => {
    setAdminMenuSelected(menuLabel);
  };

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isSmallScreen = windowWidth < 640;

  return (
    <AppContext.Provider
      value={{
        isSmallScreen,
        windowWidth,
        adminMenuSelected,
        setAdminMenuSelected,
        handleMenuChange,
        searchProductsList,
        setSearchProductsList,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext must be within an AppContextProvider context",
    );
  }

  return context;
};
