<template>
  <section class="bg-primary">
    <UContainer class="grid grid-cols-2 h-full py-20">
      <div class="flex justify-center items-center">
        <div class="flex flex-col gap-14 text-white text-center">
          <h1 class="text-8xl">Syopo</h1>
          <p>Tempat Belanja Online No. 1<br />di Asia Tengara dan Taiwan</p>
        </div>
      </div>
      <div>
        <UCard
          class="w-96"
          :ui="{
            rounded: 'rounded-sm',
          }"
        >
          <h2>Daftar</h2>
          <form class="mt-7 space-y-7" @submit.prevent="handleSubmit">
            <UFormGroup :error="v$.email.$errors?.[0]?.$message">
              <UInput
                v-model="registrationForm.email"
                placeholder="Email"
                size="lg"
              />
            </UFormGroup>
            <UButton
              :loading="status === 'pending'"
              type="submit"
              block
              class="uppercase"
              >Berikutnya</UButton
            >
          </form>
          <UDivider
            label="ATAU"
            class="my-4"
            :ui="{
              label: 'text-gray-300 font-normal',
            }"
          />
          <BaseButtonGoogleSignIn />
          <p class="text-sm font-normal text-black/25 text-center mt-8">
            Punya akun?
            <NuxtLink to="/login" class="text-primary">Log in</NuxtLink>
          </p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

definePageMeta({
  layout: "auth",
  header: {
    title: "Daftar",
  },
  middleware: ["must-not-auth"],
});

const router = useRouter();
const { registrationForm } = storeToRefs(useSession());

const rules = {
  email: { required, email },
};

const $externalResults = ref({});

const v$ = useVuelidate(rules, registrationForm, {
  $autoDirty: true,
  $externalResults,
});

const { status, error, execute } = useSubmit("/server/api/register");

async function handleSubmit() {
  $externalResults.value = {};

  const isValid = await v$.value.$validate();
  if (!isValid) return;

  await execute({
    email: registrationForm.value.email,
  });

  if (error.value) {
    $externalResults.value = error.value.data?.meta?.validations || {};
    return;
  }

  if (status.value === "success") {
    router.push("/registration/form");
  }
}
</script>

<style lang="scss" scoped></style>
