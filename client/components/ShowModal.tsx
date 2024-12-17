import isAuthReserve from "@/guards/authGuardReserve";
import ReservaModal from "./ReservaModal";
import { IOrderRes, IOrderShort } from "@/types/IOrder";
import { IProductRes } from "@/types/IProduct";

export interface ShowModalProps {
  isOpen:boolean,
  onClose: ()=>void,
  orders: IOrderShort[],
  product: IProductRes
}

const ShowModal = ({ isOpen, onClose, orders, product }: ShowModalProps) => {
  if (!isOpen) return null;

  
  const GuardedReservaModal = isAuthReserve(ReservaModal);

  return (
    <GuardedReservaModal
      isOpen={isOpen}
      onClose={onClose}
      orders={orders}
      product={product}
    />
  );
};

export default ShowModal;
