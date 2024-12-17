"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { Product } from "@/types";

const ProductsCards = ({ id, photoUrl, name, price }: Product) => {
  const router = useRouter();

  const handleRedirect = (page: string) => {
    router.push(`/${page}/${id}`);
  };

  return (
    <>
        <div className="rounded-lg shadow-lg">
          <div
            className="text-center bg-white p-3 rounded-t-lg shadow-md"
            onClick={() => handleRedirect("product")}
          >
            <div className="flex justify-center item-center">
              <Image
                src={photoUrl || ""}
                alt="product image"
                width={400}
                height={200}
                className="mb-3 w-full rounded-t-lg cursor-pointer aspect-square"
                layout="fixed"
              />
            </div>

          <div className="justify-items-start">
            <p className="text-text-color font-semibold"> {name} </p>
            <p className="text-primary font-bold text-lg"> ${price}/dia </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsCards;
