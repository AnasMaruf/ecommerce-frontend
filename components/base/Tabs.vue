<template>
  <UTabs v-model="tabActive" :items="item" :ui="customUi">
    <template #item="slotScope">
      <slot name="item" v-bind="slotScope" />
    </template>
  </UTabs>
</template>

<script setup>
import defu from "defu";
const tabActive = defineModel({
  type: Number,
  default: 0,
});

const props = defineProps({
  item: {
    type: Array,
    default: () => [],
  },
  ui: {
    type: Object,
    default: () => {},
  },
});

const defaultUi = {
  list: {
    background: "bg-white border-b",
    padding: "p-0",
    rounded: "rounded-none",
    marker: {
      wrapper: "!top-[0px] left-0 !h-[100%] border-b-2 border-primary",
      rounded: "rounded-none",
      shadow: "shadow-none",
    },
    tab: {
      active: "text-primary",
      inactive: "text-black/80",
      rounded: "rounded-none",
    },
  },
};
const customUi = computed(() => defu(props.ui, defaultUi));
</script>

<style lang="scss" scoped></style>
