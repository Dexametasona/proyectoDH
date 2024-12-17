"use client";
import { useEffect, useState } from "react";

import { useAuthContext } from "@/context/AuthContext";
import { getOrderByUser } from "@/lib/api_interface";
import OrderCard from "@/components/orders/OrderCard";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { IOrderRes } from "@/types/IOrder";
import isAuth from "@/guards/authGuard";

const Page = () => {
  const router = useRouter();

  const { authData, loading } = useAuthContext();
  const [orders, setOrders] = useState<IOrderRes[]>([]);

  const handleBackHome = () => {
    router.push("/home");
  };

  useEffect(() => {
    const fetchOrders = async () => {
      if (!loading && authData) {
        try {
          const orderData = await getOrderByUser(authData, {
            sort: "shipStart",
          });
          setOrders(orderData.content);
        } catch (err) {
          console.error("Error fetching orders or products:", err);
        }
      }
    };

    fetchOrders();
  }, [authData, loading]);

  return (
    <div className="flex flex-col  gap-8 p-6 max-w-screen-lg mx-auto">
      <div className="text-primary p-1 my-2 bg-white shadow-md ">
        <div className="flex rounded hover:bg-primary-light m-1 p-1 cursor-pointer">
          <ChevronLeft onClick={handleBackHome} /> Atrás
        </div>
      </div>

      <div className="bg-white p-8 flex flex-col gap-8">
        <p className="col-span-full text-3xl font-extrabold text-primary">
          Reservas
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default isAuth(Page);
