"use client";

import { CardsContainerProps } from "@/types";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import { ICategoryRes } from "@/types/ICategory";
import { getAllCategories } from "@/services/categoryService";

const CategoriesContainer = ({
  name,
  verticalColumnMobile,
}: CardsContainerProps) => {
  const [categories, setCategories] = useState<ICategoryRes[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getAllCategories();
      setCategories(fetchedCategories);
    };

    fetchCategories();
  }, []);

  return (
    <section className="flex flex-col gap-4 px-2 mt-12 place-content-evenly ">
      <p className="text-primary px-2 text-2xl font-bold"> {name} </p>

      <div
        className={`grid grid-cols-1 mb-4 sm:grid-cols-3 gap-4 ${
          verticalColumnMobile ? "flex-col" : "grid"
        }`}
      >
        {categories.map((category) => (
          <CategoryCard {...category} key={category.id} />
        ))}
      </div>
    </section>
  );
};

export default CategoriesContainer;
