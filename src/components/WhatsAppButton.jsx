// src/components/WhatsAppButton.jsx

import { BsWhatsapp } from 'react-icons/bs'

export default function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/919663098124"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 z-50 bg-green-500 hover:bg-green-600 w-13 h-13 w-[52px] h-[52px] rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110"
    >
      <BsWhatsapp className="text-white text-2xl" />
    </a>
  )
}