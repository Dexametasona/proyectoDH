"use client";

import ProductCard from "@/components/shared/ProductCard";
import { useAuthContext } from "@/context/AuthContext";
import AuthGuard from "@/guards/AuthLayoutGuard";
import {
  getAllFavoritesByUser,
  removeFavorite,
} from "@/services/favoriteService";
import { IFavoriteRes } from "@/types/IFavorite";
import { IProductShort } from "@/types/IProduct";
import { useEffect, useState } from "react";

const Page = () => {
  const [products, setProducts] = useState<IProductShort[]>([]);
  const { authData, loading } = useAuthContext();

  const productToFavorite: (data: IFavoriteRes) => IProductShort = ({
    category,
    photoUrl,
    productId,
    productName,
    productPrice,
  }: IFavoriteRes) => {
    return {
      brand: "",
      category: {
        description: "",
        id: 0,
        photo_Url: "",
        title: category,
      },
      photoUrl,
      id: productId,
      name: productName,
      price: productPrice,
    };
  };

  useEffect(() => {
    (async () => {
      if (!loading && authData) {
        const response = await getAllFavoritesByUser(authData!);
        const newProduct: IProductShort[] = response.map(productToFavorite);
        setProducts(newProduct);
      }
    })();
  }, [authData, loading]);

  const handleRemoveFavorite = async (productId: number) => {
    if (authData === null) return [];
    if (loading) return [];
    const response = await removeFavorite(authData, productId);
    const newProduct = response.map(productToFavorite);
    setProducts(newProduct);
  };

  return (
    <AuthGuard>
      <section className="min-h-[calc(100vh-176px)] basis-full">
        <h2 className="title text-center my-8 text-2xl text-primary font-bold">
          Favoritos
        </h2>
        <div className="favorites-container grid grid-cols-6 px-2 gap-4 pb-4 justify-items-center">
          {products ? (
            products.map((product) => (
              <ProductCard
                key={product.id}
                data={product}
                isFavorite={true}
                handleRemoveFavorite={() => handleRemoveFavorite(product.id)}
              />
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
