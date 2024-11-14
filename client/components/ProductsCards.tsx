"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { ProductCards } from "@/types";

const ProductsCards = ({
  id,
  bgImage,
  cardImage,
  title,
  price,
  review,
}: ProductCards) => {
  const router = useRouter();

  const handleRedirect = (page: string) => {
    router.push(`/${page}/${id}`);
  };

  return (
    <>
      {bgImage ? (
        <div
          className="relative w-full h-48 bg-cover bg-center rounded-t-lg cursor-pointer"
          style={{ backgroundImage: `url(${bgImage})` }}
          onClick={() => handleRedirect("category")}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <p className="absolute bottom-4 left-4 text-white font-bold">
            {title}
          </p>
        </div>
      ) : (
        <div className="bg-[var(--secondary)] rounded-2xl shadow-lg p-4">
        <div className="mt-2 text-center mb-4 bg-white p-3 rounded-lg shadow-md" onClick={() => handleRedirect("product")
        }>
           <div className="flex justify-center">
          <Image
            src={cardImage || ""}
            alt="product image"
            width={400}
            height={200}
            className="mb-3 w-96 h-96 rounded-lg cursor-pointer object-cover"
            layout="fixed"
          />
          </div>
          <div className="justify-items-start">
            <p className="text-text-color font-semibold"> {title} </p>
            <p className="text-primary font-bold text-lg"> ${price}/hora </p>
            <div className="flex items-center justify-center mt-1 text-text-color text-sm">
              <span>⭐ {review}</span>
            </div>
          </div>
        </div>
        </div>
      )}
    </>
  );
};

export default ProductsCards;
