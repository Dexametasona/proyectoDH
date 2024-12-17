export interface IReviewRes {
  id: number;
  comment: string;
  score: number;
  author_id: number;
  product_id: number;
  date: string;
}
export interface IReviewReq extends Omit<IReviewRes, 'id' | 'author_id' | 'date' | 'product_id'>{
  order_id:number
}