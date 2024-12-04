<template>
  <UButton variant="link" :color="color" :padded="false" to="/" class="logo"
    >Syopo</UButton
  >
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "white",
    validator: (propsValue) => ["white", "orange"].includes(propsValue),
  },
});
</script>

<style>
.logo {
  @apply !text-4xl !font-normal;
  @apply !no-underline;
}
</style>
