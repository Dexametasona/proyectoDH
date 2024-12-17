import Image from "next/image";
import React from "react";

const OrderCard = ({ order }) => {
  console.log(order);
  return (
    <div className="border border-grey-subtext rounded-lg flex gap-6 h-44 p-3 text-xl">
      <Image
        src={order.photoUrl}
        alt="product photo"
        width={160}
        height={160}
        className="rounded-xl"
      />
      <div className="flex gap-2 flex-col">
        <p className="font-medium">{order.productName}</p>

        <p>
          {order.shipStart} - {order.shipEnd}
        </p>
        <p className="text-grey-subtext">Total: {order.amount} USD</p>
      </div>
    </div>
  );
};

export default OrderCard;
