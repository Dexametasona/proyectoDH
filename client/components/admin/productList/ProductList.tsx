import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { recommendationsCards } from "@/constants";
import Image from "next/image";
import { useState } from "react";
import AddProductForm from "./AddProductForm";

const ProductList = () => {
  const [addChange, setAddChange] = useState(false);

  const statusColors = {
    "Reparación": "bg-red-100 text-red-500",
    "Disponible": "bg-green-100 text-green-500",
    "En Alquiler": "bg-yellow-100 text-yellow-500",
  };

  const handleClickAdd = () => {
    setAddChange(true);
  }

  return (
    <section className="h-[calc(100vh-200px)] overflow-y-scroll">
      <div className="flex justify-between px-4  py-4">
        <h2 className="text-lg font-bold text-gray-800">Listado de Productos</h2>
        <Button className="bg-success" onClick={handleClickAdd}>Agregar</Button>
      </div>
      {!addChange ? <Table>
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>ID</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead>Inventario</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Ubicación</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-right">Eliminar Producto</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recommendationsCards.map((product) => (
            <TableRow key={product.id}>
              <TableCell>
                <Checkbox />
              </TableCell>
              <TableCell>
                {/* TODO add default image */}
                <Image
                  src={product.cardImage || "/path/to/default/image.png"}
                  width={56}
                  height={56}
                  alt="product image"
                  className="rounded-full"
                />
              </TableCell>
              <TableCell> {product.name} </TableCell>
              <TableCell> {product.stock} </TableCell>
              <TableCell> {product.price} </TableCell>
              <TableCell> {product.location} </TableCell>
              <TableCell> {product.description} </TableCell>
              <TableCell>
                <span className={`rounded-lg px-2 m-1 py-1 ${statusColors[product.status]}`}>
                  {product.status}
                </span> 
              </TableCell>
              <TableCell>
                {" "}
                <Button variant={"destructive"}>Eliminar</Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table> : <AddProductForm />}
    </section>
  );
};

export default ProductList;
