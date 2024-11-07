import CardsContainer from "@/components/CardsContainer";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/SearchBar";
import { categoriesCards, recommendationsCards } from "@/constants";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <SearchBar/>
      <CardsContainer
        title={"Categorías"}
        gap="4"
        verticalColumnMobile={true}
        cards={categoriesCards}
      />
      <CardsContainer
        title={"Recomendaciones"}
        gap="4"
        cards={recommendationsCards}
      />
    </>
  );
};

export default page;
