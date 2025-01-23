import GoogleSignInPlugin from "vue3-google-signin";

export default defineNuxtPlugin(async (nuxtApp) => {
  const runtimeConfig = useRuntimeConfig();
  nuxtApp.vueApp.use(GoogleSignInPlugin, {
    clientId: runtimeConfig.public.clientIdGoogleSignIn,
  });
});
