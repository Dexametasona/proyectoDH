"use client";

import React, { useState } from "react";
import { InlineDatePickerWithRange } from "./CalendarModal";
import { useRouter } from "next/navigation";


const BookingModal = ({ isOpen, onClose, orders = [], product }) => {
  const [selectedDates, setSelectedDates] = useState({
    from: null,
    to: null,
  });

  const router = useRouter();

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
 console.log(product);
 

  return (
    <div className="container1 fixed inset-0 flex items-end sm:items-center sm:justify-center bottom-0 bg-black bg-opacity-50 z-50">
      <div className="container1.1 bg-white w-full sm:w-[75%] sm:max-w-[720px] sm:rounded-lg rounded-t-lg p-4 sm:p-6 shadow-lg">
        <div className="container1.1.1 flex justify-between items-center mb-4 ">
          <h2 className="text-lg font-semibold">Seleccionar fechas</h2>
          <button
            className="text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="container1.1.2 flex w-full gap-2 sm:gap-3">
          <div className="container1.1.2.1 mx-auto relative flex flex-col items-center w-full justify-center">
            <InlineDatePickerWithRange
              date={selectedDates}
              onDateChange={handleDateChange}
              disabledDates={disabledDates}
              product={product}
            />
          </div>
        </div>
        <button
          className={`w-full py-2 rounded-md ${selectedDates.from && selectedDates.to
            ? "bg-secondary text-white"
            : "bg-gray-400 text-white cursor-not-allowed"
            }`}
          disabled={!selectedDates.from || !selectedDates.to}

        >
          Continuar reserva
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
