import React from "react";
import Transactions from "./Transactions";
import DashboardOverview from "./DashboardOverview";

const Dashboard = () => {
  return (
    <section className="flex w-full">
      <DashboardOverview />
      <Transactions />
    </section>
  );
};

export default Dashboard;
