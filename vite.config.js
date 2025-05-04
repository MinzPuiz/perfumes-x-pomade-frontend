import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  base: "/perfumes-x-pomade-frontend/",
  server: {
    proxy: {
      '/api': 'https://minzpuiz.click',  // Proxy yêu cầu API đến server bên ngoài
    }
  }
});
