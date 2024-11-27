import { CardsContainerProps } from "@/types";
import React from "react";
import ProductsCards from "./ProductsCards";

const CategoriesContainer = ({
  name,
  cards,
  verticalColumnMobile
}: CardsContainerProps) => {
  return (
    <section className="flex flex-col gap-4 px-2 mt-12 place-content-evenly ">
      <p className="text-primary px-2 text-2xl font-bold"> {name} </p>

      <div
        className={`grid grid-cols-1 mb-4 sm:grid-cols-3 gap-4 ${
          verticalColumnMobile ? "flex-col" : "grid"
        }`}
      >
        {cards.map((card) => (
          <ProductsCards
            key={card.id}
            id={card.id}
            bgImage={card.bgImage}
            name={card.name}
            brand={card.brand}
            cardImage={card.cardImage}
            price={card.price}
            description={card.description}
            status={card.status}
            thumbnails={card.thumbnails}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesContainer;
