<template>
  <UCard
    :ui="{
      rounded: 'rounded-sm',
      shadow: 'shadow',
    }"
  >
    <template #default>
      <slot name="header">
        <div class="flex justify-between gap-4 items-center">
          <h3 class="font-medium text-xl">{{ title }}</h3>
          <slot name="header-append" />
        </div>
      </slot>
      <slot />
    </template>
  </UCard>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
