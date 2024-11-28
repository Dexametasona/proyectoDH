import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { recommendationsCards } from "@/constants";
import Image from "next/image";
import { useEffect, useState } from "react";
import AddProductForm from "./AddProductForm";
import { getAllProducts } from "@/lib/api_interface";
import { getProductById } from "@/lib/api_interface";
import { Product } from "@/types";
import { Category } from "@/types";

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productAdditionalInfo, setProductAdditionalInfo] = useState<
    Record<
      string,
      {
        description: string;
        status: string;
        category: { id: number; title: string; description: string; photo_Url: string };
      }
    >
  >({});
  const [addChange, setAddChange] = useState(false);

  const statusColors = {
    Reparación: "bg-red-100 text-red-500",
    Disponible: "bg-green-100 text-green-500",
    "En Alquiler": "bg-yellow-100 text-yellow-500",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getAllProducts();
        setProducts(fetchedProducts);

        // Fetch additional info for each product
        const additionalInfo = await Promise.all(
          fetchedProducts.map(async (product) => {
            try {
              const foundProduct = await getProductById(product.id);
              return {
                id: product.id,
                description: foundProduct.description,
                status: foundProduct.status,
                category: foundProduct.category,
              };
            } catch (error) {
              console.error("Error fetching product info:", error);
              return { id: product.id, description: "", status: "Unknown", category: "Unknown" }; // Fallback
            }
          })
        );

        // Map results into an object for quick access
        const infoMap = additionalInfo.reduce((acc, info) => {
          acc[info.id] = { description: info.description, status: info.status, category: info.category.title };
          return acc;
        }, {});
        setProductAdditionalInfo(infoMap);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleClickAdd = () => setAddChange(true);

  return (
    <section className="h-[calc(100vh-200px)] overflow-y-scroll">
      <div className="flex justify-between px-4 py-4">
        <h2 className="text-lg font-bold text-gray-800">Listado de Productos</h2>
        <Button className="bg-success" onClick={handleClickAdd}>
          Agregar
        </Button>
      </div>
      {!addChange ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>ID</TableHead>
              <TableHead>Producto</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Categoría</TableHead>
              <TableHead>Descripción</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Eliminar Producto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              const additionalInfo = productAdditionalInfo[product.id] || { description: "N/A", status: "Unknown" };
              console.log("Adittional info: ", additionalInfo);
              return (
                <TableRow key={product.id}>
                  {/* <TableCell>
                    <Checkbox />
                  </TableCell> */}
                  <TableCell>
                    <Image
                      src={product.photoUrl || "/path/to/default/image.png"}
                      width={56}
                      height={56}
                      alt="product image"
                      className="rounded-full"
                    />
                  </TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{additionalInfo.category}</TableCell>
                  <TableCell>{additionalInfo.description}</TableCell>
                  <TableCell>
                    <span className={`rounded-lg px-2 m-1 py-1 ${statusColors[additionalInfo.status]}`}>
                      {additionalInfo.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive">Eliminar</Button>
                    <Button className="bg-gray-300">Editar</Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ) : (
        <AddProductForm />
      )}
    </section>
  );
};

export default ProductList;
