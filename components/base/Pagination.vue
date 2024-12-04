<template>
  <UPagination
    v-model="page"
    :page-count="5"
    :total="total"
    :inactive-button="{
      variant: 'link',
      class: 'text-black/40 hover:text-primary px-3 py-1',
    }"
    :active-button="{
      class: 'px-3 py-1',
    }"
    :prev-button="{
      variant: 'link',
      class: 'text-black/40 hover:text-primary px-3 py-1',
    }"
    :next-button="{
      variant: 'link',
      class: 'text-black/40 hover:text-primary px-3 py-1',
    }"
    :ui="{
      wrapper: 'space-x-4',
      base: 'text-xl font-light',
      default: {
        prevButton: {
          icon: 'i-heroicons:chevron-left',
        },
        nextButton: {
          icon: 'i-heroicons:chevron-right',
        },
      },
    }"
  />
</template>

<script setup>
const page = defineModel({
  type: Number,
});
defineProps({
  total: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped></style>
