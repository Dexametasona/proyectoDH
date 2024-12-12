"use client";

import Dashboard from "@/components/admin/dashboard/Dashboard";
import isAdminGuard from "@/guards/adminGuard";


const Page = () => {

  return (
    <div className="admin_container">
      <Dashboard></Dashboard>
    </div>
  );
};

export default isAdminGuard(Page) ;
