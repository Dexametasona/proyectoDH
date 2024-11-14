export interface CardsContainerProps {
  title: string;
  cards: ProductCards[];
  verticalColumnMobile?: boolean;
  gap: string;
}

export interface ProductCards {
  id: string;
  bgImage?: string;
  cardImage?: string;
  title: string;
  price?: number;
  review?: number;
  stock?: number;
  description?: string;
  state?: string;
  location?: string;
}
