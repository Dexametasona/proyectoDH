"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DatePickerWithRangeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | null;
  onDateChange: (dates: DateRange | null) => void;
  type: "from" | "to";
}

export function DatePickerWithRange({
  className,
  date,
  onDateChange,
  type,
}: DatePickerWithRangeProps) {
  const renderAvailability = (date) => {
    // Lógica para verificar si una fecha está disponible
    const isAvailable = productAvailability.some((availability) => {
      // Define tu lógica para comparar la fecha actual con la disponibilidad
      return availability.date === date; // Ejemplo básico, ajusta según tu API
    });
    return isAvailable ? "Disponible" : "No disponible";
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild className="rounded-full w-full">
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground",
            )}
          >
            {type === "from" && date?.from ? (
              format(date.from, "LLL dd, y")
            ) : type === "to" && date?.to ? (
              format(date.to, "LLL dd, y")
            ) : (
              <span className="text-disabled">dd/mm/aa</span>
            )}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={onDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
