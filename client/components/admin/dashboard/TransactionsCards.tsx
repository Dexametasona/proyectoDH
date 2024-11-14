import Image from "next/image";
import React from "react";

const TransactionsCards = ({ item }) => {
  
  return (
    <>


      <div className="flex items-center p-2 rounded-lg bg-gray-100">
        <Image
          src={item.image}
          width={48}
          height={48}
          alt="user image"
          className="w-10 h-10 rounded-full"
        />
        <div className="ml-3 flex-grow">
          <p className="font-semibold text-gray-800">{item.name}</p>
          <p className="text-sm text-gray-500">Orders: {item.orders}</p>
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-800">$ {item.total}</p>
        </div>
      </div>

    </>
  );
};

export default TransactionsCards;
