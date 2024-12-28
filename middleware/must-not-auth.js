export default defineNuxtRouteMiddleware(async () => {
  const session = useSession();

  if (session.tokenCookie) {
    return navigateTo("/my-account/profile", {
      external: true
    });
  }
});



// 1. ssr
// 2. csr

// 1. /registration csr, plugin gak jalan
// 2. routing /my-account/profile, secara csr, session gak ada