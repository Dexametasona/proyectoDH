"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { recommendationsCards } from "@/constants";
import { ProductCards } from "@/types";

const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductCards | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = recommendationsCards.find(
        (recommendation) => recommendation.id === id,
      );
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div>
      <h1>Detalles del Producto</h1>
      <p>Producto ID: {product.id}</p>
      <p>Nombre: {product.title}</p>
      <p>Precio: ${product.price}</p>
    </div>
  );
};

export default ProductPage;
