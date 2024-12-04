import { IProductShort } from "@/types/IProduct";
import ProductCard from "./ProductCard";
import { IPagination } from "@/types/IPagination";
import CustomPagination from "../shared/CustomPagination";
const ProductList = ({
  data,
  setPagination,
}: {
  data: IPagination<IProductShort>;
  setPagination: (index: number) => void;
}) => {
  return (
    <section className="px-2">
      <p className="mb-4">
        Resultados encontrados:{" "}
        {data.content
          ? `${data.content.length} de ${data.totalElements}`
          : "Sin coincidencias"}
        .
      </p>
      <div className="products-container grid grid-cols-6 justify-items-center gap-4 mb-4">
        {data.content
          ? data.content.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))
          : null}
      </div>
      {data.content ? (
        <CustomPagination
          currentPage={data.currentPage + 1}
          totalPages={data.totalPages}
          setCurrentPage={setPagination}
        />
      ) : null}
    </section>
  );
};

export default ProductList;
