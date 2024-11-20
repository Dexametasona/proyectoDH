"use client";
import { CalendarDays, Search } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "./ui/button";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [openFromCalendar, setOpenFromCalendar] = useState(false);
  const [openToCalendar, setOpenToCalendar] = useState(false);

  const handleOpenFromCalendar = () => {
    setOpenFromCalendar(!openFromCalendar);
  };

  const handleOpenToCalendar = () => {
    setOpenToCalendar(!openToCalendar);
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
    </div>
  );
};

export default SearchBar;
