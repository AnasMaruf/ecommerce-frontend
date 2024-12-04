<template>
  <div class="input-quantity">
    <UButton
      color="white"
      icon="i-heroicons:minus"
      variant="none"
      :disabled="disabled"
      @click="handleDecrease"
    />
    <UInput
      v-model="model"
      type="number"
      :padded="false"
      variant="none"
      :disabled="disabled"
    />
    <UButton
      color="white"
      icon="i-heroicons:plus"
      variant="none"
      :disabled="disabled"
      @click="handleIncrease"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 10,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const model = defineModel({
  default: 1,
  type: Number,
});

function handleDecrease() {
  if (props.disabled) return;
  if (model.value > props.min) {
    model.value--;
  }
}

function handleIncrease() {
  if (props.disabled) return;
  if (model.value < props.max) {
    model.value++;
  }
}
</script>

<style scoped>
.input-quantity {
  @apply border;
  @apply flex;
  @apply divide-x;
}

.input-quantity :deep(input) {
  @apply h-full;
  @apply text-center;
  @apply w-14;
}

.input-quantity :deep(input)::-webkit-outer-spin-button,
.input-quantity :deep(input)::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
.input-quantity :deep(input)[type="number"] {
  -moz-appearance: textfield;
}
</style>
