import path from 'path'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  build: {
    // The SSR bundle is a throwaway build artefact consumed once by
    // scripts/prerender.mjs, so splitting or minifying it buys nothing.
    ...(isSsrBuild
      ? {}
      : {
          rollupOptions: {
            output: {
              /**
               * Split the dependencies that change far less often than our own
               * code into their own chunks, so a copy tweak does not force
               * every returning visitor to re-download React and framer-motion.
               *
               * Deliberately *not* doing route-level `React.lazy` splitting:
               * `renderToString` in the prerender step cannot resolve lazy
               * components and would bake Suspense fallbacks into the static
               * HTML instead of the page content — which is the whole thing we
               * are trying to fix.
               */
              manualChunks(id: string) {
                if (!id.includes('node_modules')) return
                if (id.includes('framer-motion') || id.includes('motion-dom') || id.includes('motion-utils'))
                  return 'motion'
                // Matches react, react-dom and react-router-dom, which have to
                // land in one chunk to avoid a circular import between them.
                if (id.includes('node_modules/react') || id.includes('node_modules/scheduler'))
                  return 'react'
              },
            },
          },
        }),
  },
}))
