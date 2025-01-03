export const useSession = defineStore("session", () => {
  const profile = ref({
    name: "",
    email: "",
    photo_url: "",
    username: "",
    phone: null,
    store_name: "",
    gender: null,
    birth_date: null,
    balance: 0,
  });
  const token = ref("");
  const tokenCookie = useCookie('access_token')

  const registrationForm = ref({
    email: "",
    otp: "",
    password: "",
    password_confirmation: "",
  });

  function resetRegistrationForm() {
    registrationForm.value = {
      email: "",
      otp: "",
      password: "",
      password_confirmation: "",
    };
  }

  function logout() {
    token.value = "";
    profile.value = {
      name: "",
      email: "",
      photo_url: "",
      username: "",
      phone: null,
      store_name: "",
      gender: null,
      birth_date: null,
      balance: 0,
    };
    tokenCookie.value = undefined
    navigateTo('/')
  }

  return { profile, token, logout, registrationForm, resetRegistrationForm, tokenCookie };
});
