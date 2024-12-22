<template>
  <div class="text-sm text-black/80">
    <div class="bg-white divide-y divide-dashed">
      <div class="flex justify-between gap-4 px-6 py-5">
        <UButton
          label="Kembali"
          to="/my-account/orders"
          icon="i-heroicons:chevron-left"
          :padded="false"
          variant="link"
          color="grey"
        />
        <div class="divide-x">
          <span>NO. PESANAN. XXXXXXXX</span>
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
      <div class="bg-yellow-50/30 flex justify-end px-6 py-3">
        <UButton
          color="white"
          class="min-w-56 justify-center"
          label="Batalkan"
        />
      </div>
      <div class="bg-yellow-50/30 flex justify-between px-6 py-3 items-center">
        <p class="text-black/55">
          Produk diperkirakan akan sampai pada
          <span class="underline">13-04-2024</span> -
          <span class="underline">13-04-2024</span>
        </p>
        <UButton class="min-w-56 justify-center" label="Pesanan Selesai" />
      </div>
      <div class="bg-yellow-50/30 flex justify-between px-6 py-3 items-center">
        <p class="text-black/55">
          Nilai pesanan sebelum
          <span class="underline">13-04-2024</span>
          dan dapatkan maks. 25 koin Syopo
        </p>
        <UButton class="min-w-56 justify-center" label="Nilai" />
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
            <p>Anas Ma'ruf</p>
            <p class="text-black/55 mt-2">(+62)85526271924</p>
            <p class="text-black/55">Jalan Jalan</p>
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
          <span class="font-semibold">SHOPNAME</span>
          <UButton
            color="white"
            size="xs"
            class="mt-2"
            :to="`/shop/username-shop`"
            ><IconShop /> Kunjungi Toko</UButton
          >
        </div>
        <hr class="mt-3" />
        <div class="divide-y">
          <FeatureProfileOrderCardProduct
            v-for="a in 3"
            :key="`Product-${a}`"
            size="sm"
            class="py-3"
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
                  <div>{{ price.label }}</div>
                </div>
              </template>
              <template v-else>{{ price.label }}</template>
            </td>
            <td>{{ price.value }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  IconInbox,
  IconOrder,
  IconPaid,
  IconStars,
  IconTruckOutline,
} from "#components";
definePageMeta({
  wrapper: "div",
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
