import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Login() {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <div className="min-h-screen bg-black pt-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <Link to="/" className="inline-block">
            <span className="font-playfair text-4xl font-bold gold-text">SARA</span>
            <p className="font-poppins text-[9px] tracking-[0.5em] text-gold/60 uppercase mt-1">Fashion</p>
          </Link>
        </div>

        {/* Toggle */}
        <div className="flex mb-8 border border-gold/20">
          {['login', 'register'].map(m => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`flex-1 py-3 text-xs font-poppins font-semibold tracking-widest uppercase transition-all duration-300 ${
                mode === m ? 'bg-gold text-black' : 'text-gray-400 hover:text-gold'
              }`}
            >
              {m === 'login' ? 'Login' : 'Register'}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="border border-gold/15 p-8"
          >
            <h2 className="font-playfair text-2xl text-white mb-2">
              {mode === 'login' ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p className="text-gray-500 text-xs font-poppins mb-8">
              {mode === 'login' ? 'Sign in to your Sara Fashion account' : 'Join the luxury experience'}
            </p>

            <div className="space-y-4">
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-poppins text-gray-400 tracking-wider uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/15 text-white font-poppins text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="Your full name"
                  />
                </div>
              )}
              <div>
                <label className="block text-xs font-poppins text-gray-400 tracking-wider uppercase mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/15 text-white font-poppins text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-xs font-poppins text-gray-400 tracking-wider uppercase mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/15 text-white font-poppins text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                  placeholder="••••••••"
                />
              </div>
              {mode === 'register' && (
                <div>
                  <label className="block text-xs font-poppins text-gray-400 tracking-wider uppercase mb-2">Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-white/5 border border-white/15 text-white font-poppins text-sm px-4 py-3 focus:outline-none focus:border-gold transition-colors"
                    placeholder="••••••••"
                  />
                </div>
              )}

              {mode === 'login' && (
                <div className="text-right">
                  <a href="#" className="text-xs font-poppins text-gold/60 hover:text-gold transition-colors">Forgot password?</a>
                </div>
              )}

              <button className="btn-gold w-full mt-2">
                {mode === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            </div>

            <p className="text-center text-gray-500 text-xs font-poppins mt-6">
              {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
              <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')} className="text-gold hover:underline">
                {mode === 'login' ? 'Register' : 'Login'}
              </button>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
