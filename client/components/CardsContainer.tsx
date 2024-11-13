"use client";

import React, { useEffect, useState } from "react";

import { CardsContainerProps, Product } from "@/types";
import ProductsCards from "./ProductsCards";
import { getAllProducts } from "@/lib/api_interface";

const CardsContainer = ({
  name,
  verticalColumnMobile,
}: CardsContainerProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
<<<<<<< HEAD
    
    <section className="flex flex-col gap-4 justify-center  px-6 mt-12 place-content-evenly ">
=======
    <section className="flex flex-col gap-4 justify-center px-6 mt-12 place-content-evenly ">
>>>>>>> f08ea243411abe80ee6f0faa7cd4ec013a33be0c
      <p className="text-primary text-2xl"> {name} </p>

      <div
        className={` max-w-screen-lg grid grid-cols-1 mb-4 sm:grid-cols-2 gap-4 ${
          verticalColumnMobile ? "flex-col" : "grid"
        }`}
      >
        {products.map((card) => (
          <ProductsCards
            key={card.id}
            id={card.id}
            bgImage={card.bgImage}
            name={card.name}
            brand={card.brand}
            cardImage={card.photoUrl}
            price={card.price}
            description={card.description}
            status={card.status}
            thumbnails={card.thumbnails}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsContainer;
