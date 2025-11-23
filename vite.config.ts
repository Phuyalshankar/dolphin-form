import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'DolphinForm',
      fileName: (format) => `index.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'dolphincss', 'lucide-react'],
      output: {
        // ✅ Export warning fix
        exports: 'named',
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'dolphincss': 'dolphincss',
          'lucide-react': 'lucideReact'
        }
      }
    },
    // ✅ CSS bundle नबनाउने
    cssCodeSplit: false
  }
});