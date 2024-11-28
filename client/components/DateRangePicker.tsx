"use client";

import * as React from "react";
import { addDays, format, isWithinInterval, parseISO } from "date-fns";
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
  orders?: Array<{ shipStart: string; shipEnd: string }>;
}

export function DatePickerWithRange({
  className,
  date,
  onDateChange,
  type,
  orders = [],
}: DatePickerWithRangeProps) {
  const today = new Date();
<<<<<<< HEAD

  const disabledRanges = orders.map((order) => ({
    from: parseISO(order.shipStart),
    to: parseISO(order.shipEnd),
  }));
  
    // Función para verificar si una fecha está dentro de algún rango deshabilitado
    const isDateDisabled = (selectedRange: DateRange | undefined): boolean => {
      if (!selectedRange) return false;
  
      return disabledRanges.some(({ from, to }) =>
        isWithinInterval(selectedRange.from, { start: from, end: to }) ||
        isWithinInterval(selectedRange.to, { start: from, end: to })
      );
    };
  
    // Manejar la selección de fechas y evitar las deshabilitadas
    const handleSelect = (selectedDate: DateRange | undefined) => {
      if (selectedDate && !isDateDisabled(selectedDate)) {
        onDateChange(selectedDate);
      } else if (selectedDate) {
        alert("El rango seleccionado incluye fechas no disponibles.");
      }
    };
=======
  const disabledDates = [
    ...orders.map((order) => ({
      from: new Date(order.shipStart),
      to: new Date(order.shipEnd),
    })),
    { before: today },
  ];
  const handleSelect = (selectedDate: DateRange | undefined) => {
    if (
      selectedDate &&
      !disabledDates.some(({ from, to, before }) => {
        const startInvalid = before ? selectedDate.from < before : false;
        const endInvalid = before ? selectedDate.to < before : false;

        const withinRange =
          from && to
            ? selectedDate.from >= from && selectedDate.to <= to
            : false;

        return startInvalid || endInvalid || withinRange;
      })
    ) {
      onDateChange(selectedDate);
    }
  };
>>>>>>> 6c9795be05702ec4a4a5fb62d803b04076eeb740
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
            <CalendarIcon className="absolute right-4 text-disabled" />
          </Button>
        </PopoverTrigger>
        {disabledRanges != null ? (
          <PopoverContent className="w-auto p-0" align="start">
          
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
            disabled={[
              { before: today },
              ...disabledRanges 
                // Agregamos los rangos deshabilitados
              
            ]}
          />
        </PopoverContent>): null
        }
        
      </Popover>
    </div>
  );
}
