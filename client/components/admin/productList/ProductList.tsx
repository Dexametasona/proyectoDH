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

const ProductList = () => {
  return (
    <section className="h-[calc(100vh-200px)] overflow-y-scroll">
      <div className="flex justify-between px-4  py-4">
        <h2 className="text-lg font-bold text-gray-800">Listado de Productos</h2>
        <Button className="bg-success">Agregar</Button>
      </div>
      <Table>
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
                />
              </TableCell>
              <TableCell> {product.name} </TableCell>
              <TableCell> {product.stock} </TableCell>
              <TableCell> {product.price} </TableCell>
              <TableCell> {product.location} </TableCell>
              <TableCell> {product.description} </TableCell>
              <TableCell> {product.status} </TableCell>
              <TableCell>
                {" "}
                <Button variant={"destructive"}>Eliminar</Button>{" "}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  );
};

export default ProductList;
