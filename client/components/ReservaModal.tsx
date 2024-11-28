"use client";

import React, { useState } from "react";
import { DatePickerWithRange } from "./DateRangePicker";
import { format } from "date-fns";
import { createDate } from "@/lib/api_interface";

const BookingModal = ({ isOpen, onClose, orders = [] }) => {
  const [selectedDates, setSelectedDates] = useState({
    from: null,
    to: null,
  });

  const today = new Date();

  // Procesar las órdenes como rangos deshabilitados
  const disabledDates = orders.map((order) => ({
    from: new Date(order.shipStart),
    to: new Date(order.shipEnd),
  }));

  // Manejar el cambio de fechas seleccionadas
  function handleDateChange(dates) {
    const isOverlapping = disabledDates.some((range) =>
      (dates.from >= range.from && dates.from <= range.to) ||
      (dates.to >= range.from && dates.to <= range.to)
    );

    if (!isOverlapping) {
      setSelectedDates(dates);
    } else {
      alert("Las fechas seleccionadas están reservadas.");
    }
  }

  if (!isOpen) return null;
  console.log(disabledDates)
  return (
    <div className="fixed inset-0 flex items-end sm:items-center sm:justify-center bottom-0 bg-black bg-opacity-50 z-50">
      <div className="bg-white w-full sm:w-96 sm:rounded-lg rounded-t-lg p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Detalles de la reserva</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="flex w-full gap-2 sm:gap-3">
          <div className="mx-auto relative flex flex-col items-start w-full max-w-72 sm:gap-3">
            <p className="text-primary">Desde</p>
            <DatePickerWithRange
              date={selectedDates}
              onDateChange={handleDateChange}
              disabledDates={disabledDates}
              type="from"
            />
          </div>

          <div className="mx-auto relative flex flex-col items-start max-w-72 w-full sm:gap-3">
            <p className="text-primary">Hasta</p>
            <DatePickerWithRange
              date={selectedDates}
              onDateChange={handleDateChange}
              disabledDates={disabledDates}
              type="to"
            />
          </div>
        </div>
        <button
          className={`w-full py-2 rounded-md ${selectedDates.from && selectedDates.to
            ? "bg-primary text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          disabled={!selectedDates.from || !selectedDates.to}

        >
          Confirmar reserva
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
