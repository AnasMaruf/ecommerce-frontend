<template>
  <div class="flex gap-3">
    <NuxtImg
      :src="item?.product?.image_url"
      class="aspect-[1/1] object-cover"
      :class="sizeClasse[size]?.image"
      format="webp"
    />
    <div class="flex-1">
      <p class="line-clamp-2" :class="sizeClasse[size]?.title">
        {{ item.product?.name }}
      </p>
      <template v-if="!hideDescription">
        <p class="text-sm text-black/55">Variasi: {{ variantName }}</p>
        <p class="text-sm">x{{ item?.qty }}</p>
      </template>
    </div>
    <div v-if="!hidePrice" class="flex items-center">Rp{{ totalPrice }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
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
  item: {
    type: Object,
    default: () => ({}),
  },
});

const sizeClasse = {
  sm: {
    image: "h-14 w-14",
    title: "text-sm",
  },
  lg: {
    image: "h-20 w-20",
    title: "text-base",
  },
};

const variantName = computed(() =>
  (props.item?.variations || [])?.map((variant) => variant.value).join(", ")
);

const totalPrice = computed(() => formatNumber(props.item?.total || 0));
</script>

<style lang="scss" scoped></style>
