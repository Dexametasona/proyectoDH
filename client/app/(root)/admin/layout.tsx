"use client"
import AdminMenu from "@/components/admin/AdminMenu";
import AdminMobilePopup from "@/components/admin/AdminMobilePopup";
import TopBar from "@/components/admin/TopBar";
import { AdminGuard } from "@/guards/AdminLayoutGuard";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const router = useRouter()
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1240);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  if(isSmallScreen) return (<AdminMobilePopup handleBtn={()=>router.push('/login')}/>);

  return (
    <AdminGuard>
      <div className="admin_container min-h-screen flex flex-col">
        <TopBar />
        <div className="admin_content grow flex items-stretch">
          <AdminMenu />
          <div className="children-container grow">{children}</div>
        </div>
      </div>
    </AdminGuard>
  );
};
export default AdminLayout;
