// src/main.jsx

import React from 'react'
import ReactDOM from 'react-dom/client'

/* GLOBAL STYLES */
import './index.css'

/* APP */
import App from './App.jsx'

/* -------------------------------- */
/* ROOT RENDER */
/* -------------------------------- */

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <App />

  </React.StrictMode>
)