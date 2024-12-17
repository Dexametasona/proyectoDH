export interface IOrderRes {
  id: number;
  shipStart: string;
  shipEnd: string;
  createdAt: string;
  shipAddress: string;
  amount: number;
  remarks: string;
  productId: number;
  productName:string;
  productPhotoUrl:string;
  userId: number;
}

export type IOrderShort = Omit<
    IOrderRes,
    "createdAt" | "shipAddress" | "amount" | "remarks" | "productId" | "userId"
  >
