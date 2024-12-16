"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { getFullUsers, changeRole } from "@/services/userService";
import { IUserRes } from "@/types/IUser";
import { useAuthContext } from "@/context/AuthContext";
import CustomPagination from "@/components/shared/CustomPagination";
import { IPagination } from "@/types/IPagination";
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import Swal from 'sweetalert2';
import { isAxiosError } from "axios";

const page = () => {

  const [users, setUsers] = useState<IPagination<IUserRes> | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(0);
  const { authData } = useAuthContext();
  
  const [responseErr, setResponseErr] = useState<string | null>(null);

  const setPagination = async (index: number) => {
    try {
      if (authData === null) {
        setUsers(null);
        return;
      }
      const usersPagination = await getFullUsers(
        {
          page: index - 1,
        },
        authData
      );
      if (usersPagination?.content) {
        setUsers(usersPagination);
        return;
      }
      setUsers(null);
    } catch (error: unknown) {
      console.error(error);
      setUsers(null);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (authData === null) {
          setUsers(null);
          return;
        }
        const usersPagination = await getFullUsers({}, authData);
        if (usersPagination?.content) {
          setUsers(usersPagination);
          return;
        }
        setUsers(null);
      } catch (error: unknown) {
        console.error(error);
        setUsers(null);
      }
    };

    fetchUsers();
  }, [authData]);

  const showConfirmMessage = (id: number, role: number, name: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: `Estas a punto de cambiar los privilegios de ${name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, cambiar!"
    }).then((result) => {
      if (result.isConfirmed) {
        updateRole(id,role,name)
        Swal.fire({
          title: "Rol actializado!",
          text: `Los privilegios de ${name} han sido modificados`,
          icon: "success"
        });
      }
    });
  }

  const updateRole = async (id: number, role: number, name: string) => {
    if (!authData) {
      console.error("Usuario no autenticado");
      return;
    }
    try {
      const response = await changeRole(authData, id, role)
      console.log("Rol actualizado: ", response);
    } catch (error) {
      console.error(error);
      if (isAxiosError(error) && error.response) {
        setResponseErr("Error al actualizar el rol del usuario.");
      }
    } finally {
      setIsLoading(1)
    }
  }

  return (
    <div className="admin_container ">
      <div className="flex justify-between px-4 py-4">
        <h2 className="text-lg font-bold text-gray-800">
          Listado de Usuarios
        </h2>
      </div>
      <div className="table-container px-4">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead className="py-4">ID</TableHead>
              <TableHead className="py-4">Nombre</TableHead>
              <TableHead className="py-4">Apellido</TableHead>
              <TableHead className="py-4">Correo Electrónico</TableHead>
              <TableHead className="py-4">Administrador</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.content.map((user) => {
              return (
                <TableRow key={user.id} className="">
                  <TableCell>{user.id}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{user.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell className="text-center min-w-40">
                    <div className="flex items-center space-x-2">
                      <Switch
                        key={isLoading}
                        id={`switch-${user.id}`}
                        checked={user.role === 0}
                        onCheckedChange={(checked: boolean) => {
                          const newRole = checked ? 0 : 1;
                          showConfirmMessage(user.id, newRole, user.name)
                        }}
                      />
                      <Label htmlFor="airplane-mode">Administrador</Label>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        {users ? (
          <CustomPagination
            currentPage={users.currentPage + 1}
            setCurrentPage={(num) => setPagination(num)}
            totalPages={users.totalPages}
          />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default page;
