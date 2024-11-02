import { ProductCards } from "@/types";
import { Instagram, Youtube, Facebook } from "lucide-react";

export const navbarOptions = [
  {
    name: "Inicio",
    link: "/home",
  },
  {
    name: "Catálogo",
    link: "/catalog",
  },
  {
    name: "Eventos",
    link: "/events",
  },
  {
    name: "Contacto",
    link: "/contact",
  },
];

export const socialMedia = [
  {
    name: "Instagram",
    icon: Instagram,
  },
  {
    name: "Youtube",
    icon: Youtube,
  },
  {
    name: "Facebook",
    icon: Facebook,
  },
];

export const categoriesCards: ProductCards[] = [
  {
    id: "1",
    bgImage: "/assets/images/product5.jpg",
    title: "Saltarines",
  },
  {
    id: "2",
    bgImage: "/assets/images/product3.jpg",
    title: "Saltarines",
  },
  {
    id: "3",
    bgImage: "/assets/images/product4.jpg",
    title: "Saltarines",
  },
];

export const recommendationsCards: ProductCards[] = [
  {
    id: "4",
    cardImage: "/assets/images/product3.jpg",
    title: "Saltarín Cocodrilo",
    price: 12,
    review: 3.8,
  },
  {
    id: "5",
    cardImage: "/assets/images/product5.jpg",
    title: "Saltarín Cocodrilo",
    price: 22,
    review: 3.8,
  },
  {
    id: "6",
    cardImage: "/assets/images/product3.jpg",
    title: "Saltarín Cocodrilo",
    price: 22,
    review: 3.8,
  },
  {
    id: "7",
    cardImage: "/assets/images/product4.jpg",
    title: "Saltarín Cocodrilo",
    price: 12,
    review: 3.8,
  },
  {
    id: "8",
    cardImage: "/assets/images/product5.jpg",
    title: "Saltarín Cocodrilo",
    price: 12,
    review: 3.8,
  },
  {
    id: "9",
    cardImage: "/assets/images/product3.jpg",
    title: "Saltarín Cocodrilo",
    price: 12,
    review: 3.8,
  },
];
