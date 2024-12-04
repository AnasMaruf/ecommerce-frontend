<template>
  <div class="grid grid-cols-1 gap-1">
    <slot
      v-for="(item, index) in items"
      :key="`radio-card-item-${item.value}-${index}`"
      name="item"
      :selected="JSON.stringify(item.value) === JSON.stringify(model)"
      v-bind="item"
      @click="handleSelect(item.value)"
    />
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
    validator: (value) => {
      if (!Array.isArray(value)) return false;
      return "label" in value[0] && "value" in value[0];
    },
  },
});

const model = defineModel({
  type: String,
  default: "",
});

function handleSelect(value) {
  model.value = value;
}
</script>

<style lang="scss" scoped></style>
