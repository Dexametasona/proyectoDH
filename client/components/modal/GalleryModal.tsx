import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GalleryModalProps } from '@/types';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

const GalleryModal: React.FC<GalleryModalProps> = ({
   images, 
   isOpen, 
   onClose, 
   initialIndex}) => {
    
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
    }
  }, [isOpen, initialIndex]);
  
  if (!isOpen) return null;

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center">
      <div className="relative w-11/12 md:w-3/4 lg:w-2/3 xl:w-1/2 h-auto bg-[var(--primary)] p-4 rounded-lg">
        {/* Botón de Cerrar */}
        <button
          className="absolute top-2 right-2 text-white text-3xl"
          onClick={onClose}
        >
          <X color="#ffffff" />
        </button>

        {/* Imagen Principal */}
        <Image
          src={images[currentIndex].url}
          alt="gallery image"
          width={800}
          height={600}
          className="rounded-lg object-contain w-full h-auto max-h-[80vh]"
        />

        {/* Controles de Navegación */}
        <button
          className="absolute top-1/2 left-1 transform -translate-y-1/2 text-white text-3xl"
          onClick={handlePrevious}
        >
          <ChevronLeft  color="#ffffff" />
        </button>
        <button
          className="absolute top-1/2 right-1  transform -translate-y-1/2 text-white text-3xl"
          onClick={handleNext}
        >
          <ChevronRight color="#ffffff" />
        </button>
      </div>
    </div>
  );
};

export default GalleryModal;
