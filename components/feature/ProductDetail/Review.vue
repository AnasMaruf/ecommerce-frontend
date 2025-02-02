<template>
  <UCard>
    <h3 class="text-lg font-normal text-black/85">Penilaian Produk</h3>
    <div
      class="mt-3 border border-primary-100/80 bg-primary-50/30 rounded-sm p-8 flex gap-8 items-center"
    >
      <div class="flex flex-col items-center">
        <p class="text-primary text-lg">
          <span class="text-3xl">{{ detail.rating }}</span> dari 5
        </p>
        <BaseRating
          :model-value="detail.rating"
          disabled
          size="lg"
          class="mt-2"
        />
      </div>
      <div class="flex flex-wrap gap-2 items-center">
        <UButton
          v-for="filter in filterList"
          :key="filter.label"
          :variant="filterParam === filter.value ? 'outline' : 'solid'"
          :color="filterParam === filter.value ? 'primary' : 'white'"
          size="xs"
          class="min-w-24 text-sm justify-center"
          @click="filterParam = filter.value"
        >
          {{ filter.label }}
        </UButton>
      </div>
    </div>
    <div class="flex flex-col mt-1 divide-y">
      <div
        v-for="review in data?.data"
        :key="`review-${review.user_name}`"
        class="flex gap-3 py-4"
      >
        <UAvatar
          :src="review.user_photo"
          :alt="review.user_name"
          icon="i-heroicons:user"
          size="lg"
          img-class="object-cover"
        />
        <div class="flex-1">
          <p>{{ review.user_name }}</p>
          <BaseRating :model-value="review.star_seller" disabled class="mt-1" />
          <div class="flex gap-1 mt-0.5 text-black/55 text-xs">
            <p>{{ review.created_at }}</p>
            |
            <p>{{ review.variations }}</p>
          </div>
          <p v-if="review.description" class="text-sm mt-2">
            {{ review.description }}
          </p>
          <div
            v-if="review.attachments?.length"
            class="flex gap-2 flex-wrap mt-2"
          >
            <NuxtImg
              v-for="attach in review.attachments"
              :key="attach"
              width="72px"
              height="72px"
              fit="cover"
              format="webp"
              :src="attach"
            />
          </div>
        </div>
      </div>
      <div v-if="status === 'pending'" class="flex gap-2 justify-center py-6">
        <IconLoading class="w-6 text-primary" />
        <p>Loading...</p>
      </div>
    </div>
    <div v-if="data?.total" class="flex justify-end pt-5">
      <BasePagination v-model="pagination.page" :total="data.total" />
    </div>
  </UCard>
</template>

<script setup>
const props = defineProps({
  detail: {
    type: Object,
    default: () => ({}),
  },
});

const route = useRoute();
const pagination = ref({
  page: 1,
});

const filterParam = ref("");

const { data, status } = useApi(
  computed(() => `/server/api/product/${route.params.slug}/review`),
  {
    params: computed(() => {
      const filter = {};
      if (filterParam.value) {
        const [key, value] = filterParam.value.split(":");
        Object.assign(filter, { [key]: value });
      }
      return {
        ...pagination.value,
        ...filter,
      };
    }),
    transform(response) {
      return response?.data
    },
  }
);

const filterList = computed(() => [
  {
    label: "Semua",
    value: "",
  },
  {
    label: `5 Bintang (${props.detail.review_summary?.[5]})`,
    value: "rating:5",
  },
  {
    label: `4 Bintang (${props.detail.review_summary?.[4]})`,
    value: "rating:4",
  },
  {
    label: `3 Bintang (${props.detail.review_summary?.[3]})`,
    value: "rating:3",
  },
  {
    label: `2 Bintang (${props.detail.review_summary?.[2]})`,
    value: "rating:2",
  },
  {
    label: `1 Bintang (${props.detail.review_summary?.[1]})`,
    value: "rating:1",
  },
  {
    label: `Dengan Komentar (${props.detail.review_summary?.with_description})`,
    value: "with_description:1",
  },
  {
    label: `Dengan Media (${props.detail.review_summary?.with_attachment})`,
    value: "with_attachment:1",
  },
]);
</script>

<style lang="scss" scoped></style>
