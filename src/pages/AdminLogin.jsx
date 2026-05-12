import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiLock, FiUser, FiEye, FiEyeOff } from 'react-icons/fi'

const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'sara_admin'
const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'Sara@2024'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      localStorage.setItem('sara_admin_session', '1')
      navigate('/admin')
    } else {
      setError('Invalid credentials. Please try again.')
    }
  }

  return (
    <div className="min-h-screen bg-[#111] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-[380px] bg-white rounded-3xl shadow-2xl overflow-hidden"
      >
        <div className="bg-[#111] border-b border-[#c8a96b]/30 px-7 py-8 text-center">
          <h1 className="text-[22px] font-bold text-[#c8a96b] tracking-widest uppercase">Sara Central</h1>
          <div className="w-10 h-px bg-[#c8a96b]/40 mx-auto mt-3 mb-2" />
          <p className="text-[#c8a96b]/70 text-[11px] tracking-[3px] uppercase">Admin Panel</p>
        </div>

        <div className="px-7 py-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="flex items-center border border-[#ddd] rounded-xl overflow-hidden focus-within:border-[#c8a96b] transition-colors">
              <div className="px-3 py-3.5 bg-[#f8f3eb] border-r border-[#ddd]">
                <FiUser size={15} className="text-[#888]" />
              </div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="flex-1 px-3 py-3.5 text-[14px] outline-none bg-white"
              />
            </div>

            <div className="flex items-center border border-[#ddd] rounded-xl overflow-hidden focus-within:border-[#c8a96b] transition-colors">
              <div className="px-3 py-3.5 bg-[#f8f3eb] border-r border-[#ddd]">
                <FiLock size={15} className="text-[#888]" />
              </div>
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="flex-1 px-3 py-3.5 text-[14px] outline-none bg-white"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="px-3 text-[#aaa] hover:text-[#c8a96b]">
                {showPass ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              </button>
            </div>

            {error && <p className="text-red-500 text-[12px] text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-[#c8a96b] hover:bg-[#b8944f] text-white py-3.5 rounded-full text-[14px] font-semibold transition-all duration-300"
            >
              Sign In
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  )
}
