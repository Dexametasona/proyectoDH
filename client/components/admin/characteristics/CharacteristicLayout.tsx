"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { ICharacteristicReq, ICharacteristicRes } from "@/types/ICharacteristic";
import { getCharTypeFromId } from "@/lib/utils";
import {
  createCharacteristic,
  deleteCharacteristic,
  getAllCharacteristics,
  updateCharacteristic,
} from "@/services/characteristicService";
import { useAuthContext } from "@/context/AuthContext";
import Swal from "sweetalert2";
import FormModal from "./FormModal";

const CharacteristicsLayout = () => {
  const { authData } = useAuthContext();
  const [chars, setChars] = useState<ICharacteristicRes[]>([]);
  const [charTarget, setCharTarget] = useState<ICharacteristicRes>();
  const [isShowModal, setIsShowModal] = useState(false);

  const getChars = useCallback(async () => {
    try {
      const response = await getAllCharacteristics();
      setChars(response);
    } catch (error) {
      console.error("error al obtener las caracteristicas ", error);
      setChars([]);
    }
  }, []);

  useEffect(() => {
    getChars();
  }, [getChars]);

  const idToCharComponent = (id: number) => {
    const { icon: Icon, name } = getCharTypeFromId(id);
    return (
      <div className="flex gap-x-2 items-center font-bold">
        <Icon color="#FF9E00" />
        <span className="capitalize">{name}</span>
      </div>
    );
  };

  const triggeModal = (char: ICharacteristicRes | undefined) => {
    setCharTarget(char);
    setIsShowModal(true);
  };

  const handleCreateChar = async (char: ICharacteristicReq)=>{
    try {
      await createCharacteristic(authData!, char);
      Swal.fire({icon:"success", text:'Caracteristica creada con exito.'})
      setIsShowModal(false);
      getChars();
    } catch (error) {
      console.log('Error al crear la caracteristica', error)
      Swal.fire({icon:'error', text:'Error al crear la caracteristica.'})
    }
  }
  const handleUpdateChar = async (char: ICharacteristicReq, id:number)=>{
    try {
      await updateCharacteristic(id,authData!, char);
      Swal.fire({icon:"success", text:'Caracteristica actualizada con exito.'})
      setIsShowModal(false);
      getChars();
    } catch (error) {
      console.log('Error al actualizar la caracteristica', error)
      Swal.fire({icon:'error', text:'Error al actualizar la caracteristica.'})
    }
  }

  const deleteChar = async (id: number) => {
    try {
      const response = await Swal.fire({
        icon: "question",
        title: "Seguro que deseas eliminar?",
        text: "Solo se pueden eliminar caracteristicas que no estan activas.",
        showConfirmButton: true,
        showCancelButton: true,
      });
      if (response.isConfirmed) {
        await deleteCharacteristic(id, authData!);
        getChars();
      }
    } catch (error) {
      console.error("Error al eliminar caracteristica: ", error);
      Swal.fire({
        icon: "error",
        text: "Error al intentar eliminar la caracteristica.",
      });
    }
  };

  return (
    <section className=" bg-white py-4">
      <div className="flex justify-between px-4 py-4">
        <h2 className="text-lg font-bold text-gray-800">
          Listado de Características
        </h2>
        <Button
          className="bg-success hover:opacity-70 transition-all ease-in-out duration-300"
          onClick={() => triggeModal(undefined)}
        >
          Agregar
        </Button>
      </div>
      <div className="table-container max-w-screen-lg mx-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-100">
              <TableHead className="py-4">ID</TableHead>
              <TableHead className="py-4">Descripción</TableHead>
              <TableHead className="py-4">Tipo</TableHead>
              <TableHead className="text-center">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {chars.map((char) => {
              return (
                <TableRow key={char.id} className="">
                  <TableCell>{char.id}</TableCell>
                  <TableCell>{char.description}</TableCell>
                  <TableCell>{idToCharComponent(char.type)}</TableCell>
                  <TableCell className="text-center min-w-40">
                    <Button
                      type="button"
                      onClick={() => deleteChar(char.id)}
                      className="bg-black mx-1 hover:opacity-70"
                      variant="destructive"
                    >
                      <Image
                        src="/assets/icons/trash-2.png"
                        alt="trash-icon"
                        width={16}
                        height={16}
                      />
                    </Button>
                    <Button
                      className="bg-red-600 mx-1 hover:opacity-70"
                      onClick={() => triggeModal(char)}
                    >
                      <Image
                        src="/assets/icons/edit.png"
                        alt="trash-icon"
                        width={16}
                        height={16}
                      />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      {isShowModal ? (
        <FormModal
          createChar={handleCreateChar}
          updateChar={handleUpdateChar}
          char={charTarget}
          showModal={setIsShowModal}
        />
      ) : null}
    </section>
  );
};

export default CharacteristicsLayout;
