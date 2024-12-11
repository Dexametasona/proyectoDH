import { Button } from "@/components/ui/button";
import ProductInput from "@/components/ui/ProductInput";
import { IProductReq } from "@/types/IProduct";
import React, { useEffect, useState } from "react";
import style from "./addProduct.module.css";
import Image from "next/image";
import Swal from "sweetalert2";
import { getAllCategories } from "@/services/categoryService";
import { ICategoryRes } from "@/types/ICategory";
import {
  validateProductBrand,
  validateProductDescription,
  validateProductIds,
  validateProductName,
  validateProductPhotos,
  validateProductPrice,
} from "@/lib/utils";
import { createProduct } from "@/services/productService";
import { useAuthContext } from "@/context/AuthContext";
import { isAxiosError } from "axios";
import { IApiRes } from "@/types/IApiRes";

const AddProductForm = () => {
  const emptyProduct: IProductReq = {
    name: "",
    description: "",
    price: 0,
    brand: "",
    categoryId: 1,
    tagId: 0,
    photos: [],
  };
  const { authData } = useAuthContext();
  const [product, setProduct] = useState(emptyProduct);
  const [listCategory, setListCaterogy] = useState<ICategoryRes[]>([]);
  const [validationErr, setValidationErr] = useState<string | null>(null);
  const [responseErr, setResponseErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const response = await getAllCategories();
      setListCaterogy(response);
    })();
  }, []);

  const handleNombre = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, name: e.target.value });
  };
  const handleDescripcion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, description: e.target.value });
  };
  const handlePrecio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, price: parseFloat(e.target.value) || 0 });
  };
  const handleMarca = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProduct({ ...product, brand: e.target.value });
  };
  const handleCategoria = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setProduct({ ...product, categoryId: Number(e.target.value) });
  };
  const handleImagenes = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eFiles = e.target.files;
    const validFormats = ["image/jpeg", "image/png"];

    if (eFiles && eFiles.length > 0) {
      const selectedFiles = Array.from(eFiles).filter((file) =>
        validFormats.includes(file.type)
      );
      setProduct((prevDetail) => ({
        ...prevDetail,
        photos: [...prevDetail.photos, ...selectedFiles], // Agrega las nuevas imágenes a las existentes
      }));
    }
  };
  const handleClearPhotos = () => {
    setProduct({ ...product, photos: [] });
  };

  const clearForm = () => {
    setProduct(emptyProduct);
  };
  const clearMessage = () => {
    setTimeout(() => {
      setValidationErr(null);
      setResponseErr(null);
    }, 4000);
  };

  const showSuccessMessage = () => {
    Swal.fire({
      title: "!Guardado con Éxito¡",
      text: "El producto ha sido guardado agregado al inventario exitosamente.",
      confirmButtonText: "Aceptar",
      icon: "success",
      customClass: {
        confirmButton: "bg-[#008000] px-40",
        title: "text-[#008000]",
        htmlContainer: "text-red-500",
      },
    });
  };

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateProductName(product.name)) {
      setValidationErr("El nombre debe tener entre 10 a 100 carácteres");
      clearMessage();
      return;
    }
    if (!validateProductBrand(product.brand)) {
      setValidationErr("La marca debe tener entre 10 a 100 caráctere");
      clearMessage();
      return;
    }
    if (!validateProductDescription(product.description)) {
      setValidationErr("La descripcion no puede estar vacía");
      clearMessage();
      return;
    }
    if (!validateProductIds(product.categoryId)) {
      setValidationErr("Id inválido");
      clearMessage();
      return;
    }
    if (!validateProductPhotos(product.photos)) {
      setValidationErr("Mínimo entre 4 a 8 fotos");
      clearMessage();
      return;
    }
    if (!validateProductPrice(product.price)) {
      setValidationErr("Precio inválido");
      clearMessage();
      return;
    }
    console.log("Producto enviado: ", product);
    registerProduct();
  };

  const registerProduct = async () => {
    // Crear el FormData
    const formData = new FormData();

    // Agregar los datos al FormData
    formData.append("brand", product.brand);
    formData.append("categoryId", product.categoryId.toString());
    formData.append("description", product.description);
    formData.append("name", product.name);

    product.photos.forEach((file: File) => {
      formData.append("photos", file);
    });

    formData.append("price", String(product.price));
    formData.append("tagId", "1");
    if (!authData) {
      console.error("Usuario no autenticado");
      return;
    }
    try {
      const response = await createProduct(authData, formData);
      console.log("Producto registrado: ", response);
      clearForm();
      showSuccessMessage();
    } catch (error) {
      console.error(error);

      if (isAxiosError(error) && error.response) {
        const response = error.response.data as IApiRes<unknown>;
        if (response.message === "Product: Product name is already in use") {
          setResponseErr("El nombre del producto ya existe.");
        } else {
          setResponseErr("Error interno al registrar el producto.");
        }
      } else {
        setResponseErr("Error interno al registrar el producto.");
      }
    } finally {
      clearMessage();
    }
  };

  return (
    <div className="add_product_container h-full bg-white p-4 flex flex-col gap-2">
      <div className="title-container p-6 flex justify-between">
        <h2 className="font-bold text-xl">Agregar productos</h2>
        <Button className="bg-black hover:opacity-70">Cancelar</Button>
      </div>
      <div className="subtitle-container bg-slate-100 p-4 shadow-sm">
        <h2 className="font-bold text-xl">Detalles del producto</h2>
      </div>
      <form onSubmit={handleSubmit} className="">
        <div className="info-container mb-4">
          <p className="text-disabled">
            Completa los detalles del nuevo producto y al final guarda la
            información registrada
          </p>
        </div>
        <div className={`${style.fieldBox} inputs-container mb-4`}>
          <ProductInput
            fieldName="Nombre"
            placeholder="Ej: Juego del calamar"
            onChange={handleNombre}
            value={product.name}
          />
          <ProductInput
            fieldName="Descripcion"
            placeholder="Ej: juego infantil"
            onChange={handleDescripcion}
            value={product.description}
          />
          <ProductInput
            fieldName="Marca"
            placeholder="Ej: LypSync"
            onChange={handleMarca}
            value={product.brand}
          />
          <ProductInput
            fieldName="Precio"
            type="float"
            placeholder="Ej.: $0.00"
            onChange={handlePrecio}
            value={product.price.toString()}
          />
          <div className={`${style.fieldCategory} field_category`}>
            <label htmlFor="categoria">Categoría: </label>
            <select
              id="miSelect"
              name="opciones"
              className="form-control border-2 border-disabled rounded-md p-2 opacity-70 focus:outline-primary focus:opacity-100"
              required
              value={product.categoryId} // Sincroniza el valor
              onChange={handleCategoria}
            >
              <option value="" disabled>
                Categoría...
              </option>
              {listCategory.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`${style.fieldPhoto} field_photos flex flex-col gap-4`}
          >
            <div className="photo-label-box flex gap-4 justify-between">
              <p>Imágenes: Solo jpg/png</p>
              <div className="actions flex gap-4">
                <Button
                  className="bg-black hover:opacity-70 transition-all duration-300 ease-in-out"
                  onClick={handleClearPhotos}
                >
                  Limpiar fotos
                </Button>
                {/* Anade la imagenes */}
                <label
                  className="bg-black rounded-sm px-4 py-2 text-white text-sm flex gap-2 hover:opacity-70 transition-all duration-300 ease-in-out"
                  htmlFor="fileInput"
                >
                  Subir Imagen
                  <Image
                    width={16}
                    height={16}
                    src={"/assets/icons/folder-up.png"}
                    alt="folder-icon"
                  />
                </label>
              </div>
            </div>
            <input
              className="hidden"
              type="file"
              id="fileInput"
              multiple
              onChange={handleImagenes}
            />
            <div className="field_photos_preview border-2 border-disabled rounded-md p-2 opacity-70 grow focus:outline-primary focus:opacity-100 flex items-start gap-2">
              {product.photos.map((img, index) => (
                <div key={index} className="rounded-md overflow-hidden">
                  <Image
                    className="aspect-square object-cover"
                    width={125}
                    height={100}
                    src={URL.createObjectURL(img)}
                    alt={`Imagen ${index + 1}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="error_message text-error font-semibold">
          {validationErr ? <p>{validationErr}</p> : null}
          {responseErr ? <p>{responseErr}</p> : null}
        </div>
        <div className="text-end">
          <Button
            type="submit"
            className="bg-black px-6 py-4 hover:opacity-70 transition-all duration-300 ease-in-out"
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
