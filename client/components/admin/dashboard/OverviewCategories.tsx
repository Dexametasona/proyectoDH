import { overviewCategories } from "@/constants";

const OverviewCategories = () => {
  return (
    <div className="flex gap-3 py-4 px-2">
      {overviewCategories.map((category) => (
        <div 
          key={category.label} 
          className={`flex items-center gap-2 p-3 rounded-lg bg-${category.color}-100 text-${category.color}-700 w-40`}>
          <category.icon color={category.color} size={28} />
          <p className="font-semibold"> {category.label} </p>
        </div>
      ))}
    </div>
  );
};

export default OverviewCategories;
