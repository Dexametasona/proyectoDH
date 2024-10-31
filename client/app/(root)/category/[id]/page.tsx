"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { categoriesCards } from "@/constants";
import { ProductCards } from "@/types";

const CategoryPage = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<ProductCards | null>(null);

  console.log(id);

  useEffect(() => {
    if (id) {
      const foundCategory = categoriesCards.find(
        (category) => category.id === id,
      );
      setCategory(foundCategory || null);
    }
  }, [id]);

  if (!category) return <p>Categoría no encontrado</p>;

  return (
    <div>
      <h1>Detalles de la categoría</h1>
      <p>titulo: {category.title}</p>
    </div>
  );
};

export default CategoryPage;
