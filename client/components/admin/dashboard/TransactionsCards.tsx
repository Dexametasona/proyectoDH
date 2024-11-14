import Image from "next/image";
import React from "react";

const TransactionsCards = ({ item }) => {
  return (
    <>
      <Image src={item.image} width={48} height={48} alt="user image" />
      <p> {item.name} </p>
      <div className="flex gap-2">
        <p>Orders:</p>
        <p> {item.orders} </p>
      </div>
      <div className="flex gap-2">
        <p>Total: </p>
        <p> {item.total} </p>
      </div>
    </>
  );
};

export default TransactionsCards;
