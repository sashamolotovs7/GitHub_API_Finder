import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env file in development
dotenv.config();

export default defineConfig({
  envDir: './env',
  plugins: [react()],
  build: {
    outDir: 'dist', // Output directory for production build (default is 'dist')
  },
  server: {
    port: 3000, // Development port
  },
});
