import { Dispatch, SetStateAction } from "react";

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
  isOpen: boolean; // Controla si el modal está abierto o cerrado
  onClose: () => void; // Función para cerrar el modal
  initialIndex?: number; // Índice inicial de la imagen que se mostrará en el modal
}

export interface ProductCards {
  id: string;
  bgImage?: string;
  cardImage?: string;
  name: string;
  brand?: string;
  price?: number;
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
  category: Category;
  tag: Tag;
  photoUrl: string;
}

export interface User {
  name: string;
  image: string;
  orders: number;
  total: number;
}

export interface AuthenticateUserProps {
  email: string;
  password: string;
  setError: Dispatch<SetStateAction<string | null>>;
}

export interface RegisterUserProps {
  name: string;
  lastname: string;
  email: string;
  password: string;
  setLoading: Dispatch<SetStateAction<boolean>>;
}
