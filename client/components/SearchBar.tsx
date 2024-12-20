"use client";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import { filterByName, getProductById } from "@/lib/api_interface";
import { DatePickerWithRange } from "./DateRangePicker";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";
import { useAppContext } from "@/context/AppContext";
import { getDateArray } from "@/lib/utils";

const SearchBar = () => {
  const { setResultsProductsList } = useAppContext();

  const [search, setSearch] = useState("");
  const [searchProductsList, setSearchProductsList] = useState([]);
  const [selectedDates, setSelectedDates] = useState({
    from: null,
    to: null,
  });
  const [productAvailability, setProductAvailability] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState("");

  const setProductToList = async (products) => {
    const productsInfoArray = await Promise.all(
      products.map(async (product) => {
        const productsInfo = await getProductById(product.id);
        return productsInfo;
      }),
    );

    setResultsProductsList(productsInfoArray);
  };

  useEffect(() => {
    if (search.length >= 4) {
      filterByName(search).then((result) => {
        const products = result?.data.data;
        setProductToList(products);
        setSearchProductsList(products);
      });
      setSelectedProduct("");
      setSearchProductsList([]);
    }

    if (search.length === 0) {
      setResultsProductsList([]);
    }
  }, [search]);

  const handleSelectProduct = async ({ name, id }) => {
    const productsInfo = await getProductById(id);
    const unavailableDates = getDateArray(productsInfo.orders);

    setSelectedProduct(name);
    setSearch(name);

    setSelectedProduct(productsInfo);
    setProductAvailability(unavailableDates);
  };

  const handleDateChange = (dates) => {
    setSelectedDates(dates);
  };

  return (
    <div className="bg-secondary p-4 mx-4 rounded-xl flex flex-col items-center gap-2 sm:flex-row sm:items-end sm:gap-3 sm:mx-6">
      <div className="w-full flex flex-col gap-2 sm:gap-3">
        <p className="text-primary font-medium">¿Qué estás buscando?</p>

        <div className="w-full">
          <Popover>
            <PopoverTrigger className="w-full">
              <Search className="absolute right-4 top-2 text-disabled" />
              <Input
                type="text"
                className="flex-grow focus:outline-none placeholder-disabled w-full border-none border-gray-300 bg-background rounded-full"
                placeholder="Ej.: Saltarín"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </PopoverTrigger>
            {searchProductsList.length > 0 && selectedProduct === "" && (
              <PopoverContent className="bg-white z-10 w-[calc(100vw-62px)] focus:none rounded-b-lg sm:ml-6 sm:mt-4">
                {searchProductsList.map(({ name, id }) => (
                  <div
                    key={id}
                    className="flex gap-4 px-4 py-2 border-t border-grey-subtext cursor-pointer"
                    onClick={() => handleSelectProduct({ name, id })}
                  >
                    <Search className="text-disabled" />
                    <p>{name}</p>
                  </div>
                ))}
              </PopoverContent>
            )}
          </Popover>
        </div>
      </div>

      <div className="flex w-full gap-2 sm:gap-3">
        <div className="mx-auto relative flex flex-col items-start w-full max-w-72 sm:gap-3">
          <p className="text-primary">Desde</p>
          <DatePickerWithRange
            date={selectedDates}
            onDateChange={handleDateChange}
            disabled={productAvailability}
            type="from"
            className="w-full"
          />
        </div>

        <div className="mx-auto relative flex flex-col items-start max-w-72 w-full sm:gap-3">
          <p className="text-primary">Hasta</p>
          <DatePickerWithRange
            date={selectedDates}
            onDateChange={handleDateChange}
            disabled={productAvailability}
            type="to"
            orders={selectedProduct.orders}
            className="w-full"
          />
        </div>
      </div>

      <Button className="rounded-full w-full sm:w-fit sm:text-lg py-3 px-4 sm:h-12">
        Buscar
      </Button>
    </div>
  );
};

export default SearchBar;
