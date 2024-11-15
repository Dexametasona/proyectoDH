"use client";

import React, { useEffect, useState } from "react";

import { CardsContainerProps, Product } from "@/types";
import ProductsCards from "./ProductsCards";
import { getAllProducts } from "@/lib/api_interface";


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
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Número de productos por página


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

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  console.log(products)
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
            cardImage={card.photoUrl}
            price={card.price}
            description={card.description}
            status={card.status}
            thumbnails={card.thumbnails}
          />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={
                currentPage === 0 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }} />
          </PaginationItem>

          <PaginationItem>
            <PaginationNext
              className={
                currentPage === 100 ? "pointer-events-none opacity-50" : undefined
              }
              onClick={() => {
                setCurrentPage(currentPage +1); 
                
              }} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </section>
    
  );
};

export default RecommendationsContainer;