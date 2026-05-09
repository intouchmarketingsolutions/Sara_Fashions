import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiArrowRight, FiUser, FiCheck } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, user } = useAuth()
  const navigate        = useNavigate()
  const [params]        = useSearchParams()
  const redirect        = params.get('redirect') || '/'

  const [step,    setStep]    = useState('phone')
  const [phone,   setPhone]   = useState('')
  const [otp,     setOtp]     = useState(['', '', '', ''])
  const [genOtp,  setGenOtp]  = useState('')
  const [name,    setName]    = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const otpRefs = [useRef(), useRef(), useRef(), useRef()]

  useEffect(() => { if (user) navigate(redirect, { replace: true }) }, [user])
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const sendOtp = (e) => {
    e.preventDefault()
    setError('')
    if (phone.length !== 10) { setError('Enter a valid 10-digit phone number'); return }
    setLoading(true)
    const code = String(Math.floor(1000 + Math.random() * 9000))
    setGenOtp(code)
    setTimeout(() => { setLoading(false); setStep('otp') }, 1000)
  }

  const handleOtpChange = (val, idx) => {
    if (!/^\d*$/.test(val)) return
    const next = [...otp]
    next[idx] = val.slice(-1)
    setOtp(next)
    if (val && idx < 3) otpRefs[idx + 1].current?.focus()
    if (!val && idx > 0) otpRefs[idx - 1].current?.focus()
  }

  const verifyOtp = (e) => {
    e.preventDefault()
    setError('')
    const entered = otp.join('')
    if (entered.length !== 4) { setError('Enter the 4-digit OTP'); return }
    if (entered !== genOtp)   { setError('Incorrect OTP. Please try again.'); return }
    const existing = JSON.parse(localStorage.getItem(`sara_user_${phone}`) || 'null')
    if (existing) { login(existing); return }
    setStep('name')
  }

  const register = (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim()) { setError('Please enter your name'); return }
    const newUser = { name: name.trim(), phone }
    localStorage.setItem(`sara_user_${phone}`, JSON.stringify(newUser))
    login(newUser)
  }

  return (
    <div className="min-h-screen bg-[#f8f3eb] flex items-start justify-center px-4 pt-[70px] pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[400px] bg-white rounded-3xl shadow-2xl border border-[#e8e0d4] overflow-hidden"
      >

        {/* ── Header ── */}
        <div className="bg-[#111] pt-8 pb-6 px-7 text-center">
          <h1 className="text-[26px] font-bold tracking-widest text-[#c8a96b] uppercase">Sara</h1>
          <div className="w-10 h-px bg-[#c8a96b]/50 mx-auto mt-3 mb-3" />
          <p className="text-[#c8a96b]/80 text-[12px] font-semibold tracking-[3px] uppercase">Sign in to your account</p>
        </div>

        {/* ── Form Area ── */}
        <div className="px-7 py-8">
          <AnimatePresence mode="wait">

            {/* STEP 1 — Phone */}
            {step === 'phone' && (
              <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-6">
                  <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-1">Enter Phone Number</h2>
                  <p className="text-[#888] text-[13px]">We'll send an OTP to verify your number</p>
                </div>
                <form onSubmit={sendOtp} className="space-y-4">
                  <div className="flex items-center border border-[#ddd] rounded-xl overflow-hidden focus-within:border-[#c8a96b] transition-colors">
                    <div className="px-3 py-3.5 bg-[#f8f3eb] border-r border-[#ddd] flex items-center gap-2">
                      <FiPhone size={15} className="text-[#888]" />
                      <span className="text-[13px] text-[#555] font-semibold">+91</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-3 py-3.5 text-[14px] outline-none bg-white placeholder-[#bbb]"
                    />
                  </div>
                  {error && <p className="text-red-500 text-[12px] text-center">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#c8a96b] hover:bg-[#b8944f] text-white py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending OTP…' : <><span>Send OTP</span><FiArrowRight size={15} /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2 — OTP */}
            {step === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-6">
                  <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-1">Enter OTP</h2>
                  <p className="text-[#888] text-[13px]">Sent to <span className="text-[#1a1a1a] font-semibold">+91 {phone}</span></p>
                </div>
                <div className="bg-[#f8f3eb] border border-[#e8dfc9] rounded-xl px-4 py-2.5 mb-6 text-center">
                  <p className="text-[12px] text-[#888]">Demo OTP: <span className="text-[#b68b45] font-bold tracking-[6px] text-[16px]">{genOtp}</span></p>
                </div>
                <form onSubmit={verifyOtp} className="space-y-5">
                  <div className="flex gap-3 justify-center">
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        ref={otpRefs[i]}
                        type="tel"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(e.target.value, i)}
                        onKeyDown={(e) => { if (e.key === 'Backspace' && !otp[i] && i > 0) otpRefs[i-1].current?.focus() }}
                        className="w-[56px] h-[56px] border-2 border-[#ddd] focus:border-[#c8a96b] rounded-xl text-center text-[22px] font-bold outline-none transition-colors bg-[#fafafa]"
                      />
                    ))}
                  </div>
                  {error && <p className="text-red-500 text-[12px] text-center">{error}</p>}
                  <button
                    type="submit"
                    className="w-full bg-[#c8a96b] hover:bg-[#b8944f] text-white py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300"
                  >
                    Verify OTP
                  </button>
                  <button
                    type="button"
                    onClick={() => { setStep('phone'); setOtp(['','','','']); setError('') }}
                    className="w-full text-[13px] text-[#888] hover:text-[#c8a96b] transition-colors text-center"
                  >
                    ← Change Number
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3 — Name */}
            {step === 'name' && (
              <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <div className="text-center mb-6">
                  <h2 className="text-[20px] font-bold text-[#1a1a1a] mb-1">Create Account</h2>
                  <p className="text-[#888] text-[13px]">Almost there! Tell us your name</p>
                </div>
                <form onSubmit={register} className="space-y-4">
                  <div className="flex items-center border border-[#ddd] rounded-xl overflow-hidden focus-within:border-[#c8a96b] transition-colors">
                    <div className="px-3 py-3.5 bg-[#f8f3eb] border-r border-[#ddd]">
                      <FiUser size={15} className="text-[#888]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 px-3 py-3.5 text-[14px] outline-none bg-white placeholder-[#bbb]"
                    />
                  </div>
                  {error && <p className="text-red-500 text-[12px] text-center">{error}</p>}
                  <button
                    type="submit"
                    className="w-full bg-[#c8a96b] hover:bg-[#b8944f] text-white py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <FiCheck size={15} /> Create Account
                  </button>
                </form>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </motion.div>
    </div>
  )
}
