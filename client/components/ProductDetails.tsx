import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { recommendationsCards } from "@/constants";
import { ProductCards } from "@/types";
import GalleryModal from "@/components/modal/GalleryModal";
import { Check } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductCards | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);

  useEffect(() => {
    if (id) {
      const foundProduct = recommendationsCards.find(
        (recommendation) => recommendation.id === id,
      );
      setProduct(foundProduct || null);
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
            src={product.cardImage}
            alt={product.name}
            width={500}
            height={300}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>
        {product.thumbnails && product.thumbnails.length > 0 && (
          <div className="flex flex-row md:flex-col space-x-2 md:space-x-0 justify-between md:space-y-2">
            {product.thumbnails.map((thumb) => (
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
        <div className="flex flex-col gap-2">
          <p className="text-gray-700">{product.price} USD por hora</p>
          <p className="text-gray-500">Marca: {product.brand}</p>
          <div className="flex flex-row gap-2 justify-start">
            <Check color="#0eba69" />
            <span className="text-[var(--color-active)] font-bold">
              {product.status}
            </span>
          </div>
        </div>
        <button className="bg-yellow-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-yellow-600">
          Reservar
        </button>
      </div>
      {/* Descripción */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Descripción</h2>
        <p className="text-gray-700">{product.description}</p>
        <a href="#" className="text-blue-600" onClick={() => openModal(0)}>
          Ver más
        </a>
      </div>

      <GalleryModal
        images={product.thumbnails}
        isOpen={isModalOpen}
        onClose={closeModal}
        initialIndex={initialIndex}
      />
    </div>
  );
};

export default ProductDetails;
