import { ICategoryRes } from "./ICategory";
import { IProductParam } from "./IProduct";

export interface ICatalogSidebarProps {
  categories : ICategoryRes[],
  sendFilters:(filters:IProductParam)=>void
}