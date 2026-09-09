import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Note: StrictMode is intentionally omitted here. In dev, StrictMode double-invokes
// renders/effects to surface side-effect bugs, which would double every number in
// the Render Monitor and make the memoization demo confusing to read.
ReactDOM.createRoot(document.getElementById('root')).render(<App />)
