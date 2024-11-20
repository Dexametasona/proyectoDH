"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { recommendationsCards } from "@/constants";
import { ProductCards, ProductById } from "@/types";
import GalleryModal from "@/components/modal/GalleryModal";
import { Check, XIcon, DollarSignIcon, CrownIcon } from "lucide-react";
import { getProductById } from "@/lib/api_interface";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductById | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    if (id) {
      console.log("ID FOUND: ", id);

      getProductById(id)
        .then((foundProduct) => {
          setProduct(foundProduct); // Set the product
          console.log("PRODUCT FOUND: ", foundProduct);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setProduct(null); // Handle errors by setting null
        });
    }
  }, [id]);

  if (!product) return <p>Producto no encontrado</p>;

  const openModal = (index) => {
    setInitialIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="container mx-auto my-10 lg:w-2/3 p-6 bg-white rounded-lg shadow-lg ">
      <div className="flex flex-col md:flex-row justify-center">
        <div className="flex flex-shrink-0 mb-4 md:mb-0 md:mr-4">
          <Image
            src={product.photos.length ? product.photos[0].url : ""}
            alt={product.name}
            width={800}
            height={600}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        {product.photos && product.photos.length > 0 && (
          <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 justify-between md:space-y-2">
            {product.photos.map((thumb) => (
              <Image
                key={thumb.id}
                src={thumb.url}
                alt={`Thumbnail ${thumb.id}`}
                width={100}
                height={100}
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-28 lg:h-28  rounded-md object-cover cursor-pointer hover:ring-2 hover:ring-primary"
                onClick={() => openModal(thumb.id)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="text-center mb-5 mt-5">
        <h1 className="text-2xl font-bold">{product.name}</h1>
      </div>

      <div className="flex justify-between items-center mb-4 p-2 border-y border-primary-light">
        <div className="flex flex-col gap-4">
          {" "}
          {/* Increase gap for consistent spacing */}
          {/* Price */}
          <div className="flex items-center gap-2">
            {" "}
            {/* Flex row with consistent gap */}
            <DollarSignIcon className="text-gray-500" />
            <p className="text-gray-700">
              <strong>{product.price} USD</strong> por hora
            </p>
          </div>
          {/* Brand */}
          <div className="flex items-center gap-2">
            {" "}
            {/* Flex row with consistent gap */}
            <CrownIcon className="text-gray-500" />
            <p className="text-gray-500">Marca: {product.brand}</p>
          </div>
          {/* Status */}
          <div className="flex items-center gap-2">
            {" "}
            {/* Flex row with consistent gap */}
            {product.status ? (
              <>
                <Check className="text-green-500" /> {/* Adjust icon size/color if needed */}
                <span className="text-[var(--color-active)] font-bold">Disponible</span>
              </>
            ) : (
              <>
                <XIcon className="text-red-600" /> {/* Replace this with your preferred "x" icon */}
                <span className="text-red-600 font-bold">No disponible</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Descripción */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Descripción</h2>
        <p className="text-gray-700">{product.description}</p>
        {/* <a href="#" className="text-blue-600" onClick={() => openModal(0)}>
          Ver más
        </a> */}
      </div>

      <div className="flex justify-center items-center mb-4 p-2">
        <div className="flex flex-col gap-2">
          <a href="#" className="text-yellow-600 mr-12 underline" onClick={() => openModal(0)}>
            Ver más
          </a>
        </div>
        <button
          className={`py-4 px-24 rounded-full ml-12 font-normal ${
            product.status
              ? "bg-yellow-500 text-black hover:bg-yellow-600"
              : "bg-gray-300 text-gray-600 cursor-not-allowed"
          }`}
          disabled={!product.status}
        >
          {product.status ? "Reservar" : "No disponible"}
        </button>
      </div>

      <GalleryModal images={product.photos} isOpen={isModalOpen} onClose={closeModal} initialIndex={initialIndex} />
    </div>
  );
};

export default ProductDetails;
