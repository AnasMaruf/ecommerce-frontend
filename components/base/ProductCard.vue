<template>
  <NuxtLink class="product-card" :to="`/products/${slug}`">
    <div v-if="discount" class="product-discount">
      -{{ formattedDiscount }}%
    </div>
    <NuxtImg :src="image" format="webp" />
    <div class="product-card-detail">
      <p>
        {{ title }}
      </p>
      <div class="product-card-footer">
        <div class="product-price">
          <p><span>Rp</span>{{ formattedPrice }}</p>
        </div>
        <div v-if="sale !== undefined" class="product-sale">
          <p>{{ formattedSale }} Terjual</p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "",
  },
  price: {
    type: Number,
    default: 0,
  },
  sale: {
    type: Number,
    default: undefined,
  },
  discount: {
    type: Number,
    default: undefined,
  },
  slug: {
    type: String,
    default: "",
  },
});
const formattedPrice = computed(() => formatNumber(props.price));
const formattedSale = computed(() => formatNumber(props.sale));
const formattedDiscount = computed(() => formatNumber(props.discount));
</script>

<style scoped>
.product-card {
  @apply bg-white;
  @apply border;
  @apply relative;

  @apply hover:border-primary;
}

.product-discount {
  @apply absolute;
  @apply right-0;
  @apply bg-primary-50;
  @apply px-1 py-0.5;
  @apply text-primary text-xs font-normal;
}

.product-card img {
  @apply aspect-[1/1];
  @apply object-cover;
}

.product-card-detail {
  @apply p-2;
}
.product-card-detail p {
  @apply text-sm font-normal text-black/80;
  @apply line-clamp-2;
}

.product-card-footer {
  @apply mt-8;
  @apply flex justify-between gap-2 items-center;
}

.product-price p {
  @apply text-primary font-medium text-base;
}
.product-price span {
  @apply text-xs;
}

.product-sale p {
  @apply text-xs font-normal;
}
</style>
