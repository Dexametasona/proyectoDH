import ModalOverlay from "@/components/shared/ModalOverlay";
import { Button } from "@/components/ui/button";
import { ICategoryRes } from "@/types/ICategory";
import { IProductReq, IProductRes } from "@/types/IProduct";
import { CircleX } from "lucide-react";
import { useState } from "react";

const ProductEditModal = ({
  categories,
  product,
  showModal,
  updateProduct,
}: {
  categories: ICategoryRes[];
  product: IProductRes;
  showModal: (isShow: boolean) => void;
  updateProduct: (
    productId: number,
    data: Partial<IProductReq>
  ) => Promise<void>;
}) => {
  const [newCategoryId, setNewCategory] = useState(product.category.id);

  return (
    <ModalOverlay>
      <form className="bg-disabled p-4 rounded-md flex flex-col gap-2 relative">
        <h3 className="text-xl font-bold text-primary text-center mb-4">
          Categorías
        </h3>
        {categories.length > 0 ? (
          <select
            onChange={(e) => setNewCategory(Number(e.target.value))}
            className="border-2 rounded-sm outline-none px-4 py-2"
          >
            {categories.map(({ id, title }) => (
              <option selected={id === product.category.id} key={id} value={id}>
                {title}
              </option>
            ))}
          </select>
        ) : null}
        <Button
          type="submit"
          className="transition-default hover:opacity-70"
          onClick={() =>
            updateProduct(product.id, { categoryId: newCategoryId })
          }
        >
          Actualizar
        </Button>
        <Button
          className="absolute top-2 right-2 transition-default hover:opacity-70"
          type="button"
          onClick={() => showModal(false)}
        >
          <CircleX />
        </Button>
      </form>
    </ModalOverlay>
  );
};

export default ProductEditModal;
