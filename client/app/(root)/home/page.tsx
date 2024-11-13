import CardsContainer from "@/components/CardsContainer";
import Hero from "@/components/home/Hero";
import SearchBar from "@/components/SearchBar";
import { categoriesCards, recommendationsCards } from "@/constants";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <SearchBar />
      <CardsContainer
        name={"Categorías"}
        gap="4"
        verticalColumnMobile={true}
        cards={categoriesCards}
      />
      <CardsContainer
        name={"Recomendaciones"}
        gap="4"
        cards={recommendationsCards}
      />
    </>
  );
};

export default page;
