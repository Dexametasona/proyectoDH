import { ProductCards } from "@/types";
import {
  Instagram,
  Youtube,
  Facebook,
  LayoutDashboard,
  LayoutList,
  FolderClosed,
} from "lucide-react";

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
    stock: 4,
    description:
      "Pintores 10, Morelos, Venustiano Carranza, 15270 Ciudad de México, CDMX",
    status:  "Disponible",
    location: "Bodega 1",
  },
  {
    id: "5",
    cardImage: "/assets/images/product5.jpg",
    name: "Saltarín Cocodrilo",
    price: 22,
    brand: "SALTASINA",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
    stock: 6,
    description:
      "Calle Reforma 20, Centro, Cuauhtémoc, 06000 Ciudad de México, CDMX",
    status: "Disponible",
    location: "Bodega 2",
  },
  {
    id: "6",
    cardImage: "/assets/images/product3.jpg",
    name: "Saltarín Cocodrilo",
    price: 22,
    brand: "SALTASINA",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
    stock: 2,
    description:
      "Insurgentes Sur 300, Roma Sur, Cuauhtémoc, 06760 Ciudad de México, CDMX",
    status:  "Disponible",
    location: "Bodega 3",
  },
  {
    id: "7",
    cardImage: "/assets/images/product4.jpg",
    name: "Saltarín Cocodrilo",
    price: 12,
    brand: "SALTASINA",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
    stock: 5,
    description:
      "Eje Central 150, Doctores, Cuauhtémoc, 06720 Ciudad de México, CDMX",
    status:  "Disponible",
    location: "Bodega 1",
  },
  {
    id: "8",
    cardImage: "/assets/images/product5.jpg",
    name: "Saltarín Cocodrilo",
    price: 12,
    brand: "SALTASINA",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ],
    stock: 3,
    status:  "Disponible",
    description:
      "Avenida Universidad 250, Copilco, Coyoacán, 04360 Ciudad de México, CDMX",
    location: "Bodega 2",
  },
  {
    id: "9",
    cardImage: "/assets/images/product3.jpg",
    name: "Saltarín Cocodrilo",
    price: 12,
    brand: "SALTASINA",
    thumbnails: [
      { id: "1", url: "/assets/images/thumb1.jpg" },
      { id: "2", url: "/assets/images/thumb2.jpg" },
      { id: "3", url: "/assets/images/thumb3.jpg" },
      { id: "4", url: "/assets/images/thumb4.jpg" },
    ], 
    stock: 1,
    status: "Disponible",
    description:
      "Periférico Sur 500, Pedregal, Álvaro Obregón, 01900 Ciudad de México, CDMX",
    location: "Bodega 3",
  },
];

export const adminMenuOptions = [
  {
    id: 1,
    label: "Dashboard",
    link: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    id: 2,
    label: "Lista de Productos",
    link: "/admin/product-list",
    icon: LayoutList,
  },
];

export const transactions = [
  {
    name: "Gimena Carcía",
    image: "https://picsum.photos/200/300",
    orders: 5,
    total: 32,
  },
  {
    name: "Carlos Méndez",
    image: "https://picsum.photos/201/301",
    orders: 8,
    total: 45,
  },
  {
    name: "Laura Sánchez",
    image: "https://picsum.photos/202/302",
    orders: 3,
    total: 18,
  },
  {
    name: "José López",
    image: "https://picsum.photos/203/303",
    orders: 6,
    total: 27,
  },
  {
    name: "Ana Rodríguez",
    image: "https://picsum.photos/204/304",
    orders: 4,
    total: 22,
  },
  {
    name: "Felipe Martínez",
    image: "https://picsum.photos/205/305",
    orders: 10,
    total: 60,
  },
  {
    name: "Gimena Carcía",
    image: "https://picsum.photos/200/300",
    orders: 5,
    total: 32,
  },
  {
    name: "Carlos Méndez",
    image: "https://picsum.photos/201/301",
    orders: 8,
    total: 45,
  },
  {
    name: "Laura Sánchez",
    image: "https://picsum.photos/202/302",
    orders: 3,
    total: 18,
  },
  {
    name: "José López",
    image: "https://picsum.photos/203/303",
    orders: 6,
    total: 27,
  },
  {
    name: "Ana Rodríguez",
    image: "https://picsum.photos/204/304",
    orders: 4,
    total: 22,
  },
  {
    name: "Felipe Martínez",
    image: "https://picsum.photos/205/305",
    orders: 10,
    total: 60,
  },
];

export const overviewCategories = [
  {
    icon: FolderClosed,
    label: "Ordenes Totales",
    link: "",
    color: "blue",
  },
  {
    icon: FolderClosed,
    label: "Ingresos Totales",
    link: "",
    color: "red",
  },
  {
    icon: FolderClosed,
    label: "Servicios",
    link: "",
    color: "yellow",
  },
];
