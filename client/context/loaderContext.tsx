"use client";

import { ReactNode, useContext, createContext, useState } from "react";

interface LoaderContextType {
  isActive: boolean;
  setStatus: (isActive: boolean) => void;
}

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [status, setStatus] = useState<boolean>(false);

  return (
    <LoaderContext.Provider
      value={{
        isActive: status,
        setStatus,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoaderContext = () => {
  const context = useContext(LoaderContext);

  if (!context) {
    throw new Error(
      "loaderContext must be within an loaderContextProvider context"
    );
  }

  return context;
};
