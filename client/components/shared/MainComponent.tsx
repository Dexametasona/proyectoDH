"use client"
import { useAxiosInterceptor } from "@/lib/axiosInstance";
import CustomLoader from "./CustomLoader";
import Footer from "./Footer";
import Header from "./Header";

export const MainComponent = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  useAxiosInterceptor()
  return (
    <>
      <Header />
      <div className="containerLayout flex-grow bg-[--background-color] flex flex-col justify-center ">
        {children}
      </div>
      <CustomLoader />
      <Footer />
    </>
  );
};
