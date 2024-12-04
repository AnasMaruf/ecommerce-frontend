<template>
  <UCarousel
    v-slot="{ item }"
    ref="carouselRef"
    :items="items"
    :ui="{ item: 'basis-full' }"
    class="rounded-lg overflow-hidden max-w-[796px] max-h-[235px] mx-auto aspect-[3.39/1]"
    indicators
  >
    <img :src="item" class="w-full object-cover" draggable="false" />
  </UCarousel>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const carouselRef = ref();
let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    if (!carouselRef.value) return;

    if (carouselRef.value.page === carouselRef.value.pages) {
      return carouselRef.value.select(0);
    }

    carouselRef.value.next();
  }, 3000);
});

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style lang="scss" scoped></style>
