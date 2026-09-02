import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!

const tree = (
  <StrictMode>
    <App />
  </StrictMode>
)

/**
 * Production HTML is prerendered by `scripts/prerender.mjs`, so the markup is
 * already in place and we adopt it. `vite dev` serves the bare template with an
 * empty root, which has nothing to hydrate — hence the branch.
 */
if (container.hasChildNodes()) {
  hydrateRoot(container, tree)
} else {
  createRoot(container).render(tree)
}
