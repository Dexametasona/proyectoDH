"use client";

import React from "react";

const WhatsappBtn = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "+5215588308888"; // Replace with your WhatsApp number
    const message = "Hola equipo de GameYard!, Tengo una pregunta"; // Optional pre-filled message

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <button className="whatsapp-button" onClick={handleWhatsAppClick}>
      <img src="assets\icons\whatsapp-logo.png" alt="Logo whatsapp" />
    </button>
  );
};

export default WhatsappBtn;
