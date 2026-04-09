import { ViteReactSSG } from 'vite-react-ssg/single-page'
import { Analytics } from '@vercel/analytics/react'
import App from './App.tsx'
import './index.css'

export const createRoot = ViteReactSSG(
  <>
    <App />
    <Analytics />
  </>
)
