<template>
  <BaseLoading v-if="status === 'pending'" />
  <div v-else class="text-sm text-black/80">
    <div class="bg-white divide-y divide-dashed">
      <div class="flex justify-between gap-4 px-6 py-5">
        <UButton
          label="Kembali"
          to="/my-account/orders"
          icon="i-heroicons:chevron-left"
          :padded="false"
          variant="link"
          color="gray"
        />
        <div class="divide-x">
          <span class="px-4">NO. PESANAN. {{ data?.invoice_number }}</span>
          <span class="px-4 uppercase text-primary">
            {{ lastStatus?.description }}
          </span>
        </div>
      </div>
      <div class="px-6 py-10">
        <BaseTimelineHorizontal
          :items="timelineStatus"
          class="grid grid-cols-5"
        />
      </div>
      <!-- <div class="bg-yellow-50/30 flex justify-end px-6 py-3">
        <UButton
          color="white"
          class="min-w-56 justify-center"
          label="Batalkan"
        />
      </div> -->
      <div
        v-if="lastStatus?.status === 'pending_payment'"
        class="bg-yellow-50/30 flex justify-end px-6 py-3"
      >
        <UButton
          class="min-w-56 justify-center"
          label="Bayar"
          :to="`/checkout/payment/${data?.uuid}`"
        />
      </div>
      <div
        v-if="lastStatus?.status === 'on_delivery'"
        class="bg-yellow-50/30 flex justify-between px-6 py-3 items-center"
      >
        <p class="text-black/55">
          Produk diperkirakan akan sampai pada
          <span class="underline">{{ etd.start }}</span>
          -
          <span class="underline">{{ etd.end }}</span>
        </p>
        <UButton
          class="min-w-56 justify-center"
          label="Pesanan Selesai"
          :loading="statusDone === 'pending'"
          @click="handleDoneOrder"
        />
      </div>
      <div
        v-if="lastStatus?.status === 'done' && canReview"
        class="bg-yellow-50/30 flex justify-between px-6 py-3 items-center"
      >
        <p class="text-black/55">
          Nilai pesanan sebelum
          <span class="underline">{{ lastReviewDate }}</span>
          dan dapatkan maks. 25 Koin Syopo!
        </p>
        <UButton
          class="min-w-56 justify-center"
          label="Nilai"
          @click="handleReview"
        />
      </div>
      <div class="px-6 py-5">
        <div class="flex justify-between items-center">
          <p class="text-xl">Alamat Pengiriman</p>
          <div class="text-right text-xs text-black/55">
            <p class="uppercase">
              {{ data?.courier }} - {{ data?.courier_type }}
            </p>
            <p>XXXXXXXXX</p>
          </div>
        </div>
        <div class="flex divide-x mt-3">
          <div class="w-80 py-2 pr-3">
            <p>{{ data?.address?.receiver_name }}</p>
            <p class="text-black/55 mt-2">
              {{ data?.address?.receiver_phone }}
            </p>
            <p class="text-black/55">
              {{ data?.address?.detail_address }}
              {{ data?.address?.district }}, {{ data?.address?.city?.name }},
              {{ data?.address?.city?.province?.name }},
              {{ data?.address?.postal_code }}
              {{ data?.address?.address_note }}
            </p>
          </div>
          <div class="pl-3">
            <BaseTimelineVertical :items="orderHistory" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 divide-y">
      <div class="px-6 py-3">
        <div class="flex gap-2 items-center">
          <span class="font-semibold">{{ data?.seller?.store_name }}</span>
          <UButton
            color="white"
            size="xs"
            :to="`/shop/${data?.seller?.username}`"
          >
            <IconShop /> Kunjungi Toko
          </UButton>
        </div>
        <hr class="mt-3" />
        <div class="divide-y">
          <FeatureProfileOrderCardProduct
            v-for="item in data?.items"
            :key="`product-${item.uuid}`"
            size="sm"
            class="py-3"
            :item="item"
          />
        </div>
      </div>
      <div>
        <table class="order-price">
          <tr v-for="price in priceItem" :key="price.label">
            <td>
              <template v-if="price.label === 'Metode Pembayaran'">
                <div class="flex items-center gap-2 justify-end">
                  <img src="~/assets/images/garansi.png" class="h-4 w-4" />
                  <span>{{ price.label }}</span>
                </div>
              </template>
              <template v-else>{{ price.label }}</template>
            </td>
            <td>{{ price.value }}</td>
          </tr>
        </table>
      </div>
    </div>

    <ModalReview
      ref="modalReviewElement"
      v-model:open="openReview"
      @success="refresh"
    />
  </div>
</template>

<script setup>
import {
  IconOrder,
  IconPaid,
  IconTruckOutline,
  IconInbox,
  IconStars,
} from "#components";
import { addDays, differenceInDays, format } from "date-fns";
definePageMeta({
  wrapper: "div",
});

const openReview = ref(false);
const modalReviewElement = ref();

const route = useRoute();
const nuxtApp = useNuxtApp();
const { data, status, refresh } = useApi(
  `/server/api/order/${route.params.orderId}`,
  {
    key: `order-customer-${route.params.orderId}`,
    getCachedData() {
      return (
        nuxtApp.payload.data?.[`order-customer-${route.params.orderId}`] ||
        nuxtApp.static.data?.[`order-customer-${route.params.orderId}`]
      );
    },
    transform(response) {
      return response?.data || {};
    },
  }
);

