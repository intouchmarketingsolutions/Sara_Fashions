import { useState, useEffect } from 'react'
import { BsWhatsapp } from 'react-icons/bs'

export default function WhatsAppButton() {
  const [lifted, setLifted] = useState(false)

  useEffect(() => {
    const on  = () => setLifted(true)
    const off = () => setLifted(false)
    window.addEventListener('quickview-open',  on)
    window.addEventListener('quickview-close', off)
    return () => {
      window.removeEventListener('quickview-open',  on)
      window.removeEventListener('quickview-close', off)
    }
  }, [])

  return (
    <a
      href="https://wa.me/919663098124"
      target="_blank"
      rel="noopener noreferrer"
      style={{ bottom: lifted ? 'calc(85vh + 12px)' : '24px' }}
      className="fixed right-4 z-[55] bg-green-500 hover:bg-green-600 w-[54px] h-[54px] rounded-full flex items-center justify-center shadow-2xl transition-all duration-500 hover:scale-110"
    >
      <BsWhatsapp size={26} className="text-white" />
    </a>
  )
}