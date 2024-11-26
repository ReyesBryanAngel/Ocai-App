import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GlobalDataProvider } from './contexts/GlobalDataProvider.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalDataProvider>
      <App />
    </GlobalDataProvider>
  </StrictMode>,
)
