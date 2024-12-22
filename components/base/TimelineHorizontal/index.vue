<template>
  <div>
    <BaseTimelineHorizontalItem
      v-for="(item, index) in items"
      :key="index"
      :no-line-left="!index"
      :no-line-right="index >= items.length - 1"
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
