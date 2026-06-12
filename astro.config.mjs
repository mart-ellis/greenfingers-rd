// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

export default defineConfig({
  output: 'server',
  fonts: [{
    provider: fontProviders.local(),
    name: "Humane",
    cssVariable: "--font-humane",
    options: {
      variants: [{
        src: ['./src/assets/fonts/Humane-Bold.woff2'],
        weight: 700,
        style: 'normal'
      }, {
        src: ['./src/assets/fonts/Humane-Medium.woff2'],
        weight: 500,
        style: 'normal'
      }]
    }
  }]
});


