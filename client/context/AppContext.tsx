"use client";

import {
  ReactNode,
  useContext,
  createContext,
  useState,
  useEffect,
} from "react";

interface AppContextType {
  windowWidth: number;
  isSmallScreen: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(0);

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
    <AppContext.Provider value={{ isSmallScreen, windowWidth }}>
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
