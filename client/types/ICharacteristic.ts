export interface ICharacteristicRes {
  id: number;
  description: string;
  type: number;
}
export type ICharacteristicReq = Omit<ICharacteristicRes, 'id'>