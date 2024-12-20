import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import {
  deleteProduct,
  getFullProducts,
  updateProduct,
} from "@/services/productService";
import { IProductReq, IProductRes } from "@/types/IProduct";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import CustomPagination from "@/components/shared/CustomPagination";
import { IPagination } from "@/types/IPagination";
import Swal from "sweetalert2";
import { ICategoryRes } from "@/types/ICategory";
import { getAllCategories } from "@/services/categoryService";
import ProductEditModal from "./ProducEditModal";

const ProductList = () => {
  const emptyProduct: IProductRes = {
    name: "",
    description: "",
    price: 0,
    brand: "",
    category: {
      description: "",
      id: 0,
      photo_Url: "",
      title: "",
    },
    photos: [],
    orders: [],
    characteristics: [],
    id: 0,
    status: 0,
  };
  const [products, setProducts] = useState<IPagination<IProductRes> | null>(
    null
  );
  const [categories, setCategories] = useState<ICategoryRes[]>([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [productTarget, setProductTarget] = useState<IProductRes>(emptyProduct);
  const { authData } = useAuthContext();
  const router = useRouter();

  const statusColors = {
    maintenance: "bg-red-100 text-red-500",
    available: "bg-green-100 text-green-500",
  };

  const setPagination = async (index: number) => {
    try {
      if (authData === null) {
        setProducts(null);
        return;
      }
      const productsPagination = await getFullProducts(
        {
          page: index - 1,
        },
        authData
      );
      if (productsPagination?.content) {
        setProducts(productsPagination);
        return;
      }
      setProducts(null);
    } catch (error: unknown) {
      console.error(error);
      setProducts(null);
    }
  };

  const fetchProducts = useCallback(async () => {
    try {
      if (authData === null) {
        setProducts(null);
        return;
      }
      const productsPagination = await getFullProducts({}, authData);
      if (productsPagination?.content) {
        setProducts(productsPagination);
        return;
      }
      setProducts(null);
    } catch (error: unknown) {
      console.error(error);
      setProducts(null);
    }
  }, [authData]);

  useEffect(() => {
    fetchProducts();
  }, [authData, fetchProducts]);

  useEffect(() => {
    (async () => {
      try {
        const response = await getAllCategories();
        setCategories(response);
      } catch (error) {
        console.error("Error al obtener las categorias, ", error);
        setCategories([]);
      }
    })();
  }, []);

  const handleClickAdd = () => {
    router.push("/admin/addProduct");
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      const res = await Swal.fire({
        icon: "warning",
        title: "Eliminar prodcuto",
        text: "Seguro que deseas eliminar este producto?, recuerda que no puedes eliminar un producto que este en reserva.",
        showCancelButton: true,
        showConfirmButton: true,
      });
      if (res.isConfirmed) {
        await deleteProduct(authData!, id);
        Swal.fire({
          icon: "info",
          title: "Producto eliminado",
          showConfirmButton: true,
        });
        fetchProducts();
      }
    } catch (error) {
      console.error("Error al eliminar elproducto", error);
      Swal.fire({
        icon: "error",
        title: "Error al eliminar",
        showConfirmButton: true,
      });
    }
  };

  const handleUpdateProduct = async (
    productId: number,
    data: Partial<IProductReq>
  ) => {
    const formData = new FormData();
    formData.append("categoryId", data.categoryId!.toString());
    try {
      await updateProduct(authData!, formData, productId);
      setIsShowModal(false)
      fetchProducts();
    } catch (error) {
      throw error;
    }
  };

  const handleShowModal = (target: IProductRes) => {
    setIsShowModal(true);
    setProductTarget(target);
  };

  return (
    <section className=" bg-white py-4">
      <div className="flex justify-between px-4 py-4">
        <h2 className="text-lg font-bold text-gray-800">
          Listado de Productos
        </h2>
        <Button
          className="bg-success hover:opacity-70 transition-all ease-in-out duration-300"
          onClick={handleClickAdd}
        >
          Agregar
        </Button>
      </div>
      <div className="table-container px-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead className="py-4">ID</TableHead>
              <TableHead className="py-4">Producto</TableHead>
              <TableHead className="py-4">Precio</TableHead>
              <TableHead className="py-4">Categoría</TableHead>
              <TableHead className="py-4">Descripción</TableHead>
              <TableHead className="py-4">Estado</TableHead>
              <TableHead className="text-right">Eliminar Producto</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.content.map((product) => {
              return (
                <TableRow key={product.id} className="">
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Image
                        src={
                          product.photos.at(1)?.url ||
                          "/path/to/default/image.png"
                        }
                        width={56}
                        height={56}
                        alt="product image"
                        className="rounded-full aspect-square w-10"
                      />
                      <span>{product.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>${product.price}/día</TableCell>
                  <TableCell>{product.category.title}</TableCell>
                  <TableCell className="">{product.description}</TableCell>
                  <TableCell>
                    <span
                      className={`rounded-lg px-2 m-1 py-1 ${
                        product.status === 0
                          ? statusColors.available
                          : statusColors.maintenance
                      }`}
                    >
                      {product.status === 0 ? "Disponible" : "En mantenimiento"}
                    </span>
                  </TableCell>
                  <TableCell className="text-center min-w-40">
                    <Button
                      type="button"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="bg-black mx-1 hover:opacity-70"
                      variant="destructive"
                    >
                      <Image
                        src="/assets/icons/trash-2.png"
                        alt="trash-icon"
                        width={16}
                        height={16}
                      />
                    </Button>
                    <Button
                      className="bg-red-600 mx-1 hover:opacity-70"
                      onClick={() => handleShowModal(product)}
                    >
                      <Image
                        src="/assets/icons/edit.png"
                        alt="trash-icon"
                        width={16}
                        height={16}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {products ? (
          <CustomPagination
            currentPage={products.currentPage + 1}
            setCurrentPage={(num) => setPagination(num)}
            totalPages={products.totalPages}
          />
        ) : (
          <></>
        )}
      </div>
      {isShowModal ? (
        <ProductEditModal
          updateProduct={handleUpdateProduct}
          categories={categories}
          product={productTarget}
          showModal={setIsShowModal}
        />
      ) : null}
    </section>
  );
};

export default ProductList;
