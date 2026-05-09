import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

import heroImage1 from '../assets/images/banners/banner.png'
import heroImage2 from '../assets/images/banners/banner1.png'

const slides = [
  { image: heroImage1, heading: 'Bridal & Festive\nCollection' },
  { image: heroImage2, heading: 'Modern Ethnic\nFashion' },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 5000)
    return () => clearInterval(t)
  }, [])

  return (
    <section className="relative w-full bg-[#111] mt-[148px] sm:mt-[164px] md:mt-[174px] lg:mt-[186px]">

      {/*
        Responsive height:
        mobile  → 75vw  (portrait-ish, shows women well)
        sm      → 60vw
        md      → 52vw
        lg+     → 44vw
      */}
      <div className="relative w-full h-[75vw] sm:h-[60vw] md:h-[52vw] lg:h-[44vw] min-h-[260px] max-h-[720px] overflow-hidden"
        style={{ display: 'grid' }}
      >

        {/* All images stacked — smooth crossfade, zero layout shift */}
        {slides.map((s, i) => (
          <motion.img
            key={i}
            src={s.image}
            alt="Sara Fashion"
            animate={{ opacity: i === current ? 1 : 0 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
            style={{ gridArea: '1 / 1' }}
            className="w-full h-full object-cover object-top select-none"
          />
        ))}

        {/* Gradient overlay */}
        <div
          style={{ gridArea: '1 / 1' }}
          className="bg-gradient-to-t from-black/65 via-black/10 to-transparent z-10 pointer-events-none"
        />

        {/* Slide heading */}
        <div
          style={{ gridArea: '1 / 1' }}
          className="z-20 flex flex-col justify-end items-start pb-6 sm:pb-10 md:pb-12 lg:pb-16 px-4 sm:px-8 md:px-12 lg:px-16"
        >
          <AnimatePresence mode="wait">
            <motion.h1
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="text-[5.5vw] sm:text-[4vw] md:text-[3.5vw] lg:text-[3vw] xl:text-[2.8vw] font-bold text-white leading-[1.15] tracking-tight drop-shadow-lg"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              {slides[current].heading.split('\n').map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div
          style={{ gridArea: '1 / 1' }}
          className="z-30 flex items-end justify-center pb-3 sm:pb-4 pointer-events-none"
        >
          <div className="flex items-center gap-2 pointer-events-auto">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? 'w-6 sm:w-8 h-1.5 sm:h-2 bg-[#c8a96b]'
                    : 'w-1.5 sm:w-2 h-1.5 sm:h-2 bg-white/50 hover:bg-white/80'
                }`}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
