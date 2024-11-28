import React from "react";

import CategoryContainer from "@/components/CategoriesContainer";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/SearchBar";
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
      />
      <RecommendationsContainer
        name={"Recomendaciones"}
        gap="4"
      />
    </>
  );
};

export default page;
