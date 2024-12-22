<template>
  <div class="text-sm text-black/80">
    <div class="bg-white divide-y divide-dashed">
      <div class="flex justify-between gap-4 px-6 py-5">
        <UButton
          label="Kembali"
          to="/seller/order"
          icon="i-heroicons:chevron-left"
          :padded="false"
          variant="link"
          color="gray"
        />
        <div class="divide-x">
          <span class="px-4">NO. PESANAN. XXXXXXXXX</span>
          <span class="px-4 uppercase text-primary">
            PESANAN SEDANG DISIAPKAN
          </span>
        </div>
      </div>
      <div class="px-6 py-10">
        <BaseTimelineHorizontal
          :items="timelineStatus"
          class="grid grid-cols-5"
        />
      </div>
      <div class="bg-yellow-50/30 flex justify-end px-6 py-3 gap-2">
        <UButton
          class="min-w-56 justify-center"
          label="Proses Order ini"
          @click="openModalUpdateStatus('on_processing')"
        />
        <UButton
          class="min-w-56 justify-center"
          label="Update Status Pengiriman"
          @click="openModalUpdateStatus('on_delivery')"
        />

        <UModal v-model="modalUpdateStatus.open">
          <UCard>
            <template #header> Update Status Order </template>
            <form @submit.prevent="handleUpdateStatus">
              <UFormGroup label="Deskripsi">
                <UTextarea v-model="modalUpdateStatus.form.description" />
              </UFormGroup>
              <div class="flex justify-end gap-4 mt-6">
                <UButton
                  color="gray"
                  variant="link"
                  label="Nanti Saja"
                  @click="closeModalUpdateStatus"
                />
                <UButton type="submit" label="Simpan" />
              </div>
            </form>
          </UCard>
        </UModal>
      </div>

      <div class="px-6 py-5">
        <div class="flex justify-between items-center">
          <p class="text-xl">Alamat Pengiriman</p>
          <div class="text-right text-xs text-black/55">
            <p>SPX Hemat</p>
            <p>XXXXXXXXX</p>
          </div>
        </div>
        <div class="flex divide-x mt-3">
          <div class="w-80 py-2 pr-3">
            <p>Irsyaad Budi</p>
            <p class="text-black/55 mt-2">620000</p>
            <p class="text-black/55">Jalan jalan</p>
          </div>
          <div class="pl-3">
            <BaseTimelineVertical :items="orderHistory" />
          </div>
        </div>
      </div>
    </div>
    <div class="bg-gray-50 divide-y">
      <div class="px-6 py-3">
        <div class="divide-y">
          <FeatureProfileOrderCardProduct
            v-for="a in 3"
            :key="`product-${a}`"
            size="sm"
            class="py-3"
          />
        </div>
      </div>
      <div>
        <table class="order-price">
          <tbody>
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
          </tbody>
        </table>
      </div>
    </div>
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

definePageMeta({
  breadcrumb: [
    {
      label: "Pesanan Saya",
      to: "/seller/order",
    },
    {
      label: "Detail Pesanan",
    },
  ],
});
const modalUpdateStatus = reactive({
  open: false,
  status: "",
  form: {
    description: "",
  },
});

const timelineStatus = [
  {
    title: "Pesanan Dibuat",
    time: "10-08-2024 16:26",
    passed: true,
    icon: IconOrder,
  },
  {
    title: "Pesanan Dibayarkan (Rp144.400)",
    time: "10-08-2024 16:26",
    passed: true,
    icon: IconPaid,
  },
  {
    title: "Sedang Dikemas",
    time: "",
    icon: IconTruckOutline,
    active: true,
  },
  {
    title: "Dikirim",
    time: "",
    icon: IconInbox,
  },
  {
    title: "Belum Dinilai",
    time: "",
    icon: IconStars,
  },
];

const orderHistory = [
  {
    title: "Pesanan Dibayar",
    time: "11-08-2024 16:27",
    active: true,
  },
  {
    title: "Pesanan Dibuat",
    time: "11-08-2024 16:26",
  },
];

const priceItem = computed(() => [
  {
    label: "Subtotal Produk",
    value: `Rp ${formatNumber(80934232)}`,
  },
  {
    label: "Subtotal Pengiriman",
    value: `Rp ${formatNumber(80934232)}`,
  },
  {
    label: "Voucher Digunakan",
    value: `Rp ${formatNumber(80934232)}`,
  },
  {
    label: "4750 Koin Syopo ditukarkan",
    value: `Rp ${formatNumber(4750)}`,
  },
  {
    label: "Biaya Layanan",
    value: `Rp ${formatNumber(4750)}`,
  },
  {
    label: "Total Pesanan",
    value: `Rp ${formatNumber(4750)}`,
    class: "text-primary text-2xl",
  },
  {
    label: "Metode Pembayaran",
    value: "Virtual Account",
  },
]);

function openModalUpdateStatus(updateStatus) {
  modalUpdateStatus.open = true;
  modalUpdateStatus.status = updateStatus;
  modalUpdateStatus.form.description = "";
}

function closeModalUpdateStatus() {
  modalUpdateStatus.open = false;
  modalUpdateStatus.form.description = "";
}

function handleUpdateStatus() {
  alert(
    `status: ${modalUpdateStatus.status}, description: ${modalUpdateStatus.form.description}`
  );
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
