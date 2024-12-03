"use client";

import React, { useEffect, useState } from "react";

import { CardsContainerProps, Product } from "@/types";
import ProductsCards from "./ProductsCards";
import { getAllProducts, getRandomProducts } from "@/lib/api_interface";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import CustomPagination from "./shared/CustomPagination";
import { useAppContext } from "@/context/AppContext";

const RecommendationsContainer = ({
  name,
  verticalColumnMobile,
}: CardsContainerProps) => {
  const { searchProductsList } = useAppContext();

  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <section className="flex flex-col gap-4 items-center justify-center px-6 mt-12 place-content-evenly ">
      <p className="text-primary text-2xl">
        {searchProductsList.length > 0 ? "Resultados" : name}
      </p>

      <div
        className={`max-w-screen-lg grid grid-cols-1 mb-4 gap-4 bg-red-300 ${
          verticalColumnMobile ? "flex-col" : "grid"
        }`}
      >
        {searchProductsList.length > 0 ? (
          <div>
            {searchProductsList.map((card) => (
              <ProductsCards
                key={card.id}
                id={card.id}
                name={card.name}
                photoUrl={card.photoUrl}
                price={card.price}
              />
            ))}
          </div>
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
