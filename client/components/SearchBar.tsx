"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { filterByName, getProductById } from "@/lib/api_interface";
import { DatePickerWithRange } from "./DateRangePicker";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [selectedDates, setSelectedDates] = useState({
    from: null,
    to: null,
  });
  const [productAvailability, setProductAvailability] = useState([]);

  // const [openFromCalendar, setOpenFromCalendar] = useState(false);
  // const [openToCalendar, setOpenToCalendar] = useState(false);
  const [listOfProducts, setListOfProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  useEffect(() => {
    if (search.length >= 4) {
      filterByName(search).then((result) => {
        const products = result?.data.data;
        setListOfProducts(products);
      });
      setSelectedProduct("");
      setListOfProducts([]);
    }

    if (search.length === 0) {
    }
  }, [search]);

  useEffect(() => {
    if (selectedProduct) {
      console.log("Producto seleccionado (desde useEffect):", selectedProduct);
    }
  }, [selectedProduct]);

  const handleSelectProduct = async ({ name, id }) => {
    setSelectedProduct(name);
    setSearch(name);
    const productsInfo = await getProductById(id);
    const productAvailability = await productsInfo.orders;
    setProductAvailability(productAvailability);
  };

  const handleDateChange = (dates) => {
    console.log("Fechas seleccionadas:", dates);
    setSelectedDates(dates);
  };

  return (
    <div className="bg-secondary p-4 mx-4 rounded-xl flex flex-col items-center gap-2 sm:flex-row sm:items-end sm:gap-3 sm:mx-6">
      <div className="w-full flex flex-col gap-2 sm:gap-3">
        <p className="text-primary font-medium">¿Qué estás buscando?</p>

        <div className="relative w-full">
          <Search className="absolute right-4 top-2 text-disabled" />

          <Input
            type="text"
            className="flex-grow focus:outline-none placeholder-disabled w-full border-none border-gray-300 bg-background rounded-full"
            placeholder="Ej.: Saltarín"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="flex w-full gap-2 sm:gap-3">
        <div className="mx-auto relative flex flex-col items-start w-full max-w-72 sm:gap-3">
          <p className="text-primary">Desde</p>
          <DatePickerWithRange
            date={selectedDates}
            onDateChange={handleDateChange}
            productAvailability={productAvailability}
            type="from"
          />
        </div>

        <div className="mx-auto relative flex flex-col items-start max-w-72 w-full sm:gap-3">
          <p className="text-primary">Hasta</p>
          <DatePickerWithRange
            date={selectedDates}
            onDateChange={handleDateChange}
            productAvailability={productAvailability}
            type="to"
          />
        </div>
      </div>

      <Button className="rounded-full w-full sm:w-fit sm:text-lg py-3 px-4 sm:h-12">
        Buscar
      </Button>
      {listOfProducts.length > 0 && selectedProduct === "" && (
        <div className="relative">
          <div className="absolute right-[-180px] sm:right-[-16px] bottom-[-8px] sm:top-4 z-10 rounded-2xl sm:rounded-b-2xl sm:border-b sm:border-x border-primary w-[calc(100vw-62px)] sm:w-[calc(100vw-62px)] bg-background ">
            {listOfProducts.map(({ name, id }) => (
              <div
                key={id}
                className="flex gap-4 px-4 py-2 border-t border-grey-subtext cursor-pointer"
                onClick={() => handleSelectProduct({ name, id })}
              >
                <Search className="text-disabled" />
                <p>{name}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
