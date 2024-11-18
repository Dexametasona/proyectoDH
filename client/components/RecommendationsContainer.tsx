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
} from "@/components/ui/pagination"
import CustomPagination from "./shared/CustomPagination";

const RecommendationsContainer = ({
  name,
  verticalColumnMobile,
}: CardsContainerProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Número de productos por página


  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  
  // Calcula el total de páginas
  const totalPages = Math.ceil(products.length / itemsPerPage);

  // Obtiene los productos de la página actual
  const currentProducts = products.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  console.log(currentPage)
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
            name={card.name}
            photoUrl={card.photoUrl}
            price={card.price} 
      
          />
        ))}
      </div>
      <CustomPagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}></CustomPagination>
      </section>
    
  );
};

export default RecommendationsContainer;