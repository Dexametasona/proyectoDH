import { ProductCards } from "@/types";
import Image from "next/image";
import React from "react";

const ProductsCards = ({
  bgImage,
  cardImage,
  title,
  price,
  review,
}: ProductCards) => {
  return (
    <>
      {bgImage ? (
        <div
          className="w-96 h-60 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${bgImage})` }}
        >
          <p> {title} </p>
        </div>
      ) : (
        <div>
          <Image src={cardImage} alt="product image" width={160} height={176} />
          <p> {title} </p>
          <p> {price} </p>
          <p> {review} </p>
        </div>
      )}
    </>
  );
};

export default ProductsCards;
