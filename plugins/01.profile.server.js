export default defineNuxtPlugin(async () => {
  const token = useCookie("access_token");
  const session = useSession();

  if (token.value) {
    try {
      const response = await $fetch("/server/api/profile", {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      });

      if (response.data) {
        session.token = token.value;
        session.profile = response.data;
      }
    } catch {
      session.token = "";
      token.value = undefined;
    }
  }
});
