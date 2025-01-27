<template>
  <UFormGroup :ui="customUi">
    <template v-for="(_, slotName) in $slots" #[slotName]="slotScope">
      <slot :name="slotName" v-bind="slotScope" />
    </template>
  </UFormGroup>
</template>

<script setup>
import defu from "defu";
const props = defineProps({
  ui: {
    type: Object,
    default: () => ({}),
  },
});
const defaultUi = {
  wrapper: "flex gap-11",
  container: "flex-1",
  label: {
    wrapper: "pt-3",
    base: "font-normal text-black/55 text-base w-24 text-right text-sm",
  },
};

const customUi = computed(() => defu(props.ui, defaultUi));
</script>

<style lang="scss" scoped></style>
