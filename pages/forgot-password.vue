<template>
  <section class="bg-white">
    <UContainer class="py-14">
      <UCard class="max-w-[500px] mx-auto custom-shadow">
        <component
          :is="forgotPasswordStep[stepActive].component"
          @next="handleNext(forgotPasswordStep[stepActive].key)"
          @back="handleBack(forgotPasswordStep[stepActive].key)"
        />
      </UCard>
    </UContainer>
  </section>
</template>

<script setup>
import { FeatureForgotPasswordEmail, FormOtp, FormPassword } from "#components";
definePageMeta({
  layout: "auth",
  header: {
    class: "custom-shadow sticky top-8 z-40",
    title: "Reset Password",
  },
});
const router = useRouter();
const stepActive = ref(0);
const forgotPasswordStep = [
  {
    key: "forgot-password",
    component: FeatureForgotPasswordEmail,
  },
  {
    key: "otp",
    component: FormOtp,
  },
  {
    key: "password",
    component: FormPassword,
  },
];

function handleNext(stepKey) {
  if (stepKey === "password") {
    alert("Success reset password");
    return router.push("/login");
  }
  stepActive.value++;
}

function handleBack(stepKey) {
  if (stepKey === "forgot-password") {
    return router.push("/login");
  }
  stepActive.value--;
}
</script>