const etd = computed(() => {
  const { start, end } = getEstimate(data.value?.courier_estimation, {
    returnObject: true,
  });
  return {
    start: format(start, "dd-MM-yyyy"),
    end: format(end, "dd-MM-yyyy"),
  };
});

const lastStatus = computed(
  () => data.value?.status?.[(data.value?.status?.length || 0) - 1]
);

const lastReviewDate = computed(() => {
  if (lastStatus.value?.status !== "done") return "";
  const doneDate = new Date(lastStatus.value?.created_at);
  const targetDate = addDays(doneDate, 1);

  return format(targetDate, "dd-MM-yyyy");
});

const canReview = computed(() => {
  if (lastStatus.value?.status !== "done") return false;
  const endDate = new Date(lastReviewDate.value);
  const today = new Date();
  const diffDays = differenceInDays(endDate, today);
  return diffDays === 0 && !data.value?.items?.[0]?.is_reviewed;
});

const timelineStatus = computed(() => {
  const pendingStatus = data.value?.status?.find(
    (item) => item.status === "pending_payment"
  );
  const paidStatus = data.value?.status?.find((item) => item.status === "paid");
  const processStatus = data.value?.status?.find(
    (item) => item.status === "on_processing"
  );
  const deliveryStatus = data.value?.status?.find(
    (item) => item.status === "on_delivery"
  );
  const doneStatus = data.value?.status?.find((item) => item.status === "done");
  return [
    {
      title: "Pesanan Dibuat",
      time: pendingStatus?.created_at,
      passed:
        !["pending_payment", "failed"].includes(lastStatus.value?.status) &&
        pendingStatus,
      active: lastStatus.value?.status === "pending_payment",
      icon: IconOrder,
    },
    {
      title: `Pesanan${paidStatus ? "" : " Belum"} Dibayarkan (Rp${formatNumber(
        data.value?.total_payment
      )})`,
      time: paidStatus?.created_at,
      passed: lastStatus.value?.status !== "paid" && paidStatus,
      active: lastStatus.value?.status === "paid",
      icon: IconPaid,
    },
    {
      title: "Sedang Dikemas",
      time: processStatus?.created_at,
      icon: IconTruckOutline,
      passed: lastStatus.value?.status !== "on_processing" && processStatus,
      active: lastStatus.value?.status === "on_processing",
    },
    {
      title: "Dikirim",
      time: deliveryStatus?.created_at,
      icon: IconInbox,
      passed: lastStatus.value?.status !== "on_delivery" && deliveryStatus,
      active: lastStatus.value?.status === "on_delivery",
    },
    {
      title: data.value?.items?.[0]?.is_reviewed ? "Selesai" : "Belum Dinilai",
      time: data.value?.items?.[0]?.is_reviewed ? doneStatus?.created_at : "",
      icon: IconStars,
      passed: lastStatus.value?.status !== "done" && doneStatus,
      active: lastStatus.value?.status === "done",
    },
  ];
});

const orderHistory = computed(() => {
  return data.value?.status
    ?.map((item, index, arr) => ({
      title: item?.description,
      time: item?.created_at,
      active: index === arr.length - 1,
    }))
    .sort((a, b) => new Date(b.time) - new Date(a.time));
});

// [
//   {
//     title: "Pesanan Dibayar",
//     time: "11-08-2024 16:27",
//     active: true,
//   },
//   {
//     title: "Pesanan Dibuat",
//     time: "11-08-2024 16:26",
//   },
// ]

const priceItem = computed(() => [
  {
    label: "Subtotal Produk",
    value: `Rp ${formatNumber(data.value?.subtotal)}`,
  },
  {
    label: "Subtotal Pengiriman",
    value: `Rp ${formatNumber(data.value?.courier_price)}`,
  },
  {
    label: "Voucher Digunakan",
    value: `Rp ${formatNumber(data.value?.voucher_value)}`,
  },
  {
    label: "Cashback Koin",
    value: `Rp ${formatNumber(data.value?.voucher_cashback || 0)}`,
  },
  {
    label: `${data.value?.pay_with_coin} Koin Syopo ditukarkan`,
    value: `Rp ${formatNumber(data.value?.pay_with_coin)}`,
  },
  {
    label: "Biaya Layanan",
    value: `Rp ${formatNumber(data.value?.service_fee)}`,
  },
  {
    label: "Total Pesanan",
    value: `Rp ${formatNumber(data.value?.total_payment)}`,
    class: "text-primary text-2xl",
  },
  {
    label: "Metode Pembayaran",
    value: data.value?.payment_method === "bni_va" ? "Virtual Account" : "QRIS",
  },
]);

const { status: statusDone, execute: submitDone } = useSubmit(
  computed(() => `/server/api/order/${route.params.orderId}/mark-done`),
  {
    onResponse({ response }) {
      if (response.ok) refresh();
    },
  }
);

function handleDoneOrder() {
  const confirm = window.confirm(
    "Apa anda yakin untuk menyelesaikan order ini?"
  );
  if (!confirm) return;

  submitDone();
}

function handleReview() {
  modalReviewElement.value.setDefaultData(data.value);
  openReview.value = true;
}
</script>

<style scoped>
table.order-price {
  @apply w-full;
}

.order-price tr td {
  @apply text-right;
  @apply border border-black/10 border-dashed;
}

.order-price tr td:first-child {
  @apply p-3;
  @apply text-black/55 text-xs;
  border-left: none;
}
.order-price tr td:last-child {
  @apply px-6 py-3;
  border-right: none;
}

.order-price tr:first-child td {
  border-top: none;
  width: 67%;
}
.order-price tr:last-child td {
  border-bottom: none;
}
</style>
