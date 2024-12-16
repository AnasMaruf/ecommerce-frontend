<template>
  <UModal v-model="open">
    <UCard>Modal</UCard>
  </UModal>
</template>

<script setup>
const open = defineModel("open", {
  type: Boolean,
  default: false,
});
</script>

<style scoped></style>
