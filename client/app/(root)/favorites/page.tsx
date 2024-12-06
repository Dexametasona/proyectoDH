"use client";

import ProductCard from "@/components/catalog/ProductCard";
import { useAuthContext } from "@/context/AuthContext";
import AuthGuard from "@/guards/AuthLayoutGuard";
import { getAllFavoritesByUser } from "@/services/favoriteService";
import { IProductShort } from "@/types/IProduct";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState<IProductShort[]>([]);
  const { authData, loading } = useAuthContext();

  useEffect(() => {
    (async () => {
      if (!loading && authData) {
        const response = await getAllFavoritesByUser(authData!);
        setProducts(response);
      }
    })();
  }, [authData, loading]);

  return (
    <AuthGuard>
      <section className="min-h-[calc(100vh-176px)] basis-full">
        <h2 className="title text-center my-4 text-xl text-primary font-bold">
          Favoritos
        </h2>
        <div className="favorites-container flex flex-col">
          {products ? (
            products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))
          ) : (
            <p>Aun no tienes favoritos.</p>
          )}
        </div>
      </section>
    </AuthGuard>
  );
};

export default Page;
