<template>
  <div :class="['searchbar', { 'no-padded': !padded }]">
    <input placeholder="CEK: flash sale Rp17 lokal" />
    <UButton
      type="submit"
      icon="i-heroicons:magnifying-glass"
      class="px-6"
      v-bind="attribute"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  padded: {
    type: Boolean,
    default: true,
  },
});

const attribute = computed(() => {
  if (!props.padded) {
    return {
      ui: {
        rounded: "rounded-none",
      },
    };
  }
  return {};
});
</script>

<style scoped>
.searchbar {
  @apply bg-white;
  @apply flex items-center;
  @apply rounded-sm;
  @apply text-black;
}

.searchbar:not(.no-padded) {
  @apply p-1;
}

.searchbar.no-padded {
  @apply border-2 border-primary;
}

.searchbar input {
  @apply outline-none pl-3;
  @apply flex-1;
}
</style>
