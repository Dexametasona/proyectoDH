"use client";

import * as React from "react";
import { format, isWithinInterval, parseISO } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { DateRange, Matcher, Matcher } from "react-day-picker";

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
  disabled: Matcher | Matcher[];
}

export function DatePickerWithRange({
  className,
  date,
  onDateChange,
  type,
  orders = [],
  disabled = [],
}: DatePickerWithRangeProps) {
  const today = new Date();

  const disabledRanges = orders.map((order) => ({
    from: parseISO(order.shipStart),
    to: parseISO(order.shipEnd),
  }));


  // Función para verificar si una fecha está dentro de algún rango deshabilitado
  const isDateDisabled = (selectedRange: DateRange | undefined): boolean => {
    if (!selectedRange) return false;

    return disabledRanges.some(
      ({ from, to }) =>
        isWithinInterval(selectedRange.from, { start: from, end: to }) ||
        isWithinInterval(selectedRange.to, { start: from, end: to }),
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
              disabled={disabled}
            />
          </PopoverContent>
        ) : null}
      </Popover>
    </div>
  );
}
