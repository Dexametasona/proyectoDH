import { ICategoryRes } from "./ICategory";
import { ICharacteristicRes } from "./ICharacteristic";
import { IOrderShort } from "./IOrder";
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
  photos: IPhotoRes[],
  characteristics:ICharacteristicRes[],
  orders:IOrderShort[]
}

export interface IProductReq extends Omit<IProductRes, 'id' | 'status' | 'photos' | 'category'| 'characteristics' >{
  photos:File[],
  categoryId:number,
  tagId:number
  characteristic:number[]
}

export interface IProductShort extends Omit<IProductRes, 'description' | 'status' | 'photos' | 'characteristics'>{
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