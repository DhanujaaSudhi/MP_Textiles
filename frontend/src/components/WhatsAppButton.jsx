import React from "react";
import { BsWhatsapp } from "react-icons/bs";

const WhatsAppButton = () => {
  const phoneNumber = "6382218590";  // Your WhatsApp number
  const message = "Hi! I would like to know more about your customised products.";

  const handleWhatsAppClick = () => {
    const url = `https://wa.me/91${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-all flex items-center gap-2 z-50"
    >
      <BsWhatsapp size={28} />
      <span className="hidden md:inline">Chat with us</span>
    </button>
  );
};

export default WhatsAppButton;
