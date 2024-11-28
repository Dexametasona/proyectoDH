import { IPaginationParam } from "./IPagination";

export interface IProductParam extends IPaginationParam{
  tagId?: number,
  categoryIds?: number[],
  name?: string,
  brand?: string,
  priceLimitUpper?: number,
  priceLimitLower?: number,
}