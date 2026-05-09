import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPhone, FiArrowRight, FiUser, FiCheck } from 'react-icons/fi'
import { useAuth } from '../context/AuthContext'
import logo from '../assets/images/logo/Sara-logo.png'

export default function Login() {
  const { login, user } = useAuth()
  const navigate        = useNavigate()
  const [params]        = useSearchParams()
  const redirect        = params.get('redirect') || '/'

  const [step,    setStep]    = useState('phone') // phone | otp | name
  const [phone,   setPhone]   = useState('')
  const [otp,     setOtp]     = useState(['', '', '', ''])
  const [genOtp,  setGenOtp]  = useState('')
  const [name,    setName]    = useState('')
  const [error,   setError]   = useState('')
  const [loading, setLoading] = useState(false)
  const [otpSent, setOtpSent] = useState(false)

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
    setTimeout(() => {
      setLoading(false)
      setOtpSent(true)
      setStep('otp')
    }, 1000)
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
    // check if returning user
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
    <div className="min-h-screen bg-[#f8f3eb] flex items-center justify-center px-4 pt-[70px] pb-10">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm bg-white rounded-2xl shadow-xl border border-[#eee] overflow-hidden"
      >
        {/* Header */}
        <div className="bg-[#111] px-6 py-6 text-center">
          <img src={logo} alt="Sara Central" className="h-10 w-auto object-contain mx-auto mb-2 brightness-0 invert" />
          <p className="text-white/70 text-[13px]">Sign in to your account</p>
        </div>

        <div className="px-6 py-7">
          <AnimatePresence mode="wait">

            {/* STEP 1 — Phone */}
            {step === 'phone' && (
              <motion.div key="phone" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-[18px] font-semibold text-[#1a1a1a] mb-1">Enter Phone Number</h2>
                <p className="text-[#888] text-[13px] mb-5">We'll send an OTP to verify your number</p>
                <form onSubmit={sendOtp} className="space-y-4">
                  <div className="flex items-center border border-[#ddd] rounded-xl overflow-hidden focus-within:border-[#c8a96b] transition-colors">
                    <div className="px-3 py-3 bg-[#f8f3eb] border-r border-[#ddd] flex items-center gap-1.5">
                      <FiPhone size={15} className="text-[#888]" />
                      <span className="text-[13px] text-[#555] font-medium">+91</span>
                    </div>
                    <input
                      type="tel"
                      inputMode="numeric"
                      maxLength={10}
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                      className="flex-1 px-3 py-3 text-[14px] outline-none bg-white"
                    />
                  </div>
                  {error && <p className="text-red-500 text-[12px]">{error}</p>}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#111] hover:bg-[#c8a96b] text-white py-3 rounded-full text-[14px] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    {loading ? 'Sending OTP…' : <><span>Send OTP</span><FiArrowRight size={15} /></>}
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 2 — OTP */}
            {step === 'otp' && (
              <motion.div key="otp" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-[18px] font-semibold text-[#1a1a1a] mb-1">Enter OTP</h2>
                <p className="text-[#888] text-[13px] mb-1">Sent to <span className="text-[#1a1a1a] font-medium">+91 {phone}</span></p>
                <div className="bg-[#f8f3eb] border border-[#e8dfc9] rounded-xl px-4 py-2.5 mb-5">
                  <p className="text-[12px] text-[#888]">Demo OTP: <span className="text-[#b68b45] font-bold tracking-widest text-[15px]">{genOtp}</span></p>
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
                        className="w-13 h-13 w-[52px] h-[52px] border-2 border-[#ddd] focus:border-[#c8a96b] rounded-xl text-center text-[20px] font-semibold outline-none transition-colors"
                      />
                    ))}
                  </div>
                  {error && <p className="text-red-500 text-[12px] text-center">{error}</p>}
                  <button
                    type="submit"
                    className="w-full bg-[#111] hover:bg-[#c8a96b] text-white py-3 rounded-full text-[14px] font-semibold transition-all duration-300"
                  >
                    Verify OTP
                  </button>
                  <button type="button" onClick={() => { setStep('phone'); setOtp(['','','','']); setError('') }}
                    className="w-full text-[13px] text-[#888] hover:text-[#c8a96b] transition-colors">
                    ← Change Number
                  </button>
                </form>
              </motion.div>
            )}

            {/* STEP 3 — Name */}
            {step === 'name' && (
              <motion.div key="name" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <h2 className="text-[18px] font-semibold text-[#1a1a1a] mb-1">Create Account</h2>
                <p className="text-[#888] text-[13px] mb-5">Almost there! Tell us your name</p>
                <form onSubmit={register} className="space-y-4">
                  <div className="flex items-center border border-[#ddd] rounded-xl overflow-hidden focus-within:border-[#c8a96b] transition-colors">
                    <div className="px-3 py-3 bg-[#f8f3eb] border-r border-[#ddd]">
                      <FiUser size={15} className="text-[#888]" />
                    </div>
                    <input
                      type="text"
                      placeholder="Your full name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="flex-1 px-3 py-3 text-[14px] outline-none bg-white"
                    />
                  </div>
                  {error && <p className="text-red-500 text-[12px]">{error}</p>}
                  <button
                    type="submit"
                    className="w-full bg-[#c8a96b] hover:bg-[#111] text-white py-3 rounded-full text-[14px] font-semibold transition-all duration-300 flex items-center justify-center gap-2"
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
