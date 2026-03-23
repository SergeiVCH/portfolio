import {defineConfig} from 'vite'
import react, {reactCompilerPreset} from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import Sitemap from 'vite-plugin-sitemap'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({presets: [reactCompilerPreset()]}),
    Sitemap({
      // Укажи здесь свой будущий домен (например, на Vercel или Netlify)
      hostname: 'https://https://sergei-dev.netlify.app/',

      // Так как у тебя Landing Page, мы можем указать пути-якоря
      // (хотя роботы лучше индексируют чистые пути, для SPA это полезно)
      dynamicRoutes: ['/', '/#about', '/#tech', '/#projects', '/#contact'],

      // Плагин сам создаст sitemap.xml в папке dist при сборке (pnpm build)
      generateRobotsTxt: true, // Это создаст и robots.txt автоматически!
    }),
  ],
})
