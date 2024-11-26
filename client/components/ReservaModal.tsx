"use client";

import React, { useState } from "react";

const BookingModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

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
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Cantidad</label>
          <div className="flex items-center border border-gray-300 rounded-md">
            <button className="px-3 py-2 text-gray-600">-</button>
            <input
              type="number"
              value={1}
              className="w-full text-center py-2 outline-none"
              readOnly
            />
            <button className="px-3 py-2 text-gray-600">+</button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Inicio</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Final</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded-md px-3 py-2"
          />
        </div>
        <button
          className="w-full bg-gray-400 text-white py-2 rounded-md cursor-not-allowed"
          disabled
        >
          Confirmar reserva
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
