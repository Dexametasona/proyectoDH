"use client";

import * as React from "react";
import { Caption, DayPicker } from "react-day-picker";
import { es } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  // Array con las iniciales en mayúscula
  const weekdaysShort = ["D", "L", "M", "M", "J", "V", "S"];

  const [month, setMonth] = React.useState(new Date());
  const [year, setYear] = React.useState(month.getFullYear());
  const [currentMonth, setCurrentMonth] = React.useState(month);

  const changeMonth = (direction: "previous" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "previous") {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const changeYear = (direction: "previous" | "next") => {
    const newYear = new Date(currentMonth);
    if (direction === "previous") {
      newYear.setFullYear(currentMonth.getFullYear() - 1);
    } else {
      newYear.setFullYear(currentMonth.getFullYear() + 1);
    }
    setCurrentMonth(newYear);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md",
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100 rounded-full",
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary-soft text-white hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        Head: () => (
          <div className="flex justify-between">
            {weekdaysShort.map((day, index) => (
              <div
                key={index}
                className="text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] text-center"
              >
                {day}
              </div>
            ))}
          </div>
        ),

        IconLeft: ({ ...props }) => <ChevronLeftIcon className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRightIcon className="h-4 w-4" />,
      }}
      caption={
        <Caption>
          <div className="flex justify-center items-center">
            {/* Control de mes */}
            <div className="flex items-center">
              <button
                onClick={() => changeMonth("previous")}
                className="h-4 w-4 p-0 opacity-50 hover:opacity-100"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <span className="mx-2 text-lg font-medium">
                {currentMonth.toLocaleString("default", { month: "long" })}
              </span>
              <button
                onClick={() => changeMonth("next")}
                className="h-4 w-4 p-0 opacity-50 hover:opacity-100"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>

            {/* Control de año */}
            <div className="ml-4 flex items-center">
              <button
                onClick={() => changeYear("previous")}
                className="h-4 w-4 p-0 opacity-50 hover:opacity-100"
              >
                <ChevronLeftIcon className="h-4 w-4" />
              </button>
              <span className="mx-2 text-lg font-medium">
                {currentMonth.getFullYear()}
              </span>
              <button
                onClick={() => changeYear("next")}
                className="h-4 w-4 p-0 opacity-50 hover:opacity-100"
              >
                <ChevronRightIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Caption>
      }
      {...props}
    />
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
