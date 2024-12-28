// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: ["@nuxt/ui", "@nuxt/eslint", "@vueuse/nuxt", "@nuxt/image"],
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          href: "https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap",
          rel: "stylesheet",
        },
      ],
    },
  },
  routeRules: {
    "/server/**": { proxy: `${import.meta.env.NUXT_BASE_URL}/**` },
    "/registration/**": { ssr: false },
    "/cart": { ssr: false },
    "/checkout/**": { ssr: false },
  },
});
