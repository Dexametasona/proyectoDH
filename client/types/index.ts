export interface CardsContainerProps {
  name: string;
  cards: ProductCards[];
  verticalColumnMobile?: boolean;
  gap: string;
}
export interface Thumbnail {
  id: string;
  url: string;
}
export interface GalleryModalProps {
  images: { id: string; url: string }[]; // Lista de imágenes con id y url
  isOpen: boolean;                       // Controla si el modal está abierto o cerrado
  onClose: () => void;                   // Función para cerrar el modal
  initialIndex?: number;                 // Índice inicial de la imagen que se mostrará en el modal
}

export interface ProductCards {
  id: string;
  bgImage?: string;
  cardImage?: string;
  name: string;
  brand?: string;
  price?: number;
  description?: string;
  status?: string;
  thumbnails?: Thumbnail[];
}
