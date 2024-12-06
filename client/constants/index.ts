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
    name: "Favoritos",
    link: "/favorites",
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
    address: "Pintores 10, Morelos, Venustiano Carranza, CDMX",
    description:
      "Este Saltarín Cocodrilo es ideal para eventos infantiles, brindando diversión segura y entretenimiento para los más pequeños. Su estructura está diseñada para soportar el uso prolongado y está fabricada con materiales resistentes y duraderos. Es ligero y fácil de transportar, lo que lo convierte en una excelente opción para cualquier tipo de celebración. El diseño de cocodrilo es colorido y atractivo, capturando la atención de los niños al instante. Perfecto para fiestas, festivales y eventos, garantiza una experiencia inolvidable y segura para los niños.",
    status: "Reparación",
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
    address: "Calle Reforma 20, Centro, Cuauhtémoc, CDMX",
    description:
      "El Saltarín Cocodrilo de la marca SALTASINA está diseñado para eventos de alto impacto, proporcionando horas de entretenimiento para los niños. Su diseño llamativo y divertido hace que sea una atracción instantánea en cualquier reunión. Fabricado con materiales de alta calidad, es resistente al uso y fácil de limpiar. Incluye detalles adicionales de seguridad para que los padres puedan estar tranquilos mientras sus hijos juegan. Perfecto para parques, fiestas privadas, o alquiler para eventos, este saltarín es una excelente inversión para empresas de entretenimiento.",
    status: "En Alquiler",
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
    address: "Insurgentes Sur 300, Roma Sur, Cuauhtémoc, CDMX",
    description:
      "Este producto es ideal para cualquier evento que necesite un toque de diversión y aventura. El Saltarín Cocodrilo tiene un diseño atractivo y está fabricado con materiales que garantizan seguridad y resistencia. Es fácil de inflar y desinflar, lo cual permite una instalación rápida y sin complicaciones. Ideal para el alquiler en eventos de empresas de entretenimiento o uso en fiestas particulares, cumple con todas las normas de seguridad para la tranquilidad de los usuarios.",
    status: "Disponible",
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
    address: "Eje Central 150, Doctores, Cuauhtémoc, CDMX",
    description:
      "El Saltarín Cocodrilo es un producto pensado para la diversión al aire libre o en eventos bajo techo. Su diseño de cocodrilo es único y llamativo, lo que lo convierte en el centro de atención en cualquier evento. Resistente al desgaste, está hecho con materiales que soportan uso continuo. Los detalles de seguridad han sido meticulosamente considerados, ofreciendo una experiencia segura para los niños. Es ligero y fácil de transportar, y puede ser usado tanto en interiores como en exteriores.",
    status: "Reparación",
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
    address: "Avenida Universidad 250, Copilco, Coyoacán, CDMX",
    description:
      "Este divertido Saltarín Cocodrilo es perfecto para fiestas y eventos. Su atractivo diseño y la facilidad con la que puede ser montado lo convierten en una opción ideal para entretenimiento infantil. Está fabricado con materiales de alta resistencia y cuenta con refuerzos de seguridad. Es ligero y fácil de mover, lo cual permite su transporte a diferentes ubicaciones. Los niños disfrutarán saltando y jugando, mientras los padres pueden confiar en la seguridad del producto.",
    status: "Disponible",
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
    address: "Periférico Sur 500, Pedregal, Álvaro Obregón, CDMX",
    description:
      "El Saltarín Cocodrilo es un inflable de alta calidad que brinda diversión sin fin. Es ideal para cualquier evento infantil gracias a su atractivo diseño y durabilidad. Está fabricado con materiales resistentes que permiten un uso prolongado. Es fácil de inflar y cuenta con medidas de seguridad, ofreciendo una experiencia divertida y segura para los niños. Este producto es una excelente opción para empresas de alquiler de entretenimiento y eventos familiares.",
    status: "Disponible",
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
  {
    id: 3,
    label: "Lista de Usuarios",
    link: "/admin/usersList",
    icon: LayoutList,
  },
];

export const transactions = [
  {
    name: "Martina Vadone",
    image: "https://picsum.photos/200/300",
    orders: 5,
    total: 32,
  },
  {
    name: "Pamela Villamil",
    image: "https://picsum.photos/201/301",
    orders: 8,
    total: 45,
  },
  {
    name: "Martina Caravatti",
    image: "https://picsum.photos/202/302",
    orders: 3,
    total: 18,
  },
  {
    name: "Valentina Bruno",
    image: "https://picsum.photos/203/303",
    orders: 6,
    total: 27,
  },
  {
    name: "Emilia Ruibal",
    image: "https://picsum.photos/204/304",
    orders: 4,
    total: 22,
  },
  {
    name: "Aldana Alvarez",
    image: "https://picsum.photos/205/305",
    orders: 10,
    total: 60,
  },
  {
    name: "Micaela Barrera",
    image: "https://picsum.photos/200/300",
    orders: 5,
    total: 32,
  },
  {
    name: "Melanie Briano",
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
