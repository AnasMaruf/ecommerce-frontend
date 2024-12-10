<template>
  <section class="bg-white">
    <UContainer class="py-14">
      <UCard class="max-w-[500px] mx-auto custom-shadow">
        <!-- <FeatureForgotPasswordOtp /> -->
        <FeatureForgotPassword />
      </UCard>
    </UContainer>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  header: {
    class: "custom-shadow sticky top-8 z-40",
    title: "Reset Password",
  },
});
</script>
