export default defineNuxtRouteMiddleware(async () => {
  const session = useSession();
  if (!session.tokenCookie) {
    return navigateTo("/login", {
      external: true,
    });
  }

  if (!session.token) {
    session.token = session.tokenCookie;

    if (!session.profile.email) {
      const { data, error } = await useApi("/server/api/profile");

      if (error.value) {
        return session.logout();
      }

      if (data.value) {
        session.profile = data.value.data;
      }
    }
  }
});
