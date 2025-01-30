<template>
  <UContainer id="search-section">
    <div class="search-filter">
      <div class="filter-title">
        <IconFilter />
        <h2>Filter</h2>
      </div>
      <div class="filter-item">
        <h3>Batas Harga</h3>
        <div class="flex gap-2 items-center">
          <UInput
            v-model="temporaryPrice.minimum_price"
            type="number"
            placeholder="Rp MIN"
          />
          <div class="h-[1px] bg-gray-300 w-10" />
          <UInput
            v-model="temporaryPrice.maximum_price"
            type="number"
            placeholder="Rp MAX"
          />
        </div>
        <UButton block class="py-2" @click="applyFilterPrice">TERAPKAN</UButton>
      </div>
      <hr />
      <div class="filter-item">
        <h3>Berdasarkan Kategori</h3>
        <div class="flex flex-col gap-2">
          <UCheckbox
            v-for="cat in categories"
            :key="`cat-${cat.slug}`"
            v-model="formFilter.categories"
            :label="cat.name"
            :value="cat.slug"
          />
        </div>
      </div>
      <hr />
      <UButton block class="py-2" @click="resetFilter">HAPUS SEMUA</UButton>
    </div>
    <div class="search-result">
      <div v-if="route.query.search" class="search-keyword">
        <IconLamp />
        <p>
          Hasil pencarian untuk '<span>{{ route.query?.search }}</span
          >'
        </p>
      </div>
      <div class="search-sort">
        <div class="search-sort-control">
          <p>Urutkan</p>
          <UButton
            :color="formFilter.sorting_price === 'asc' ? 'primary' : 'white'"
            class="px-6"
            @click="formFilter.sorting_price = 'asc'"
            >Termurah</UButton
          >
          <UButton
            :color="formFilter.sorting_price === 'desc' ? 'primary' : 'white'"
            class="px-6"
            @click="formFilter.sorting_price = 'desc'"
            >Termahal</UButton
          >
        </div>
        <div v-if="data?.data?.data?.length" class="search-sort-pagination">
          <p>
            <span>{{ pagination.page }}</span
            >/{{ data?.data?.last_page || 0 }}
          </p>
          <div>
            <UButton
              icon="i-heroicons:chevron-left-20-solid"
              color="gray"
              size="xs"
              :disabled="!data?.data?.prev_page_url"
              @click="pagination.page--"
            />
            <UButton
              icon="i-heroicons:chevron-right-20-solid"
              color="gray"
              size="xs"
              class="bg-black/5"
              :disabled="!data?.data?.next_page_url"
              @click="pagination.page++"
            />
          </div>
        </div>
      </div>
      <div v-if="status === 'pending'" class="search-content">
        <div v-for="i in 5" :key="`loading-${i}`" class="bg-white p-2">
          <USkeleton class="aspect-[1/1]" />
          <USkeleton class="w-full h-4 mt-2" />
          <USkeleton class="w-8/12 h-4 mt-2" />
        </div>
      </div>
      <template v-else>
        <template v-if="data?.data?.data?.length">
          <div class="search-content">
            <BaseProductCard
              v-for="prod in data?.data?.data"
              :key="`product-${prod.uuid}`"
              :title="prod.name"
              :price="prod.price_sale || prod.price"
              :image="prod.image_url"
              :sale="prod.sale_count"
              :slug="prod.slug"
              :discount="prod.price_discount_percentage"
            />
          </div>
          <div class="flex justify-center mt-8">
            <BasePagination
              v-model="pagination.page"
              :total="data?.data?.total || 0"
            />
          </div>
        </template>
        <div v-else class="text-center py-4 text-black/65">
          Tidak ada product yang ditemukan
        </div>
      </template>
    </div>
  </UContainer>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const route = useRoute();
const router = useRouter();
const pagination = ref({
  page: 1,
});

const formFilter = ref({
  categories:
    (typeof route.query?.categories === "string"
      ? [route.query?.categories]
      : route.query?.categories) || [],
  minimum_price: route.query?.minimum_price || undefined,
  maximum_price: route.query?.maximum_price || undefined,
  sorting_price: route.query?.sorting_price || "asc",
});
const temporaryPrice = reactive({
  minimum_price: route.query?.minimum_price || undefined,
  maximum_price: route.query?.maximum_price || undefined,
});

const { data: categories } = useApi("/server/api/category", {
  key: "category-list",
  transform(response) {
    return (response?.data || []).reduce((result, parent) => {
      result.push(
        ...parent.childs.map((child) => ({
          ...child,
          icon: parent.icon,
          name: `${parent.name} - ${child.name}`,
        }))
      );
      return result;
    }, []);
  },
  getCachedData() {
    return (
      nuxtApp.payload.data?.["category-list"] ||
      nuxtApp.static.data?.["category-list"]
    );
  },
});

const { data, status } = useApi("/server/api/product", {
  params: computed(() => {
    return {
      search: route.query?.search,
      ...formFilter.value,
      ...pagination.value,
      categories: undefined,
      "categories[]": formFilter.value.categories,
    };
  }),
  dedupe: "defer",
});

watch(
  formFilter,
  (newFormFilter) => {
    router.push({
      query: {
        ...route.query,
        ...newFormFilter,
      },
    });
  },
  { deep: true }
);

function applyFilterPrice() {
  formFilter.value.minimum_price = temporaryPrice.minimum_price;
  formFilter.value.maximum_price = temporaryPrice.maximum_price;
}

function resetFilter() {
  formFilter.value = {
    categories: [],
    minimum_price: undefined,
    maximum_price: undefined,
    sorting_price: "asc",
  };

  temporaryPrice.minimum_price = undefined;
  temporaryPrice.maximum_price = undefined;
}

const titleMeta = computed(() =>
  route.query?.search
    ? `Sedang mencari produk ${route.query?.search}`
    : `Sedang mencari produk${
        route.query.categories ? ` ${route.query.categories}` : ""
      }`
);

useSeoMeta({
  title: titleMeta,
  ogTitle: () => `${titleMeta.value} | Syopo`,
  twitterTitle: () => `${titleMeta.value} | Syopo`,
  description: titleMeta,
  ogDescription: titleMeta,
  twitterDescription: titleMeta,
});
</script>

<style scoped>
#search-section {
  @apply py-6 flex gap-4;
}

.search-filter {
  @apply flex flex-col gap-5;
  @apply w-48;
}

.filter-title {
  @apply flex gap-2 items-center;
}

.filter-title h2 {
  @apply text-base font-bold text-black/80;
  @apply uppercase;
}

.filter-item {
  @apply flex flex-col gap-5;
}

.filter-item h3 {
  @apply text-sm text-black/80 font-medium;
}

.search-result {
  @apply flex-1;
}

.search-keyword {
  @apply flex items-center gap-2;
  @apply text-gray-600;
}

.search-keyword span {
  @apply text-primary;
}

.search-sort {
  @apply flex items-center gap-2 justify-between;
  @apply px-5 py-3;
  @apply bg-black/5;
  @apply mt-4;
}

.search-sort-control {
  @apply flex gap-3 items-center;
}

.search-sort-control p {
  @apply text-gray-600 text-sm font-normal;
}

.search-sort-pagination {
  @apply flex gap-5 items-center;
}

.search-sort-pagination p {
  @apply text-sm font-normal text-black/80;
}

.search-sort-pagination span {
  @apply text-primary;
}

.search-content {
  @apply grid grid-cols-5 gap-3;
  @apply mt-3;
}
</style>
