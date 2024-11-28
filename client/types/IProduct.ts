import { ICategoryRes } from "./ICategory";
import { IPaginationParam } from "./IPagination";

export interface IProductParam extends IPaginationParam{
  tagId?: number,
  categoryIds?: number[],
  name?: string,
  brand?: string,
  priceLimitUpper?: number,
  priceLimitLower?: number,
}

export interface IProductRes{
  id: number,
  name: string,
  description: string,
  price: number,
  brand: string,
  status : number,
  category: ICategoryRes,
  photos: IPhotoRes[]
}

export interface IProductReq extends Omit<IProductRes, 'id' | 'status' | 'photos' | 'category'>{
  photos:File[],
  categoryId:number,
  tagId:number

}

export interface IProductShort extends Omit<IProductRes, 'description' | 'status' | 'photos'>{
  photoUrl: string
}

export interface IPhotoRes{
  id:number,
  url:string
}

export interface IProductInput{
  fieldName:string,
  onChange : (e: React.ChangeEvent<HTMLInputElement>)=>void,
  value: string,
  type?:string
  placeholder?:string
}