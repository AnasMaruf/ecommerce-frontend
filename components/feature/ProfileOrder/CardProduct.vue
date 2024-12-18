<template>
  <div class="flex gap-3">
    <img
      src="https://picsum.photos/1920/1000?random=1"
      class="aspect-[1/1] w-20 h-20 object-cover"
      :class="sizeClasses[size]?.image"
    />
    <div class="flex-1">
      <p class="line-clamp-2" :class="sizeClasses[size]?.title">Product Name</p>
      <template v-if="!hideDescription">
        <p class="text-sm text-black/55">Variasi: white, 39</p>
        <p class="text-sm">x1</p>
      </template>
    </div>
    <div v-if="!hidePrice" class="flex items-center">
      Rp.{{ formatNumber(100000) }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  hidePrice: {
    type: Boolean,
    default: false,
  },
  hideDescription: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: "lg",
    validator: (propsValue) => ["sm", "lg"].includes(propsValue),
  },
});

const sizeClasses = {
  sm: {
    image: "h-14 w-14",
    title: "text-sm",
  },
  lg: {
    image: "h-20 w-20",
    title: "text-base",
  },
};
</script>

<style scoped></style>
