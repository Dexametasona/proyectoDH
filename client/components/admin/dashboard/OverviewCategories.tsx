import { overviewCategories } from "@/constants";

const OverviewCategories = () => {
  return (
    <div className="flex gap-3">
      {overviewCategories.map((category) => (
        <div key={category.label} className={`bg-${category.color}-100`}>
          <category.icon color={category.color} size={24} />
          <p> {category.label} </p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCategories;
