import AdminMenu from "@/components/admin/AdminMenu";
import TopBar from "@/components/admin/TopBar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="admin_container min-h-screen flex flex-col">
      <TopBar />
      <div className="admin_content grow flex items-stretch">
        <AdminMenu />
        <div className="children-container grow">
          {children}
        </div>
      </div>
    </div>
  );
}
