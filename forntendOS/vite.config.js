import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
   port: 4173,
   strictPort: true,
  },
  server: {
   port: 4173,
   strictPort: true,
   host: true,
   origin: "http://0.0.0.0:4173",
  },
  
})
