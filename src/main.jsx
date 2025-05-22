import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

import * as Sentry from "@sentry/react"

Sentry.init ({
  dsn: "https://8d41e6fdc33ab331216a41fe28fe98d9@o4509368298700800.ingest.us.sentry.io/4509368303812608",
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
