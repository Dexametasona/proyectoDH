import React, { useState } from "react";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
} from "../ui/sidebar";
import SearchBar from "./SearchBar";
import { ICatalogSidebarProps } from "@/types/IProps";
import { ICategoryRes } from "@/types/ICategory";

const CatalogoSidebar = ({ categories, sendFilters }: ICatalogSidebarProps) => {
  const [selectedCategories, setSelectedCategories] = useState<ICategoryRes[]>(
    []
  );

  const handleCheckbox = (
    e: React.ChangeEvent<HTMLInputElement>,
    category: ICategoryRes
  ) => {
    if (e.target.checked) {
      setSelectedCategories((prev) => [...prev, category]);
    } else {
      setSelectedCategories((prev) =>
        prev.filter((item) => item.id !== category.id)
      );
    }
  };

  return (
    <Sidebar className="md:top-20">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xl mb-2 font-bold">
            Filtros
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SearchBar
                categories={selectedCategories}
                sendFilters={sendFilters}
              />
              {categories.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton asChild>
                    <div>
                      <input
                        id={item.title}
                        type="checkbox"
                        onChange={(e) => handleCheckbox(e, item)}
                        checked={selectedCategories.some(
                          (cat) => cat.id === item.id
                        )}
                      />
                      <label htmlFor={item.title}>{item.title}</label>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default CatalogoSidebar;
