"use client";

import Image from "next/image";
import React from "react";

const WhatsappBtn = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+573196466110"; // Replace with your WhatsApp number
    const message = "Hola equipo de GameYard!, Tengo una pregunta"; // Optional pre-filled message

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button className="whatsapp-button" onClick={handleWhatsAppClick}>
      <Image className="w-full" width={30} height={30} src="/assets/icons/whatsapp-logo.png" alt="Logo whatsapp" />
    </button>
  );
};

export default WhatsappBtn;
