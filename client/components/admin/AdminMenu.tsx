import { useAppContext } from "@/context/AppContext";
import { adminMenuOptions } from "@/constants";

const AdminMenu = () => {
  const { handleMenuChange } = useAppContext();

  return (
    <section className="w-64 bg-red-300 h-full">
      {adminMenuOptions.map((option) => (
        <div key={option.id} onClick={() => handleMenuChange(option.label)}>
          <p> {option.label} </p>
        </div>
      ))}
    </section>
  );
};

export default AdminMenu;
