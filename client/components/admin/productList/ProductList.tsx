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
      <div className="flex justify-between">
        <p>Listado de Productos</p>
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
              <TableCell> {product.title} </TableCell>
              <TableCell> {product.stock} </TableCell>
              <TableCell> {product.price} </TableCell>
              <TableCell> {product.location} </TableCell>
              <TableCell> {product.description} </TableCell>
              <TableCell> {product.state} </TableCell>
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
