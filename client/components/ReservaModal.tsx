"use client";

import React, { useState } from "react";
import { DateCalendar } from "./CalendarModal";
import { useAuthContext } from "@/context/AuthContext";
import { createOrder } from "@/lib/api_interface";
import ErrorModal from "./ErrorModal";
import { getErrorMessage } from "@/lib/utils";




const ReservaModal = ({ isOpen, onClose, orders = [], product }) => {
  const [selectedDates, setSelectedDates] = useState({
    from: null,
    to: null,
  });
  const [step, setStep] = useState("selectDates");
  const { user } = useAuthContext();
  const [shipAddress, setShipAddress] = useState("");
  const [remarks, setRemarks] = useState("");
  const [addressError, setAddressError] = useState<string | null>(null);
  const { authData } = useAuthContext();
  const [errorMessage, setErrorMessage] = useState(null);


  // Procesar las órdenes como rangos deshabilitados
  const disabledDates = orders.map((order) => ({
    from: new Date(order.shipStart),
    to: new Date(order.shipEnd),
  }));

  // Manejar el cambio de fechas seleccionadas
  function handleDateChange(dates) {
    const isOverlapping = disabledDates.some(
      (range) =>
        (dates.from >= range.from && dates.from <= range.to) || (dates.to >= range.from && dates.to <= range.to)
    );

    if (!isOverlapping) {
      setSelectedDates(dates);
    } else {
      alert("Las fechas seleccionadas están reservadas.");
    }
  }

  if (!isOpen) return null;


  const dateDetails = {
    startDate: selectedDates.from ? selectedDates.from.toLocaleDateString() : "",
    endDate: selectedDates.to ? selectedDates.to.toLocaleDateString() : "",
  };

  
  const handleReserve = async () => {
    if (!selectedDates.from || !selectedDates.to) {
      alert("Por favor selecciona un rango de fechas.");
      return;
    }

    const reservationData = {
      productId: product.id,
      shipAddress,
      shipStart: selectedDates.from.toISOString().split("T")[0],
      shipEnd: selectedDates.to.toISOString().split("T")[0],
      remarks,
    };
    if (!shipAddress.trim()) {
      setAddressError("Por favor, ingresa una dirección");
      return;
    }



    if (!authData) {
      return;
    }

    try {
      const result = await createOrder(authData, reservationData);

      if (!result) {
        throw new Error("Error desconocido");
        
      }
      setStep("confirmation"); // Mostrar el modal de confirmación
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      setErrorMessage(errorMessage);
    }
  };
  const closeErrorModal = () => setErrorMessage(null);
  return (
    <div className="fixed inset-0 flex items-end sm:items-center sm:justify-center bottom-0 bg-black bg-opacity-50 z-50">
      <div className=" bg-white w-full sm:w-[75%] sm:max-w-[720px] sm:rounded-lg rounded-t-lg p-4 sm:p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4 ">
          <h2 className="text-xl font-semibold">
            {step === "selectDates" ? "Seleccionar fechas" : step === "reservationSummary" ? "Detalles de la reserva" : "Confirmación de la reserva"}
          </h2>
          <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
            &times;
          </button>
        </div>

        {step === "selectDates" ? (
          <>
            {/* Selección de Fechas */}
            <div className=" flex w-full gap-2 sm:gap-3">
              <div className="mx-auto relative flex flex-col items-center w-full justify-center">
                <DateCalendar
                  date={selectedDates}
                  onDateChange={handleDateChange}
                  disabledDates={disabledDates}
                  product={product}
                />
              </div>
            </div>
            <button
              className={`w-full py-2 rounded-full ${selectedDates.from && selectedDates.to
                  ? "bg-secondary text-white"
                  : "bg-gray-400 text-white cursor-not-allowed"
                }`}
              disabled={!selectedDates.from || !selectedDates.to}
              onClick={() => setStep("reservationSummary")}
            >
              Continuar reserva
            </button>
          </>
        ) : step === "reservationSummary" ? (
          <>
            {/* Resumen de la Reserva */}
            <div>
              <img
                src={product.photos.length ? product.photos[0].url : ""}
                alt="Producto"
                className="w-full h-32 object-cover rounded-md mb-4"
              />
            </div>
            <p className="text-primary text-lg font-semibold my-2">{product.name}</p>
            <div className="grid grid-cols-3 gap-2 ">
              <p>Descripción:</p>
              <p className="col-span-2">{product.description}</p>
              <p>Precio:</p>
              <p className="col-span-2">{product.price} USD por hora</p>
              <p>Marca:</p>
              <p className="col-span-2">{product.brand}</p>
            </div>
            <p className="text-primary text-lg font-semibold my-2">Informaci adicional</p>
            <div className="grid grid-cols-3 gap-2">
              <p>Titular:</p>
              <p className="col-span-2">{user?.name}</p>
              <p>Email:</p>
              <p className="col-span-2">{user?.email}</p>
              <p>Desde:</p>
              <p className="col-span-2">{dateDetails.startDate}</p>
              <p>Hasta:</p>
              <p className="col-span-2">{dateDetails.endDate}</p>
              <p>Dirección:</p>
              <input
                className="border border-inherit col-span-2 p-1 rounded-sm"
                type="text"
                name="address"
                id="address"
                placeholder="Escribe tu dirección"
                value={shipAddress}
                onChange={(e) => setShipAddress(e.target.value)}
              />
              {!addressError ? (
                <></>
              ) : (
                <div className="p-2 text-white border-l-red-500 border-2 bg-red-200 mb-2 rounded-sm shadow-sm col-span-3">
                  <p>{addressError}</p>
                </div>
              )}
              <p> Comentario:</p>
              <input
                className="border border-inherit col-span-2 p-1 rounded-sm"
                type="text"
                name="remarks"
                id="remarks"
                placeholder="Deja un comentario"
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
              />
            </div>
            <ErrorModal message={errorMessage} onClose={closeErrorModal} />
            <div className="flex justify-between mt-4">
              <button
                onClick={() => setStep("selectDates")}
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-full"
              >
                Volver
              </button>
              <button
                onClick={() => {
                  handleReserve();
                }}
                className="bg-secondary text-white px-4 py-2 rounded-full"
              >
                Confirmar reserva
              </button>
              
            </div>
          </>
        ) : step === "confirmation" ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-color-success text-4xl">✔</div>
            <h3 className="text-lg font-semibold">Confirma tu reserva</h3>
            <p className="text-sm text-gray-600">
              Revisa tu correo electrónico y termina con el proceso de reserva.
            </p>
            <button
              onClick={onClose}
              className="bg-secondary text-white px-4 py-2 rounded-full w-full"
            >
              Entendido
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default ReservaModal;
