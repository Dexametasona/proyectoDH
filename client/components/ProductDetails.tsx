"use client";

import { useParams, useRouter } from "next/navigation";
import { SetStateAction, useEffect, useState } from "react";
import Image from "next/image";
import { ProductById } from "@/types";
import GalleryModal from "@/components/modal/GalleryModal";
import {
  Check,
  XIcon,
  DollarSignIcon,
  CrownIcon,
  ChevronLeft,
  TruckIcon,
  UmbrellaIcon,
  AirVent,
} from "lucide-react";
import { getProductById } from "@/lib/api_interface";
import { Button } from "./ui/button";
import { useAppContext } from "@/context/AppContext";
import BookingModal from "./ReservaModal";



const ProductDetails = () => {
  const { setResultsProductsList } = useAppContext();

  const { id } = useParams();
  const [product, setProduct] = useState<ProductById | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const router = useRouter();
  const [isReservaModalOpen, setIsReservaModalOpen] = useState(false);
  

  const handleBackHome = () => {
    setResultsProductsList([]);
    router.push("/home");
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

  const openReservaModal = () => {
    setIsReservaModalOpen(true);
  };

  const closeReservaModal = () => {
    setIsReservaModalOpen(false);
  };
  
  return (
    <section className="w-full">
      <div className="text-primary p-1 my-2 bg-white shadow-md ">
        <div className="flex rounded hover:bg-primary-light m-1 p-1 cursor-pointer">
          <ChevronLeft onClick={handleBackHome} /> Atrás
        </div>
      </div>

      <div className="container-layout mx-auto sm:mx-20 lg:mx-auto bg-white lg:bg-transparent lg:border lg:border-primary-light rounded-lg shadow-lg ">
        <div className="container-images px-2 flex flex-col items-center  md:flex-row justify-center">
          <div className="container-img-main flex grow mb-4 md:w-1/2 md:mb-0 shadow-md">
            <Image
              src={product.photos.length ? product.photos[0].url : ""}
              alt={product.name}
              width={800}
              height={800}
              className="w-full   h-auto rounded-lg object-cover"
            />
          </div>

          {product.photos && product.photos.length > 0 && (
            <div className="container-img-gallery flex gap-2 w-full justify-evenly md:w-1/2 md:grid md:grid-cols-2 md:pl-4">
              {product.photos.map((thumb) => (
                <Image
                  key={thumb.id}
                  src={thumb.url}
                  alt={`Thumbnail ${thumb.id}`}
                  width={100}
                  height={100}
                  className="min-w-16 shadow-md md:w-full lg:w-full rounded-md cursor-pointer hover:ring-2 hover:ring-primary"
                  onClick={() => openModal(thumb.id)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="characteristic-container bg-white md:m-4 md:p-4">
          <div className="text-center mb-5 mt-5 px-2">
            <h1 className="text-2xl font-bold text-primary">{product.name}</h1>
          </div>
          <div className="flex flex-col gap-4 p-2 mt-2 md:grid md:grid-cols-2 border-y border-primary-light">
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
                    <span className="text-[var(--color-active)] font-bold">
                      Disponible
                    </span>
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
            <div className="flex md:flex-col gap-4 align-items p-2 lg:flex-row">
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
          <div className="mb-4 p-2">
            <h2 className="text-xl font-semibold text-primary">Descripción</h2>
            <p>{product.description}</p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center sm:justify-evenly gap-2 items-center p-2">
            <a
              href="#"
              className="text-secondary underline"
              onClick={() => openModal(0)}
            >
              Ver más
            </a>
            <Button className="bg-secondary w-full sm:w-60 rounded-full" onClick={openReservaModal}>Reservar</Button>
          </div>
          <GalleryModal
            images={product.photos}
            isOpen={isModalOpen}
            onClose={closeModal}
            initialIndex={initialIndex}
          />
        </div>
        {/* Modal de reserva */}
      <BookingModal isOpen={isReservaModalOpen} onClose={closeReservaModal} orders={product.orders} product={product}/>
      </div>
    </section>
  );
};

export default ProductDetails;
