import AdminMenu from "@/components/admin/AdminMenu";
import TopBar from "@/components/admin/TopBar";
import { AdminGuard } from "@/guards/AdminLayoutGuard";

const AdminLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
