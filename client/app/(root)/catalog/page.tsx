"use client";

import CatalogoSidebar from "@/components/catalog/CatalogSidebar";
import ProductList from "@/components/catalog/ProductList";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAllCategories } from "@/services/categoryService";
import { getAllProducts } from "@/services/productService";
import { ICategoryRes } from "@/types/ICategory";
import { IPagination } from "@/types/IPagination";
import { IProductParam, IProductShort } from "@/types/IProduct";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const [categories, setCategories] = useState<ICategoryRes[]>([]);
  const [products, setProducts] =
    useState<IPagination<IProductShort>>(paginationEmpty);

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries()) as IProductParam;
    (async () => {
      const response = await getAllProducts({ ...params, size: 10 });
      setProducts(response ?? paginationEmpty);
    })();
  }, [searchParams]);

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
    params.set('page',(page-1).toString())
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl);
  };

  return (
    <SidebarProvider>
      <CatalogoSidebar
        categories={categories}
        sendFilters={searchWithFilters}
      />
      <div className="min-h-[calc(100vh-176px)] basis-full">
        <h2 className="text-xl mt-4 font-bold text-center ">Catálogo</h2>
        <SidebarTrigger className="mb-4" />
        <ProductList setPagination={setPagination} data={products} />
      </div>
    </SidebarProvider>
  );
};
export default Page;
