import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import heroImage1 from '../assets/images/banners/banner.png'
import heroImage2 from '../assets/images/banners/banner1.png'

const slides = [
  {
    image:   heroImage1,
    heading: 'Bridal & Festive\nCollection',
    sub:     '',
    cta:     'Explore Collection',
    ctaLink: '/products',
    pos:     '50% 20%',
  },
  {
    image:   heroImage2,
    heading: 'Modern Ethnic\nFashion',
    sub:     '',
    cta:     'Shop Now',
    ctaLink: '/products',
    pos:     '50% 0%',
  },
]

export default function HeroSection() {
  const [current, setCurrent] = useState(0)
  const [dir,     setDir]     = useState(1)

  const go = (idx) => {
    setDir(idx > current ? 1 : -1)
    setCurrent(idx)
  }
  const prev = () => go(current === 0 ? slides.length - 1 : current - 1)
  const next = () => go(current === slides.length - 1 ? 0 : current + 1)

  useEffect(() => {
    const t = setInterval(() => {
      setDir(1)
      setCurrent((p) => (p + 1) % slides.length)
    }, 5000)
    return () => clearInterval(t)
  }, [])

  const slide = slides[current]

  const imgVariants = {
    enter:  (d) => ({ opacity: 0, scale: 1.04, x: d > 0 ? 40 : -40 }),
    center: { opacity: 1, scale: 1, x: 0 },
    exit:   (d) => ({ opacity: 0, scale: 0.98, x: d > 0 ? -40 : 40 }),
  }

  return (
    /* mt accounts for fixed navbar top-bar height */
    <section className="relative w-full overflow-hidden bg-[#f8f3eb] mt-[58px] sm:mt-[64px] lg:mt-[70px] mb-0">

      {/* ── IMAGE CONTAINER ── */}
      <div className="relative w-full">

        {/* sliding image — full natural size, no cropping */}
        <AnimatePresence custom={dir} mode="sync">
          <motion.img
            key={current}
            src={slide.image}
            alt="Sara Central"
            custom={dir}
            variants={imgVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.75, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="w-full h-auto block select-none"
          />
        </AnimatePresence>

        {/* subtle gradient so text pops without hiding the women */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />

        {/* ── TEXT — sits at bottom-left ── */}
        <div className="absolute inset-0 z-20 flex flex-col justify-end items-start pb-8 sm:pb-14 md:pb-16 lg:pb-20 px-5 sm:px-10 md:px-14 lg:px-20">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.55, delay: 0.15 }}
              className="flex flex-col gap-3 sm:gap-4 max-w-[90%] sm:max-w-[520px] md:max-w-[580px]"
            >
              <h1
                className="text-[24px] sm:text-[36px] md:text-[50px] lg:text-[62px] xl:text-[70px] font-bold text-white leading-[1.08] tracking-tight drop-shadow-lg"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                {slide.heading.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </h1>
              {slide.sub && (
                <p className="text-[13px] sm:text-[15px] md:text-[16px] text-white/80 leading-relaxed drop-shadow">
                  {slide.sub}
                </p>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── DOTS ── */}
        <div className="absolute bottom-4 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
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
    </section>
  )
}
