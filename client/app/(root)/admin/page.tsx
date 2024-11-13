"use client";

import AdminMenu from "@/components/admin/AdminMenu";
import Dashboard from "@/components/admin/dashboard/Dashboard";
import ProductList from "@/components/admin/productList/ProductList";
import TopBar from "@/components/admin/TopBar";
import { useAppContext } from "@/context/AppContext";


const page = () => {
  const { adminMenuSelected } = useAppContext();

  return (
    <>
      <TopBar />
    <div className="h-[calc(100vh-176px)] flex">
  
      <AdminMenu />
    
      <div className="flex-grow">

        {adminMenuSelected === "Dashboard" && <Dashboard />}
        {adminMenuSelected === "Lista de Productos" && <ProductList />}
      </div>
    </div>
    </>
  );
};

export default page;


