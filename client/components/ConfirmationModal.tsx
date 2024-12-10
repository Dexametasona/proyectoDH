"use client";

import React from "react";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white w-11/12 sm:w-96 p-6 rounded-lg shadow-lg text-center relative">
        {/* Botón para cerrar */}
        <button
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Contenido del modal */}
        <div className="flex flex-col items-center gap-4">
          <div className="text-green-500 text-4xl">✔</div>
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
      </div>
    </div>
  );
};

export default ConfirmationModal;
