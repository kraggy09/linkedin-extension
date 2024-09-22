import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Form from './component/Form.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form />
    {/* <App /> */}
  </StrictMode>,
)
