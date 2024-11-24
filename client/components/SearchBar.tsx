"use client";
import { CalendarDays, Search } from "lucide-react";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "./ui/button";
import { filterByName, getProductById, selectDates } from "@/lib/api_interface";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [openFromCalendar, setOpenFromCalendar] = useState(false);
  const [openToCalendar, setOpenToCalendar] = useState(false);
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

  const handleOpenFromCalendar = () => {
    setOpenFromCalendar(!openFromCalendar);
  };

  const handleOpenToCalendar = () => {
    setOpenToCalendar(!openToCalendar);
  };

  const handleSelectProduct = (name: string) => {
    setSelectedProduct(name);
    setSearch(name);
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
          <div onClick={handleOpenFromCalendar} className="max-w-72 w-full">
            <Input
              placeholder="dd/mm/aaaa"
              className="border-gray-300 rounded-full bg-white placeholder-disabled w-full"
            />
            <CalendarDays className="hidden sm:block absolute right-2 top-10 text-disabled" />
          </div>
          {openFromCalendar && (
            <Calendar className="absolute bg-white top-20 z-50" />
          )}
        </div>

        <div className="mx-auto relative flex flex-col items-start max-w-72 w-full sm:gap-3">
          <p className="text-primary">Hasta</p>
          <div onClick={handleOpenToCalendar} className="max-w-72 w-full">
            <Input
              placeholder="dd/mm/aaaa"
              className="border-gray-300 rounded-full bg-white placeholder-disabled"
            />
            <CalendarDays className="hidden sm:block absolute right-2 top-10 text-disabled" />
          </div>
          {openToCalendar && (
            <Calendar className="absolute bg-white top-20 z-50" />
          )}
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
                onClick={() => handleSelectProduct(name)}
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
