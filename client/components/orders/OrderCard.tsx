import { IOrderRes } from "@/types/IOrder";
import { Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const OrderCard = ({
  order,
  triggerModal,
}: {
  order: IOrderRes;
  triggerModal: (order:IOrderRes) => void;
}) => {
  const isOrderEnded = () => {
    const orderShipEnd = new Date(order.shipEnd + "T23:59:00");
    return new Date() > orderShipEnd;
  };
  return (
    <div className="border border-grey-subtext max-w-[400px] sm:max-w-max rounded-lg flex flex-col gap-2 md:gap-6 items-center p-3 text-sm sm:flex-row lg:text-xl relative">
      <Image
        src={order.productPhotoUrl}
        alt="product photo"
        width={160}
        height={160}
        className="rounded-xl"
      />
      <div className="flex gap-2 flex-col">
        <p className="text-disabled">Order N.{order.id}</p>
        <p className="font-medium md:font-bold text-primary">
          {order.productName}
        </p>
        <p className="text-xs lg:text-xl">
          Del {order.shipStart} al {order.shipEnd}
        </p>
        <p className="text-grey-subtext">Total: {order.amount} USD</p>
        {isOrderEnded() ? (
          <button
            onClick={() => triggerModal(order)}
            type="button"
            className="text-sm bg-primary-soft rounded-md text-white transition-default hover:opacity-75"
          >
            Reseña
          </button>
        ) : null}
      </div>
      <Link href={"/product/" + order.productId}>
        <Button
          variant={"secondary"}
          type="button"
          className="absolute transition-default hover:opacity-75 top-2 right-2"
        >
          <Search />
        </Button>
      </Link>
    </div>
  );
};

export default OrderCard;
