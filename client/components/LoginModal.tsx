"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface LoginModalProps {
    onClose: () => void; // Nueva prop para cerrar el modal
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {

    const router = useRouter();

    const handleNavigation = (path: string) => {
        router.push(`${path}`);
    };

    return (
        <div className=" fixed inset-0 flex items-end sm:items-center sm:justify-center bottom-0 bg-black bg-opacity-50 z-50">
            <div className="bg-white w-full sm:w-[75%] sm:max-w-[720px] sm:rounded-lg rounded-t-lg p-4 sm:p-6 shadow-lg">
                <button className="text-gray-500 hover:text-gray-700" onClick={onClose}>
                    &times;
                </button>
                <div className="flex flex-col place-content-center gap-2  h-60 text-center ">
                    <h3 className="text-lg font-semibold mb-4">
                        Identifícate para reservar
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        Ingresa a tu cuenta y reserva todos los artículos que necesites
                        para tu fiesta.
                    </p>
                    <button className="bg-primary text-white px-4 py-2 rounded w-full mb-2" onClick={() => handleNavigation("/login")} >
                        Iniciar sesión
                    </button>
                    <button className="bg-secondary text-white px-4 py-2 rounded w-full" onClick={() => handleNavigation("/signup")}>
                        Crear cuenta
                    </button>
                </div>
            </div>
        </div>
    )
}
export default LoginModal;