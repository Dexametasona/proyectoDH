import { CardsContainerProps } from "@/types";
import React from "react";
import ProductsCards from "./ProductsCards";

const CardsContainer = ({
  title,
  cards,
  verticalColumnMobile,
  gap,
}: CardsContainerProps) => {
  return (
    <section className="flex flex-col gap-4 px-6 mt-12">
      <p className="text-primary text-2xl"> {title} </p>
      <div
        className={`flex gap-${gap} ${
          verticalColumnMobile ? "flex-col" : "flex-row"
        } sm:flex-row`}
      >
        {cards.map((card) => (
          <ProductsCards
            key={card.id}
            id={card.id}
            bgImage={card.bgImage}
            title={card.title}
            cardImage={card.cardImage}
            price={card.price}
            review={card.review}
          />
        ))}
      </div>
    </section>
  );
};

export default CardsContainer;
