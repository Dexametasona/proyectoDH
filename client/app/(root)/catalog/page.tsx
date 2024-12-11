"use client";

import CatalogoSidebar from "@/components/catalog/CatalogSidebar";
import ProductList from "@/components/catalog/ProductList";
import SearchParamComponent from "@/components/catalog/SearchParamComponent";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useAuthContext } from "@/context/AuthContext";
import { showGuardAuthAlert } from "@/lib/utils";
import { getAllCategories } from "@/services/categoryService";
import { addFavorite } from "@/services/favoriteService";
import { getAllProducts } from "@/services/productService";
import { IApiRes } from "@/types/IApiRes";
import { ICategoryRes } from "@/types/ICategory";
import { IFavoriteRes } from "@/types/IFavorite";
import { IPagination } from "@/types/IPagination";
import { IProductParam, IProductShort } from "@/types/IProduct";
import { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const paginationEmpty: IPagination<IProductShort> = {
  content: [],
  currentPage: 0,
  isFirst: true,
  isLast: true,
  pageSize: 0,
  totalElements: 0,
  totalPages: 0,
};

const Page = () => {
  const router = useRouter();
  const [categories, setCategories] = useState<ICategoryRes[]>([]);
  const [products, setProducts] =
    useState<IPagination<IProductShort>>(paginationEmpty);
  const { authData, loading } = useAuthContext();

  const handleParamsChange = useCallback(async (params: Record<string, string>) => {
    const response = await getAllProducts({ ...params, size: 10 });
    setProducts(response ?? paginationEmpty);
  }, [])

  // useEffect(() => {
  //   const params = Object.fromEntries(searchParams.entries()) as IProductParam;
  //   (async () => {
  //     const response = await getAllProducts({ ...params, size: 10 });
  //     setProducts(response ?? paginationEmpty);
  //   })();
  // }, [searchParams]);

  useEffect(() => {
    (async () => {
      const response = await getAllCategories();
      setCategories(response);
    })();
  }, []);

  const searchWithFilters = (filters: IProductParam) => {
    const params = new URLSearchParams();
    if (filters.categoryIds && filters.categoryIds.length > 0)
      params.set("categoryIds", filters.categoryIds.join(","));
    if (filters.name) params.set("name", filters.name);

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const setPagination = (page: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", (page - 1).toString());
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  const handleAddFavorites = async (productId: number) => {
    if (loading) return [];
    if (!authData) {
      showGuardAuthAlert({ success: () => router.push("/login") });
      const emptyResponse: IFavoriteRes[] = [];
      return emptyResponse;
    }
    try {
      await addFavorite(authData, productId);
      Swal.fire({
        title: "Guardado con Éxito",
        text: "Producto marcado como favorito exitosamente.",
        confirmButtonText: "Aceptar",
        icon: "success",
        customClass: {
          confirmButton: "bg-[#008000] px-40",
          title: "text-[#008000]",
          htmlContainer: "text-red-500",
        },
      });
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const apiError = error.response.data as IApiRes<unknown>;
        if (apiError.message === "The product is already in your favorites.") {
          Swal.fire({
            text: "Este producto ya esta marcado como favorito.",
            confirmButtonText: "Aceptar",
            icon: "warning",
            customClass: {
              confirmButton: "bg-[#008000] px-40",
              title: "text-[#008000]",
              htmlContainer: "text-red-500",
            },
          });
        }
        return;
      }
      console.error("Error al marcar como favorito: ", error);
      Swal.fire({
        title: "Error",
        text: "Error interno",
        confirmButtonText: "Aceptar",
        icon: "error",
        customClass: {
          confirmButton: "bg-[#008000] px-40",
          title: "text-[#008000]",
          htmlContainer: "text-red-500",
        },
      });
    }
  };

  return (
    <Suspense fallback={<div>cargando ...</div>}>
      <SearchParamComponent onParamsChange={handleParamsChange}/>
      <SidebarProvider>
        <CatalogoSidebar
          categories={categories}
          sendFilters={searchWithFilters}
        />
        <div className="min-h-[calc(100vh-176px)] basis-full">
          <h2 className="text-xl mt-4 font-bold text-center ">Catálogo</h2>
          <SidebarTrigger className="mb-4" />
          <ProductList
            setPagination={setPagination}
            data={products}
            addFavorite={handleAddFavorites}
          />
        </div>
      </SidebarProvider>
    </Suspense>
  );
};
export default Page;
