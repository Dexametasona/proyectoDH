import React from "react";
import OverviewCategories from "./OverviewCategories";

const DashboardOverview = () => {
  return (
    <div className="flex-1">
      <div>
      <h2 className="text-lg font-bold text-gray-800 px-4 py-4">Base Gameyard</h2>
      </div>
      <OverviewCategories />
    </div>
  );
};

export default DashboardOverview;
