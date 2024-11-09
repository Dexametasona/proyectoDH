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
    name: "Saltarines",
  },
  {
    id: "2",
    bgImage: "/assets/images/product3.jpg",
    name: "Saltarines",
  },
  {
    id: "3",
    bgImage: "/assets/images/product4.jpg",
    name: "Saltarines",
  },
];

export const recommendationsCards: ProductCards[] = [
  {
    id: "4",
    cardImage: "/assets/images/product3.jpg",
    name: "Saltarín Cocodrilo",
    price: 12,
    brand: "SALTASINA",
    description: "Lorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbiLorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbi",
    status: "Disponible",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
  },
  {
    id: "5",
    cardImage: "/assets/images/product5.jpg",
    name: "Saltarín Cocodrilo",
    price: 22,
    brand: "SALTASINA",
    description: "Lorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbiLorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbi",
    status: "Disponible",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
  },
  {
    id: "6",
    cardImage: "/assets/images/product3.jpg",
    name: "Saltarín Cocodrilo",
    price: 22,
    brand: "SALTASINA",
    description: "Lorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbiLorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbi",
    status: "Disponible",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
  },
  {
    id: "7",
    cardImage: "/assets/images/product4.jpg",
    name: "Saltarín Cocodrilo",
    price: 12,
    brand: "SALTASINA",
    description: "Lorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbiLorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbi",
    status: "Disponible",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
  },
  {
    id: "8",
    cardImage: "/assets/images/product5.jpg",
    name: "Saltarín Cocodrilo",
    price: 12,
    brand: "SALTASINA",
    description: "Lorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbiLorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbi",
    status: "Disponible",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
  },
  {
    id: "9",
    cardImage: "/assets/images/product3.jpg",
    name: "Saltarín Cocodrilo",
    price: 12,
    brand: "SALTASINA",
    description: "Lorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbiLorem ipsum dolor sit amet consectetur. Ornare tincidunt adipiscing odio lorem. Morbi id adipiscing amet consequat. Purus morbi",
    status: "Disponible",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
  },
];
