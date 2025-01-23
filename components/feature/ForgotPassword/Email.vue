<template>
  <div>
    <div class="flex gap-7 items-center">
      <UButton
        icon="i-heroicons:arrow-left"
        variant="link"
        @click="emit('back')"
      />
      <h3 class="text-xl font-normal">Reset Password</h3>
    </div>
    <div class="px-16 pb-16 pt-9">
      <form class="space-y-6" @submit.prevent="handleSubmit">
        <UFormGroup :error="v$.email.$errors?.[0]?.$message">
          <UInput v-model="form.email" placeholder="Email" size="lg" />
        </UFormGroup>
        <UButton
          type="submit"
          :loading="loading"
          :disabled="v$.$invalid"
          block
          class="uppercase"
        >
          Berikutnya
        </UButton>
      </form>
    </div>
  </div>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";

defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["next", "back"]);
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
async function handleSubmit() {
  $externalResults.value = {};
  const isValid = await v$.value.$validate();
  if (!isValid) return;
  emit("next", form.value);
}

defineExpose({
  setError: (error) => ($externalResults.value = error),
});
</script>

<style lang="scss" scoped></style>
