<template>
  <div>
    <ClientOnly>
      <div ref="wrapperGoogleButton">
        <GoogleSignInButton
          class="google-button"
          :width="wrapperGoogleButton?.offsetWidth"
          @success="handleLoginSuccess"
        />
      </div>
    </ClientOnly>

    <UModal
      :model-value="isLoading"
      prevent-close
      :ui="{
        width: 'sm:max-w-sm',
      }"
    >
      <UCard>
        <div class="p-4">
          <IconLoading class="w-20 h-20 text-primary mx-auto" />
          <div class="mt-6">
            <p class="text-2xl text-center">Anda Berhasil Login</p>
            <p class="text-sm text-black/55 text-center mt-2">
              Mohon ditunggu, anda akan segera dialihkan...
            </p>
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
const session = useSession();
const nuxtApp = useNuxtApp();

const wrapperGoogleButton = ref();
const { status, error, execute, data } = useSubmit("/server/api/google-auth");

const token = useCookie("access_token");

const { execute: getProfile, status: statusProfile } = useApi(
  "/server/api/profile",
  {
    immediate: false,
    onResponse({ response }) {
      if (response.ok) {
        session.profile = response._data.data;

        nuxtApp.runWithContext(() => {
          navigateTo("/");
        });
      }
    },
  }
);

const isLoading = computed(
  () => status.value === "pending" || statusProfile.value === "pending"
);

async function handleLoginSuccess(response) {
  await execute({
    token: response.credential,
  });

  if (error.value) return;

  if (status.value === "success") {
    session.token = data.value.data?.token;
    token.value = data.value.data?.token;
    getProfile();
  }
}
</script>

<style scoped>
.google-button {
  @apply w-full;
}
</style>
