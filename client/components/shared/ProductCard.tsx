import { IProductCardProps } from "@/types/IProps";
import { SearchIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCard = ({
  data,
  handleAddFavorite,
  handleRemoveFavorite,
  isFavorite,
}: IProductCardProps) => {
  const router = useRouter();
  return (
    <div
      title="ver detalles"
      className="card-container cursor-pointer col-span-6 md:col-span-3 xl:col-span-2 relative py-4 bg-white rounded-md overflow-hidden hover:shadow-lg group max-w-[400px] w-full transition-all duration-300 ease-in-out hover:-translate-y-1"
    >
      <div className="img-container rounded-md overflow-hidden">
        <Image
          className="object-cover w-full aspect-square"
          src={data.photoUrl ?? "/assets/images/img-default.jpg"}
          alt="product-img"
          width={300}
          height={300}
        />
      </div>
      <div className="info-container pt-4 px-2">
        <h3 className="title font-bold">{data.name}</h3>
        <p className="category text-primary">{data.category.title}</p>
        <p className="price text-primary-soft font-bold tracking-wider">
          ${data.price}/día
        </p>
      </div>
      <button
        onClick={() => router.push("/product/" + data.id)}
        className="toDetail absolute top-4 right-2 bg-secondary p-2 rounded-sm hover:opacity-70 translate-x-12 group-hover:translate-x-0 transition-all duration-300 ease-in-out"
      >
        <SearchIcon />
      </button>
      <button
        onClick={isFavorite ? handleRemoveFavorite : handleAddFavorite}
        className="favorite absolute bottom-2 left-2 bg-secondary p-2 text-xs text-primary rounded-sm hover:bg-primary-soft  translate-y-12 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
      >
        {isFavorite ? "Remover de favoritos" : "Añadir a favoritos"}
      </button>
    </div>
  );
};

export default ProductCard;
