import { ICategoryRes } from "./ICategory";
import { IPagination } from "./IPagination";
import { IProductParam, IProductShort } from "./IProduct";

export interface ICatalogSidebarProps {
  categories: ICategoryRes[];
  sendFilters: (filters: IProductParam) => void;
}

export interface IProductCardProps {
  data: IProductShort;
  isFavorite: boolean;
  handleAddFavorite?: () => void;
  handleRemoveFavorite?: () => void;
}

export interface IProductListProps {
  data: IPagination<IProductShort>;
  setPagination: (index: number) => void;
  addFavorite?: (id: number) => void;
  removeFavorite?: (id: number) => void;
}
