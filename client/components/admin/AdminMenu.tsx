import { useAppContext } from "@/context/AppContext";
import { adminMenuOptions } from "@/constants";

const AdminMenu = () => {
  const { handleMenuChange, adminMenuSelected } = useAppContext();
  

  return (
    <aside className="w-64 h-full bg-black text-white p-4">
      <h4 className="mb-6">Main menu</h4>
      <div className="space-y-2">
      {adminMenuOptions.map((option) => (
        <div 
          key={option.id} 
          onClick={() => handleMenuChange(option.label)}
          className={`flex items-center gap-2 p-2 rounded-md cursor-pointer ${
            adminMenuSelected === option.label ? 'bg-gray-800 text-white' : 'text-gray-400'
            } hover:bg-gray-700`}>
          <p> {option.label} </p>
        </div>
      ))}
      </div>
    </aside>
  );
};

export default AdminMenu;
