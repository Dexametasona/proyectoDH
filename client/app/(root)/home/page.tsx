import React from "react";

import CategoryContainer from "@/components/CategoriesContainer";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/SearchBar";
import { categoriesCards, recommendationsCards } from "@/constants";
import RecommendationsContainer from "@/components/RecommendationsContainer";

const page = () => {
  return (
    <>
      <Hero />
      <SearchBar />
      <CategoryContainer
        name={"Categorías"}
        gap="4"
        verticalColumnMobile={true}
        cards={categoriesCards}
      />
      <RecommendationsContainer
        name={"Recomendaciones"}
        gap="4"
        cards={recommendationsCards}
      />
    </>
  );
};

export default page;
