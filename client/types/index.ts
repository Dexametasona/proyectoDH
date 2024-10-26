export interface CardsContainerProps {
  title: string;
  cards: ProductCards[];
  verticalColumnMobile?: boolean;
  gap: string;
}

export interface ProductCards {
  bgImage?: string;
  cardImage?: string;
  title: string;
  price?: number;
  review?: number;
}
