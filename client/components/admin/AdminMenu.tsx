"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const AdminMenu = () => {
  const pathname = usePathname();
  return (
    <aside className="w-64 bg-black text-white pl-4">
      <h4 className="mb-6">Main menu</h4>
      <div className="">
        <Link
          href="/admin"
          className={`flex items-center gap-2 p-2 rounded-l-md cursor-pointer relative z-20 hover:bg-gray-700 ${
            pathname === "/admin" ? "bg-white text-primary hover:bg-white ": ""
          } `}
        >
          <Image className={`${pathname ==='/admin'?'invert':'' }`} src={"/assets/icons/dashboard-icon.png"} alt="dashboard-icon" width={16} height={16}/>
          <p> Dashboard </p>
        </Link>
        <Link
          href="/admin/users"
          className={`flex items-center gap-2 p-2 rounded-l-md cursor-pointer relative z-20 hover:bg-gray-700 ${
            pathname === "/admin/users" ? "bg-white text-primary hover:bg-white " : ""
            } `}
        >
          <Image className={`${pathname ==='/admin/users'?'invert':'' }`} src={"/assets/icons/people-icon.png"} alt="people-icon" width={16} height={16}/>
          <p> Usuarios </p>
        </Link>
        <Link
          href="/admin/products"
          className={`flex items-center gap-2 p-2 rounded-l-md cursor-pointer relative z-20 hover:bg-gray-700 ${
            pathname === "/admin/products" ? "bg-white text-primary hover:bg-white ": ""
            } `}
        >
          <Image className={`${pathname ==='/admin/products'?'invert':'' }`} src={"/assets/icons/product-icon.png"} alt="product-icon" width={16} height={16}/>
          <p> Productos</p>
        </Link>
      </div>
    </aside>
  );
};

export default AdminMenu;
