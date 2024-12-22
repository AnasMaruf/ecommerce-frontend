<template>
  <div>
    <BaseTimelineVerticalItem
      v-for="(item, index) in items"
      :key="index"
      :no-line="index === items.length - 1"
      v-bind="item"
    />
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped></style>
