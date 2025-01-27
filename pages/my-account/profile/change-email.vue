<template>
  <div>
    <h3 class="text-xl font-medium">Ganti Email</h3>
    <hr class="mt-5 mb-11 border-gray-200/60" />
    <form @submit.prevent="handleSubmit">
      <UFormGroup
        label="Email Baru"
        :ui="{
          wrapper: 'flex gap-16',
          container: 'w-96',
          label: {
            wrapper: 'pt-2',
            base: 'font-normal text-black/55 text-base',
          },
        }"
        :error="!!v$.email.$errors?.[0]?.$message"
      >
        <UInput
          v-model="form.email"
          size="lg"
          placeholder="Masukkan Email-mu"
        />
        <p v-if="v$.$invalid" class="text-sm text-red-500 mt-1">
          {{ v$.email.$errors?.[0]?.$message }}
        </p>
        <UButton
          type="submit"
          label="Selanjutnya"
          class="mt-8"
          :loading="status === 'pending'"
          :disabled="v$.$invalid"
        />
      </UFormGroup>
    </form>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

const session = useSession();
const router = useRouter();

const form = ref({
  email: "",
});

const rules = {
  email: { required, email },
};

const $externalResults = ref({});
const v$ = useVuelidate(rules, form, {
  $autoDirty: true,
  $externalResults,
});

const { execute, status, error } = useSubmit("/server/api/profile");

async function handleSubmit() {
  $externalResults.value = {};
  const isValid = await v$.value.$validate();
  if (!isValid) return;
  await execute({
    email: form.value.email,
    gender: session.profile.gender,
    name: session.profile.name,
    _method: "PATCH",
  });

  if (error.value) {
    $externalResults.value = error.value.data?.meta?.validations || {};
    return;
  }

  if (status.value === "success") {
    session.profile.email = form.value.email;
    router.replace("/my-account/profile");
  }
}
</script>

<style lang="scss" scoped></style>
