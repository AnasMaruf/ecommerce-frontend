<template>
  <div>
    <UCarousel
      ref="carouselElement"
      :items="items"
      :ui="{
        item: 'basis-full',
        container: 'h-full',
      }"
      class="max-h-[450px] aspect-[1/1]"
    >
      <template #default="{ item }">
        <img
          :src="item"
          class="w-full aspect-[1/1] object-cover"
          draggable="false"
        />
      </template>
    </UCarousel>
    <div class="mt-3">
      <UCarousel
        ref="indicatorsElement"
        :items="items"
        :ui="{
          item: 'basis-1/5',
        }"
        :prev-button="{
          class:
            'text-white bg-black/20 rounded-none px-1 py-3 left-1 shadow-none',
          icon: 'i-heroicons:chevron-left',
        }"
        :next-button="{
          class:
            'text-white bg-black/20 rounded-none px-1 py-3 right-1 shadow-none',
          icon: 'i-heroicons:chevron-right',
        }"
        arrows
        class="max-w-[450px]"
      >
        <template #default="{ item, index }">
          <img
            :src="item"
            class="max-w-[82px] aspect-[1/1] m-1 object-cover"
            :class="[
              carouselElement?.page === index + 1
                ? 'ring ring-primary'
                : 'ring-0',
            ]"
            role="button"
            @click="carouselElement?.select(index + 1)"
          />
        </template>
      </UCarousel>
    </div>
  </div>
</template>

<script setup>
defineProps({
  items: {
    type: Array,
    default: () => [],
  },
});

const carouselElement = ref();
const indicatorsElement = ref();

let intervalId;
onMounted(() => {
  intervalId = setInterval(() => {
    if (!carouselElement.value) return;

    if (carouselElement.value.page === carouselElement.value.pages) {
      indicatorsElement.value.select(0);
      return carouselElement.value.select(0);
    }

    if (carouselElement.value.page >= 5) {
      indicatorsElement.value.next();
    }

    carouselElement.value.next();
  }, 5000);
});
onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style lang="scss" scoped></style>
