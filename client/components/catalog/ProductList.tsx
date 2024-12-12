import ProductCard from "../shared/ProductCard";
import CustomPagination from "../shared/CustomPagination";
import { IProductListProps } from "@/types/IProps";
const ProductList = ({
  data,
  setPagination,
  addFavorite
}: IProductListProps) => {
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
              <ProductCard
                key={product.id}
                isFavorite={false}
                data={product}
                handleAddFavorite={() => addFavorite!(product.id)}
              />
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
