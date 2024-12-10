<template>
  <section class="bg-white">
    <UContainer class="py-14">
      <div class="max-w-[500px] mx-auto">
        <div class="step-header">
          <template v-for="(step, index) in registrationStep" :key="step.key">
            <div class="step-item" :class="[index <= stepActive && 'is-done']">
              <div class="step-item-icon">
                {{ index + 1 }}
              </div>
              <p class="step-item-title">{{ step.title }}</p>
            </div>
            <IconStepArrow
              v-if="index < registrationStep.length - 1"
              class="mb-6"
            />
          </template>
        </div>
        <UCard class="custom-shadow">
          <component
            :is="registrationStep[stepActive].component"
            @next="handleNext(registrationStep[stepActive].key)"
            @back="handleBack(registrationStep[stepActive].key)"
          />
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { FormCompleted, FormOtp, FormPassword } from "#components";
definePageMeta({
  layout: "auth",
  header: {
    class: "custom-shadow sticky top-8 z-40",
    title: "Daftar",
  },
});
const router = useRouter();
const stepActive = ref(0);
const registrationStep = [
  {
    key: "otp",
    title: "Verifikasi Email",
    component: FormOtp,
  },
  {
    key: "password",
    title: "Buat Password",
    component: FormPassword,
  },
  {
    key: "completed",
    title: "Selesai",
    component: FormCompleted,
  },
];

function handleNext() {
  stepActive.value++;
}

function handleBack(stepKey) {
  if (stepKey === "otp") {
    return router.push("/registration");
  }
  stepActive.value--;
}
</script>

<style>
.auth-shadow {
  box-shadow: 0px 3px 10px 0px #00000024;
}
.step-header {
  @apply flex justify-between gap-2 items-center;
  @apply mb-16;
}
.step-item {
  @apply flex flex-col items-center;
}
.step-item-icon {
  @apply rounded-full px-3 py-1 ring-1 ring-inset ring-black/25;
  @apply flex items-center justify-center;
  @apply text-black/25;
}
.step-item-title {
  @apply text-black/25 text-xs font-normal mt-1;
}
.step-item.is-done .step-item-icon {
  @apply bg-green-500 text-white ring-transparent;
}
.step-item.is-done .step-item-title {
  @apply text-green-500;
}
</style>
