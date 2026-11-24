import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// O Vite roda o projeto no navegador enquanto você estuda (npm run dev)
export default defineConfig({
  plugins: [react()],
  server: {
    open: true, // abre o navegador sozinho
  },
})
