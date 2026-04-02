import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import HedgeFundTracker from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HedgeFundTracker />
  </StrictMode>,
)
