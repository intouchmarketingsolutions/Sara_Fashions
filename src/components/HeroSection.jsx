import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import heroImage1 from '../assets/images/banners/banner.png'
import heroImage2 from '../assets/images/banners/banner1.png'

const slides = [
  {
    image:   heroImage1,
    heading: 'Bridal & Festive\nCollection',
  },
  {
    image:   heroImage2,
    heading: 'Modern Ethnic\nFashion',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setCurrent((p) => (p + 1) % slides.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative w-full overflow-hidden bg-[#f8f3eb] mt-[148px] sm:mt-[164px] md:mt-[174px] lg:mt-[186px]">

      {/* ── CSS GRID STACK — all images occupy the same cell, no layout shift ── */}
      <div style={{ display: 'grid' }}>

        {slides.map((s, i) => (
          <motion.img
            key={i}
            src={s.image}
            alt="Sara Central"
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            style={{ gridArea: '1 / 1' }}
            className="w-full h-auto block select-none"
          />
        ))}

        {/* gradient overlay */}
        <div
          style={{ gridArea: '1 / 1' }}
          className="bg-gradient-to-t from-black/55 via-transparent to-transparent z-10 pointer-events-none"
        />

        {/* ── TEXT ── */}
        <div
          style={{ gridArea: '1 / 1' }}
          className="z-20 flex flex-col justify-end items-start pb-8 sm:pb-14 md:pb-16 lg:pb-20 px-5 sm:px-10 md:px-14 lg:px-20"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="flex flex-col gap-2 max-w-[90%] sm:max-w-[520px]"
            >
              <h1
                className="text-[24px] sm:text-[36px] md:text-[50px] lg:text-[62px] font-bold text-white leading-[1.1] tracking-tight drop-shadow-lg"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {slides[current].heading.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── DOTS ── */}
        <div
          style={{ gridArea: '1 / 1' }}
          className="z-30 flex items-end justify-center pb-4 sm:pb-5 pointer-events-none"
        >
          <div className="flex items-center gap-2.5 pointer-events-auto">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-7 sm:w-8 h-2 bg-[#c8a96b]'
                    : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
