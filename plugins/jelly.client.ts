// plugins/jelly.client.ts
import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin(() => {
  if (process.server) return
  if ((window as any).Jelly) return
  const s = document.createElement('script')
  s.src = 'https://unpkg.com/jelly.js' // либо твой хост jelly
  document.head.appendChild(s)
})
