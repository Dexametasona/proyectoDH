export interface IOrderRes {
  id: number;
  shipStart: Date;
  shipEnd: Date;
  createdAt: Date;
  shipAddress: string;
  amount: number;
  remarks: string;
  productId: number;
  userId: number;
}

export type IOrderShort = Omit<
    IOrderRes,
    "createdAt" | "shipAddress" | "amount" | "remarks" | "productId" | "userId"
  >
