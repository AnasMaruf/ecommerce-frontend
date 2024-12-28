export default defineNuxtRouteMiddleware(async () => {
  const token = "randomToken";
  if (token) {
    console.log("get profile");
  }
});
