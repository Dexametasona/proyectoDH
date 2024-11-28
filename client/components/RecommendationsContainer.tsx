"use client";

import React, { useEffect, useState } from "react";

import { CardsContainerProps, Product } from "@/types";
import ProductsCards from "./ProductsCards";
import { getTopProducts } from "@/services/productService";

const RecommendationsContainer = ({
  name,
  verticalColumnMobile,
}: CardsContainerProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getTopProducts();
      if(fetchedProducts){
        setProducts(fetchedProducts.content)
        return;
      }
      setProducts([]);
    };
    fetchProducts();
  }, []);



  return (
    <section className="flex flex-col gap-4 items-center justify-center px-6 mt-12 place-content-evenly">
      <p className="text-primary text-2xl font-bold"> {name} </p>
      <div
        className={` max-w-screen-lg grid grid-cols-1 mb-4 sm:grid-cols-2 rounded-md gap-4 p-4 bg-[url('/assets/images/bg-recomendations.png')] ${
          verticalColumnMobile ? "flex-col" : "grid"
        }`}
      >
        {products.map((card) => (
          <ProductsCards
            key={card.id}
            id={card.id}
            name={card.name}
            photoUrl={card.photoUrl}
            price={card.price}
          />
        ))}
      </div>
    </section>
  );
};

export default RecommendationsContainer;
