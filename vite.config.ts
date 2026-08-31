<<<<<<< HEAD
import path from 'path'
=======
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
<<<<<<< HEAD
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
=======
>>>>>>> db580f972c483f6255d365d1294f6f8b6325173d
})

