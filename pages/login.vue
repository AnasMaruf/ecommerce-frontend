<template>
  <section class="bg-primary">
    <UContainer class="grid grid-cols-2 h-full py-10">
      <div class="flex justify-center items-center">
        <div class="flex flex-col gap-14 text-white text-center">
          <h1 class="text-8xl">Syopo</h1>
          <p>
            Tempat belanja online No. 1<br />
            di Asia Tenggara dan Taiwan
          </p>
        </div>
      </div>
      <div>
        <UCard class="w-96" :ui="{ rounded: 'rounded-sm' }">
          <h2>Login</h2>
          <form class="mt-7 space-y-7" @submit.prevent="handleSubmit">
            <UFormGroup :error="v$.phone_email.$errors?.[0]?.$message">
              <UInput
                v-model="form.phone_email"
                placeholder="No. Handphone/Email"
                size="lg"
              />
            </UFormGroup>
            <UFormGroup :error="v$.password.$errors?.[0]?.$message">
              <BaseInputPassword
                v-model="form.password"
                placeholder="Password"
                size="lg"
              />
            </UFormGroup>
            <div>
              <UButton
                type="submit"
                block
                :loading="status === 'pending' || statusProfile === 'pending'"
                >Log In</UButton
              >
              <UButton
                variant="link"
                color="blue"
                :padded="false"
                to="/forgot-password"
                >Lupa Password</UButton
              >
            </div>
          </form>
          <UDivider
            label="ATAU"
            class="my-4"
            :ui="{ label: 'text-gray-400 font-normal' }"
          />
          <UButton block color="white"
            ><img
              src="~/assets/images/google.png"
              alt=""
              class="w-6"
            />Google</UButton
          >
          <p class="text-sm font-normal text-black/55 text-center mt-8">
            Baru di Syopo?
            <NuxtLink to="/registration" class="text-primary"
              >Daftar Sekarang</NuxtLink
            >
          </p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { email, helpers, minLength, required } from "@vuelidate/validators";

definePageMeta({
  layout: "auth",
  header: {
    title: "Login",
  },
});

const session = useSession();
const { profile, token: tokenSession } = storeToRefs(session);
const token = useCookie("access_token");

const nuxtApp = useNuxtApp();

const form = ref({
  phone_email: "",
  password: "",
});

const rules = {
  phone_email: {
    required,
    isValidUsername: helpers.withMessage("Value is not valid", (value) => {
      if (value) {
        if (/^\d{4}/.test(value)) {
          // checking phone number
          return /^\d+$/.test(value);
        }

        // chekcing email
        return email.$validator(value);
      }
      return true;
    }),
  },
  password: { required, minLength: minLength(8) },
};

const v$ = useVuelidate(rules, form, { $autoDirty: true });

const { status, execute, error, data } = useSubmit("/server/api/login");

const { execute: getProfile, status: statusProfile } = useApi(
  "/server/api/profile",
  {
    immediate: false,
    onResponse({ response }) {
      if (response.ok) {
        profile.value = response._data?.data;
        nuxtApp.runWithContext(() => {
          navigateTo("/");
        });
      }
    },
  }
);
async function handleSubmit() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  await execute(form.value);

  if (error.value) {
    // alert(error.value.message);
    return;
  }

  if (status.value === "success" && data.value?.data?.token) {
    tokenSession.value = data.value?.data?.token;
    token.value = data.value?.data?.token;
    getProfile();
  }
}
</script>

<style scoped></style>
