"use client";

import React, { useEffect, useState } from "react";

import { CardsContainerProps, Product } from "@/types";
import ProductsCards from "./ProductsCards";
import CustomPagination from "./shared/CustomPagination";
import { useAppContext } from "@/context/AppContext";
import ResultsCards from "@/components/ResultsCards";
import { getTopProducts } from "@/services/productService";
import { IProductShort } from "@/types/IProduct";


import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

const RecommendationsContainer = ({
  name,
  verticalColumnMobile,
}: CardsContainerProps) => {
  const { resultsProductsList } = useAppContext();

  const [products, setProducts] = useState<IProductShort[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getTopProducts();
      if (fetchedProducts) {
        setProducts(fetchedProducts.content);
        return;
      }
      setProducts([]);
    };
    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="flex flex-col gap-4  justify-center px-6 mt-12 place-content-evenly ">
      <p className="text-primary text-2xl text-left font-extrabold">
        {resultsProductsList.length > 0 ? "Resultados" : name}
      </p>

      <div
        className={`grid grid-cols-2 mb-4 gap-4 self-center ${
          verticalColumnMobile ? "flex-col" : "grid"
        } ${
          resultsProductsList.length > 0
            ? "w-full gap-10 flex"
            : "max-w-screen-lg gap-4 "
        }`}
      >
        {resultsProductsList.length > 0 ? (
          <>
            {resultsProductsList.map((card) => {
              return (
                <ResultsCards
                  key={card.id}
                  id={card.id}
                  name={card.name}
                  photoUrl={card.photos[0].url}
                  price={card.price}
                />
              );
            })}
          </>
        ) : (
          <>
            {currentProducts.map((card) => (
              <ProductsCards
                key={card.id}
                id={card.id}
                name={card.name}
                photoUrl={card.photoUrl}
                price={card.price}
              />
            ))}
          </>
        )}
      </div>
      <CustomPagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
      ></CustomPagination>
    </section>
    
  );
};

export default RecommendationsContainer;
