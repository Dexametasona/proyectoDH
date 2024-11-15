"use client";

import React, { useEffect, useState } from "react";

import { CardsContainerProps, Product } from "@/types";
import ProductsCards from "./ProductsCards";
import { getAllProducts } from "@/lib/api_interface";
import { recommendationsCards } from "@/constants";
import CustomPagination from "./shared/CustomPagination";

const RecommendationsContainer = ({
  name,
  verticalColumnMobile,
}: CardsContainerProps) => {
  //TODO: now the project works with dummy data. The code below fetch the API data. The functioning must be switched to this code
  // const [products, setProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const fetchedProducts = await getAllProducts();
  //     setProducts(fetchedProducts);
  //   };

  //   fetchProducts();
  // }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de productos por página

  const totalPages = Math.ceil(recommendationsCards.length / itemsPerPage);

  // Obtiene los productos de la página actual
  const currentProducts = recommendationsCards.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  // TODO the pagination needs to be repaired

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <section className="flex flex-col gap-4 items-center justify-center px-6 mt-12 place-content-evenly ">
      <p className="text-primary text-2xl"> {name} </p>

      <div
        className={` max-w-screen-lg grid grid-cols-1 mb-4 sm:grid-cols-2 gap-4 ${
          verticalColumnMobile ? "flex-col" : "grid"
        }`}
      >
        {currentProducts.map((card) => (
          <ProductsCards
            key={card.id}
            id={card.id}
            bgImage={card.bgImage}
            name={card.name}
            brand={card.brand}
            cardImage={card.cardImage}
            price={card.price}
            description={card.description}
            status={card.status}
            thumbnails={card.thumbnails}
          />
        ))}
      </div>
      <CustomPagination
        totalPages={totalPages}
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </section>
  );
};

export default RecommendationsContainer;
