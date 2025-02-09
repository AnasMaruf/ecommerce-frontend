<template>
  <div class="space-y-3">
    <BaseTabs
      v-model="formFilter.status"
      :items="items"
      :ui="{
        list: {
          height: 'h-full',
          tab: {
            font: 'font-normal',
            height: 'h-14',
          },
        },
      }"
      :content="false"
    />
    <UInput
      v-model="formFilter.search"
      leading-icon="i-heroicons:magnifying-glass"
      size="lg"
      placeholder="Kamu bisa cari berdasarkan Nama Penjual, No. Pesanan atau Nama Produk"
      :ui="{
        color: {
          white: {
            outline: 'bg-gray-200/50 ring-0 placeholder-gray-500',
          },
        },
      }"
    />
    <FeatureProfileOrderCardOrder
      v-for="(order, index) in data?.data || []"
      :key="`order-${index}`"
      :order="order"
      @review="handleReview"
    />
    <div ref="observerElement" />
    <BaseLoading v-if="status === 'pending'" />
    <template v-else-if="(data?.data || []).length === 0">
      <p class="text-sm font-medium text-black/55 py-4 text-center">
        Tidak ada order yang ditemukan
      </p>
    </template>

    <ModalReview
      ref="modalReviewElement"
      v-model:open="openReview"
      @success="handleReloadData"
    />
  </div>
</template>

<script setup>
definePageMeta({
  wrapper: "div",
});
const { data: oldOrders } = useNuxtData("order-customer");

const openReview = ref(false);
const modalReviewElement = ref();

const observerElement = ref();
let observer = null;

const pagination = ref({
  page: 1,
  per_page: 3,
});
const formFilter = ref({
  search: "",
  status: 0,
});

const searchDebounce = refDebounced(
  computed(() => formFilter.value.search),
  1000
);

const items = [
  {
    label: "Semua",
    key: "all",
  },
  {
    label: "Belum Bayar",
    key: "pending_payment",
  },
  {
    label: "Sudah Dibayar",
    key: "paid",
  },
  {
    label: "Sedang Dikemas",
    key: "on_processing",
  },
  {
    label: "Dikirim",
    key: "on_delivery",
  },
  {
    label: "Selesai",
    key: "done",
  },
  {
    label: "Dibatalkan",
    key: "failed",
  },
];

const { data, status } = useApi("/server/api/order", {
  key: "order-customer",
  onResponse({ response }) {
    if (response.ok) {
      if (!observer) {
        observer = new IntersectionObserver((entries) => {
          if (
            entries[0].isIntersecting &&
            !!response._data.data.next_page_url &&
            pagination.value.page < response._data.data.last_page
          ) {
            pagination.value.page++;
          }
        });
        observer.observe(observerElement.value);
      }
    }
  },
  params: computed(() => {
    const lastStatus =
      formFilter.value.status > 0
        ? items[formFilter.value.status]?.key
        : undefined;
    return {
      ...pagination.value,
      search: searchDebounce.value || undefined,
      last_status: lastStatus,
    };
  }),
  transform(response) {
    if (pagination.value.page === 1) return response?.data;
    const newData = response?.data?.data || [];
    return {
      ...response.data,
      data: [...(oldOrders.value?.data || []), ...newData],
    };
  },
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  }
});

watch(searchDebounce, () => {
  pagination.value.page = 1;
});

watch(
  () => formFilter.value.status,
  () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    formFilter.value.search = "";
    pagination.value.page = 1;
  }
);

function handleReview(order) {
  modalReviewElement.value.setDefaultData(order);
  openReview.value = true;
}

function handleReloadData() {
  refreshNuxtData("order-customer");
}
</script>

<style lang="scss" scoped></style>
