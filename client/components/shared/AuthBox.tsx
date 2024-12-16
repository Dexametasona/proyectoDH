import { User } from "@/types/IAuth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { User2, UserCheck } from "lucide-react";
import { Button } from "../ui/button";

const AuhtBox = ({
  user,
  handleNavigation,
  handleLogout,
}: {
  user: User | null;
  handleNavigation: (path: string) => void;
  handleLogout: () => void;
}) => {
  return (
    <div className="auth-box flex">
      <div className="btns-box sm:flex items-center gap-2">
        {user ? (
          <>
            <p className="text-white text-md uppercase hidden sm:flex">
              {user.name + " " + user.lastname}
            </p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="border-secondary border-2 rounded-full w-10 grid place-items-center aspect-square">
                  <p className="text-white text-4xl">
                    {user.name.toUpperCase().charAt(0)}
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
              className="bg-white rounded-sm overflow-hidden" 
              sideOffset={10}
              collisionPadding={20}>
                <DropdownMenuItem
                  className="hover:bg-slate-400 p-2 outline-none ease-in-out transition-all duration-200"
                  onClick={() => handleLogout()}
                >
                  <p className="cursor-pointer">Cerrar sesión</p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="hover:bg-slate-400 flex items-center gap-2 p-2 outline-none ease-in-out transition-all duration-200 cursor-pointer"
                  onClick={() => handleNavigation('/profile')}
                >
                    <UserCheck/> 
                  <p>
                    Mi perfil</p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <div>
            <div className="sm:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <div className="bg-secondary p-2 rounded-full">
                    <User2></User2>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent sideOffset={10}>
                  <DropdownMenuItem
                    className="hover:bg-slate-400 bg-white p-2 outline-none ease-in-out transition-all duration-300"
                    onClick={() => handleNavigation("/signup")}
                  >
                    <p className="cursor-pointer">Crear cuenta</p>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="hover:bg-slate-400 bg-white p-2 outline-none ease-in-out transition-all duration-300"
                    onClick={() => handleNavigation("/login")}
                  >
                    <p className="cursor-pointer">Iniciar sesión</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="hidden sm:flex gap-4">
              <Button
                className="rounded-full text-sm border-white border hover:opacity-80"
                onClick={() => handleNavigation("/signup")}
              >
                Crear cuenta
              </Button>
              <Button
                className="rounded-full text-sm hover:opacity-80"
                variant={"secondary"}
                onClick={() => handleNavigation("/login")}
              >
                Iniciar sesión
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuhtBox;
