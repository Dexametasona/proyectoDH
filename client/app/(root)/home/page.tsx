import CardsContainer from "@/components/CardsContainer";
import Hero from "@/components/home/Hero";
import { categoriesCards, recommendationsCards } from "@/constants";
import React from "react";

const page = () => {
  return (
    <>
      <Hero />
      <CardsContainer
        title={"Categorías"}
        gap="4"
        verticalColumnMobile={true}
        cards={categoriesCards}
      />
      <CardsContainer
        title={"Recomendaciones"}
        gap="6"
        cards={recommendationsCards}
      />
    </>
  );
};

export default page;
