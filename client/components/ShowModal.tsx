import isAuthReserve from "@/guards/authGuardReserve";
import ReservaModal from "./ReservaModal";

const ShowModal = ({ isOpen, onClose, orders, product }) => {
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
