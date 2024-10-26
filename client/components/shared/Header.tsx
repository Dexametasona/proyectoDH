import { Menu, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { navbarOptions } from "@/types";

const Header = () => {
  return (
    <div className="h-20 bg-primary w-full p-4 rounded-b-3xl flex justify-between items-center sm:rounded-b-none">
      <div className="bg-secondary rounded-full flex items-center justify-center p-2 sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {navbarOptions.map((option) => (
              <DropdownMenuItem key={option.name}>
                {option.name}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <p className="uppercase text-center">GameYard</p>
      <div className="gap-8 hidden sm:flex cursor-pointer">
        {navbarOptions.map((option) => (
          <p key={option.name}> {option.name} </p>
        ))}
      </div>
      <div className="bg-secondary rounded-full flex items-center justify-center p-2">
        <User />
      </div>
    </div>
  );
};

export default Header;
