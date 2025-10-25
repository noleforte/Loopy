// nuxt.config.ts
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/style.css'],
  modules: ['@pinia/nuxt'],
  // ❌ УДАЛИ это: 'public/media/plugins/jelly.client.ts'
  // ✅ Либо вообще убери поле plugins (автоимпорт),
  //    либо пропиши так:
  plugins: ['~/plugins/jelly.client.ts'],

  nitro: {
    preset: 'netlify-static',
    prerender: { routes: ['/'] }
  },
  ssr: false,
  vite: {
    css: {
      preprocessorOptions: {
        scss: { additionalData: `@import "~/assets/css/style.css";` }
      }
    }
  },
  app: {
    head: {
      title: 'Loopy - Experience the future of web design',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Experience the future of web design with Loopy' }
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/media/favicon.png' }],
      script: [
        {
          src: 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.3/gsap.min.js',
          integrity: 'sha512-gmwBmiTVER57N3jYS3LinA9eb8aHrJua5iQD7yqYCKa5x6Jjc7VDVaEA0je0Lu0bP9j7tEjV3+1qUm6loO99Kw==',
          crossorigin: 'anonymous',
          referrerpolicy: 'no-referrer'
        }
      ]
    }
  }
})
