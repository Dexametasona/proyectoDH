"use client";
import { useEffect, useState } from "react";

import { useAuthContext } from "@/context/AuthContext";
import { getOrderByUser } from "@/lib/api_interface";
import OrderCard from "@/components/orders/OrderCard";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { IOrderRes } from "@/types/IOrder";
import isAuth from "@/guards/authGuard";
import ReviewModal from "@/components/modal/ReviewModal";
import { createReview } from "@/services/reviewService";
import { IReviewReq } from "@/types/IReview";
import Swal from "sweetalert2";
import { isAxiosError } from "axios";
import { IApiRes } from "@/types/IApiRes";

const Page = () => {
  const router = useRouter();

  const { authData, loading } = useAuthContext();
  const [orders, setOrders] = useState<IOrderRes[]>([]);
  const [selectedOrder, setSelectedOrder] = useState<IOrderRes>();
  const [showModal, setShowModal] = useState(false);

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

  const handleShowModal = (order: IOrderRes) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCreateReview = async (review: IReviewReq) => {
    try {
      await createReview(review, authData!);
      Swal.fire({ icon: "success", title: "Reseña creada con éxito." });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const response = error.response.data as IApiRes<unknown>;
        Swal.fire({ icon: "error", text: response.message });
        return;
      }
      console.error("Error al crear resena", error);
      Swal.fire({ icon: "error", text: "Error al crear la reseña." });
    } finally {
      setShowModal(false);
    }
  };

  return (
    <div className="flex flex-col  gap-8 p-6 max-w-screen-lg mx-auto min-h-[calc(100vh-176px)]">
      <div className="text-primary p-1 my-2 bg-white shadow-md ">
        <div className="flex rounded hover:bg-primary-light m-1 p-1 cursor-pointer">
          <ChevronLeft onClick={handleBackHome} /> Atrás
        </div>
      </div>

      <div className="bg-white p-8 flex flex-col gap-8">
        <p className="col-span-full text-3xl font-extrabold text-primary">
          Reservas
        </p>
        {!orders || orders.length < 1 ? (
          <p>Todavia no tienes reservas.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                triggerModal={handleShowModal}
              />
            ))}
          </div>
        )}
      </div>
      {showModal ? (
        <ReviewModal
          handleShowModal={setShowModal}
          handleCreateReview={handleCreateReview}
          order={selectedOrder!}
        />
      ) : null}
    </div>
  );
};

export default isAuth(Page);
