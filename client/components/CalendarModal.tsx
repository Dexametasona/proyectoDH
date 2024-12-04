"use client";

import React, { useState } from "react";
import { addDays, format, isWithinInterval, parseISO } from "date-fns";
import { DateRange } from "react-day-picker";
import { Calendar } from "@/components/ui/calendar";

interface DatePickerWithRangeProps {
    date: DateRange | null;
    onDateChange: (dates: DateRange | null) => void;
    orders?: Array<{ shipStart: string; shipEnd: string }>;
}

export function InlineDatePickerWithRange({
    date,
    onDateChange,
    orders = [],
}: DatePickerWithRangeProps) {
    const today = new Date();

    // Configurar rangos deshabilitados basados en los pedidos
    const disabledRanges = orders.map((order) => ({
        from: parseISO(order.shipStart),
        to: parseISO(order.shipEnd),
    }));

    // Verificar si un rango seleccionado incluye fechas deshabilitadas
    const isDateDisabled = (selectedRange: DateRange | undefined): boolean => {
        if (!selectedRange) return false;
        return disabledRanges.some(({ from, to }) =>
            isWithinInterval(selectedRange.from, { start: from, end: to }) ||
            isWithinInterval(selectedRange.to, { start: from, end: to })
        );
    };

    // Manejar selección de fechas
    const handleSelect = (selectedDate: DateRange | undefined) => {
        if (selectedDate && !isDateDisabled(selectedDate)) {
            onDateChange(selectedDate);
        } else if (selectedDate) {
            alert("El rango seleccionado incluye fechas no disponibles.");
        }
    };


    // Control del número de meses según el tamaño de la pantalla
    const [numberOfMonths, setNumberOfMonths] = useState(
        typeof window !== "undefined" && window.innerWidth >= 768 ? 2 : 1
    );

    React.useEffect(() => {
        const updateNumberOfMonths = () => {
            setNumberOfMonths(window.innerWidth >= 768 ? 2 : 1);
        };

        // Escuchar cambios en el tamaño de la pantalla
        window.addEventListener("resize", updateNumberOfMonths);

        // Limpiar el evento al desmontar el componente
        return () => {
            window.removeEventListener("resize", updateNumberOfMonths);
        };
    }, []);

    return (
        <div className="container-calendar1 bg-white shadow-md rounded-lg mb-4 p-4">
            {/* Inputs para mostrar fechas seleccionadas */}
            <div className="container-calendar1.1 grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Desde
                    </label>
                    <input
                        type="text"
                        readOnly
                        value={date?.from ? format(date.from, "dd/MM/yyyy") : ""}
                        placeholder="dd/mm/aaaa"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Hasta
                    </label>
                    <input
                        type="text"
                        readOnly
                        value={date?.to ? format(date.to, "dd/MM/yyyy") : ""}
                        placeholder="dd/mm/aaaa"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
                    />
                </div>
            </div>
            <div className="flex items-center justify-center md:max-w-auto sm:gap-3">
                {/* Calendario de rango */}
                <Calendar
                    mode="range"
                    selected={date}
                    onSelect={handleSelect}
                    numberOfMonths={numberOfMonths}
                    disabled={[
                        { before: today },
                        ...disabledRanges, // Rangos dinámicos deshabilitados
                    ]}
                />
            </div>
        </div>
    );
}
