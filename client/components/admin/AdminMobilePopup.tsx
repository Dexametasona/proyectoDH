import { Button } from "../ui/button";

const AdminMobilePopup = ({handleBtn}:{handleBtn:()=>void}) => {
  return (
    <section className="popup-container grid place-items-center bg-black/70 fixed top-0 w-screen h-screen">
      <div className="popup bg-white p-4 rounded-md flex flex-col items-center gap-2 max-w-72 md:max-w-80">
        <h3 className="font-bold">Ingresa desde la web</h3>
        <p className="text-center">Las funciones de administrador no están disponibles en móvil.</p>
        <Button onClick={handleBtn} className="bg-secondary text-black">Entendido</Button>
      </div>
    </section>
  );
};

export default AdminMobilePopup;
