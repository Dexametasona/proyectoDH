"use client";

import { useParams, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { recommendationsCards } from "@/constants";
import { ProductCards, ProductById } from "@/types";
import GalleryModal from "@/components/modal/GalleryModal";
import { Check, XIcon, DollarSignIcon, CrownIcon, ChevronLeft, TruckIcon, UmbrellaIcon, AirVent } from "lucide-react";
import { getProductById } from "@/lib/api_interface";
import { Button } from "./ui/button";


const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductById | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const router = useRouter();

  const handleBackHome = () => {
    router.push("/home"); // Redirige al inicio
  };
  useEffect(() => {
    if (id) {
      getProductById(id)
        .then((foundProduct) => {
          setProduct(foundProduct);
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setProduct(null);
        });
    }
  }, [id]);

  if (!product) return <p>Producto no encontrado</p>;

  const openModal = (index: string | SetStateAction<number>) => {
    setInitialIndex(index as number);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  return (

    <section className="justify-self-start">
      <div className="text-primary p-1 my-2 bg-white shadow-md ">
        <div className="flex rounded hover:bg-primary-light m-1 p-1">
          <ChevronLeft onClick={handleBackHome} /> Atrás
        </div>
      </div>

      <div className="container-layout mx-auto lg:max-w-6xl sm:mx-20 lg:mx-auto bg-white lg:border lg:border-primary-light rounded-lg shadow-lg ">
        <div className="container-images items-center px-2 flex flex-col  md:flex-row justify-center">
          <div className="container-img-main flex grow mb-4 md:mb-0 md:mr-4 md:h-96 md:w-96">
            <Image
              src={product.photos.length ? product.photos[0].url : ""}
              alt={product.name}
              width={800}
              height={800}
              className="w-full grow h-auto rounded-lg object-contain"
            />
          </div>

          {product.photos && product.photos.length > 0 && (
            <div className="container-img-gallery flex gap-2 grow justify-evenly lg:grid lg:grid-cols-2">
              {product.photos.map((thumb) => (
                <Image
                  key={thumb.id}
                  src={thumb.url}
                  alt={`Thumbnail ${thumb.id}`}
                  width={100}
                  height={100}
                  className="min-w-16  lg:w-full self-stretch rounded-md object-cover cursor-pointer hover:ring-2 hover:ring-primary"
                  onClick={() => openModal(thumb.id)}
                />
              ))}
            </div>
          )}

        </div>

        <div className="text-center mb-5 mt-5">
          <h1 className="text-2xl font-bold text-primary">{product.name}</h1>
        </div>

        <div className="flex flex-col gap-4 md:grid md:grid-cols-2  p-4 border-y border-primary-light">
          <div className="flex flex-col gap-2 mb-2">
            <div className="flex items-center gap-2">
              <DollarSignIcon className="text-grey-subtext" />
              <p>
                <strong>{product.price} USD</strong> por hora
              </p>
            </div>
            {/* Brand */}
            <div className="flex items-center gap-2">
              <CrownIcon className="text-grey-subtext" />
              <p>Marca: {product.brand}</p>
            </div>
            {/* Status */}
            <div className="flex items-center gap-2">
              {product.status ? (
                <>
                  <Check className="text-success" />
                  <span className="text-[var(--color-active)] font-bold">Disponible</span>
                </>
              ) : (
                <>
                  <XIcon className="text-error" />
                  <span className="text-error font-bold">No disponible</span>
                </>
              )}
            </div>
          </div>
          {/* Características solo visual */}
          <div className="flex md:flex-col gap-4 align-items lg:flex-row">
            <div className="flex content-center flex-wrap gap-2">
              <TruckIcon className="text-primary" /> Incluye transporte
            </div>
            <div className="flex flex-wrap content-center gap-2">
              <AirVent className="text-primary" /> Incluye inflador
            </div>
            <div className="flex flex-wrap content-center gap-2">
              <UmbrellaIcon className="text-primary" /> Impermeable
            </div>
          </div>

        </div>

        {/* Descripción */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-primary">Descripción</h2>
          <p>{product.description}</p>
        </div>

        <div className="flex justify-center items-center mb-4 p-2">
          <div className="flex flex-col gap-2">
            <a href="#" className="text-secondary mr-12 underline" onClick={() => openModal(0)}>
              Ver más
            </a>
          </div>
          <Button className="bg-secondary">Reservar</Button>
        </div>
        <GalleryModal images={product.photos} isOpen={isModalOpen} onClose={closeModal} initialIndex={initialIndex} />
      </div>
    </section>
  );
};

export default ProductDetails;
