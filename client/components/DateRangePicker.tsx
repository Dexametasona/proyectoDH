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
  orders?: Array<{ shipStart: string; shipEnd: string }>;
}

export function DatePickerWithRange({
  className,
  date,
  onDateChange,
  type,
  orders = [],
}: DatePickerWithRangeProps) {
  // Crear un rango de fechas hardcodeado para pruebas
  const disabledDates = [
    {
      from: new Date(2024, 2, 20), // 20 de marzo 2024
      to: new Date(2024, 2, 25), // 25 de marzo 2024
    },
  ];

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
            disabled={disabledDates}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
