import { IPhotoRes } from "./IProduct";

export interface CardsContainerProps {
  name: string;
  verticalColumnMobile?: boolean;
  gap: string;
}
export interface Thumbnail {
  id: string;
  url: string;
}
export interface GalleryModalProps {
  // images: { id: string; url: string }[]; // Lista de imágenes con id y url
  images:IPhotoRes[]
  isOpen: boolean; // Controla si el modal está abierto o cerrado
  onClose: () => void; // Función para cerrar el modal
  initialIndex?: number; // Índice inicial de la imagen que se mostrará en el modal
}

export interface ProductCards {
  id: number;
  bgImage?: string;
  cardImage?: string;
  name: string;
  brand?: string;
  price?: number | undefined;
  status?: string;
  description?: string;
  thumbnails?: Thumbnail[];
  stock?: number;
  location?: string;
  characteristics: object[];
}

interface Category {
  id: number;
  title: string;
  description: string;
  photo_Url: string;
}

interface Tag {
  ID: number;
  name: string;
}


export interface Product {
  id: number;
  name: string;
  price: number;
  category?: Category;
  tag?: Tag;
  photoUrl: string;
}
export interface Order {
  
}
export interface ProductById {
  id: string;
  name: string;
  description?: string;
  price?: number;
  brand?: string;
  status?: string;
  category: Category;
  photos: Thumbnail[];
  orders?: Order;
}
