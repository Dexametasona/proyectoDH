"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { recommendationsCards } from "@/constants";
import { ProductCards } from "@/types";


const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductCards | null>(null);

  useEffect(() => {
    if (id) {
      const foundProduct = recommendationsCards.find(
        (recommendation) => recommendation.id === id
      );
      setProduct(foundProduct || null);
    }
  }, [id]);

  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="container mx-auto my-20 w-1/2 p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-5 mt-5">
        <Image
          src={product.cardImage}
          alt={product.title}
          width={500}
          height={300}
          className="rounded-md" />
      </div>
      <div className="text-center mb-5 mt-5">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <div className="flex items-center justify-center text-yellow-500">
          <span className="mr-1">⭐ {product.review}</span>
        </div>
      </div>

      {/* Información de disponibilidad y precio */}
      <div className="flex justify-between items-center mb-4 p-2 border-y border-primary-light">
        <div className="flex flex-col">
          <span className="text-green-600 font-bold">Disponible</span>
          <p className="text-gray-700">{product.price} USD por hora</p>
          <p className="text-gray-500">Marca: Saltasina</p>
        </div>
        <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600">
          Reservar
        </button>
      </div>
      {/* Descripción */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Descripción</h2>
        <p className="text-gray-700">
          Lorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem...
        </p>
        <a href="#" className="text-blue-600">Ver más</a>
      </div>
    </div>
  );
}

export default ProductPage;
