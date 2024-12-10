<template>
  <UContainer class="flex gap-5 flex-col py-5">
    <UCard class="address-section">
      <div class="flex gap-2 text-primary items-center">
        <UIcon name="i-heroicons:map-pin-16-solid" />
        <span>Alamat Pengiriman</span>
      </div>
      <div class="flex gap-20 mt-5 items-center">
        <div>
          <p class="font-bold">Anas Ma'ruf</p>
          <p class="font-bold">085526271924</p>
        </div>
        <p class="text-black/80">Jalan raya km 9</p>
        <UBadge variant="outline" class="font-normal">Utama</UBadge>
        <UButton variant="link" color="blue" @click="openAddress = true"
          >Ubah</UButton
        >
      </div>
    </UCard>
    <div class="bg-white divide-y divide-dashed">
      <div class="p-6">
        <div class="flex justify-between items-center">
          <span class="w-[33%] text-lg font-normal text-black/85">
            Produk Dipesan
          </span>
          <span class="w-[16%] text-sm font-normal text-black/55">
            Harga Satuan
          </span>
          <span class="w-[16%] text-sm font-normal text-black/55">
            Jumlah
          </span>
          <span class="w-[16%] text-sm font-normal text-black/55">
            Subtotal Produk
          </span>
        </div>
        <p class="text-sm text-black/85 my-4">NAMA SHOP</p>
        <div>
          <div class="flex justify-between items-center gap-4">
            <div
              class="w-[33%] text-lg font-normal text-black/85 flex gap-2 items-center"
            >
              <img
                src="https://picsum.photos/1920/1000?random=1"
                alt=""
                class="aspect-[1/1] w-10 object-cover"
              />
              <p class="line-clamp-1 text-sm text-black/40">
                Privacy matte/clear glossy/privacy glossy
              </p>
            </div>
            <div class="w-[16%] text-sm font-normal text-black/80">
              Rp{{ formatNumber(1000) }}
            </div>
            <div class="w-[16%] text-sm font-normal text-black/80">
              {{ formatNumber(10) }}
            </div>
            <div class="w-[16%] text-sm font-medium text-black/80">
              Rp{{ formatNumber(100000) }}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-50/20 flex divide-x divide-dashed">
        <div class="py-4 px-6 flex gap-4 w-[480px]">
          <span>Pesan:</span>
          <UInput
            placeholder="(Opsional) Tinggalkan pesan ke penjual"
            class="flex-1"
          />
        </div>
        <div class="divide-y divide-dashed flex-1">
          <div class="grid grid-cols-3 px-6 py-9 font-medium">
            <p class="text-xs text-black/80">Opsi Pengiriman</p>
            <div>
              <div class="flex justify-between gap-2 items-center">
                <p class="text-sm text-black/80">REG</p>
                <UButton
                  variant="link"
                  color="blue"
                  :padded="false"
                  @click="openCourier = true"
                >
                  Ubah
                </UButton>
              </div>
              <p class="text-xs text-gray-400 font-normal mt-2">
                Garansi tiba: 13-15 nvmb
              </p>
            </div>
            <p class="text-sm text-black/80 text-right">
              Rp{{ formatNumber(100000) }}
            </p>
          </div>
          <div>
            <UButton
              variant="link"
              class="hover:no-underline"
              @click="openCourier = true"
            >
              <div class="flex items-center gap-1 text-green-700">
                <IconTruck /> Garansi tiba 13-16 ags
              </div>
              <div class="flex items-center">
                <span class="text-gray-400">dengan J&T Jemari</span>
                <UIcon name="i-heroicons:chevron-right" class="text-gray-400" />
              </div>
            </UButton>
          </div>
        </div>
      </div>
      <div class="bg-blue-50/20 flex justify-end px-6 py-4 items-center gap-3">
        <span class="text-sm text-black/55"
          >Total pesanan ({{ 1 }} Produk)</span
        >
        <span class="text-primary text-xl font-medium"
          >Rp.{{ formatNumber(100000) }}</span
        >
      </div>
    </div>
    <UCard>
      <template #header>
        <div class="flex justify-between gap-2">
          <div class="flex gap-2 items-center font-normal text-lg">
            <IconVoucher /> Voucher Syopo
          </div>
          <UButton
            :padded="false"
            variant="link"
            color="blue"
            @click="openVoucher = true"
          >
            Pilih Voucher
          </UButton>
        </div>
      </template>
      <template #default>
        <div class="flex items-center gap-2">
          <div class="flex gap-7 items-center font-normal text-lg">
            <IconCoin />Koin Syopo
          </div>
          <p class="font-medium text-sm text-gray-400">
            Koin tidak dapat ditukar
          </p>
          <div class="flex-1 flex justify-end items-center gap-2">
            <span class="text-gray-300">[-Rp0]</span>
            <UCheckbox disabled />
          </div>
        </div>
      </template>
    </UCard>
    <div class="bg-white">
      <div class="p-6 flex gap-14">
        <span>Pilih Pembayaran</span>
        <URadioGroup
          v-model="paymentSelected"
          :options="paymentList"
          :ui-radio="{
            wrapper: 'items-center py-2',
          }"
        >
          <template #label="{ option }">
            <div class="flex gap-4 items-center">
              <div
                class="w-12 h-12 border rounded-sm p-2 flex justify-center items-center"
              >
                <img :src="option.image" alt="" />
              </div>
              <p class="font-normal text-sm">{{ option.label }}</p>
            </div>
          </template>
        </URadioGroup>
      </div>
      <div
        class="border-t border-gray-100 p-6 flex justify-end bg-yellow-50/30"
      >
        <table class="price-summary">
          <tbody>
            <tr>
              <td>
                <span class="text-sm text-black/55">Subtotal untuk produk</span>
              </td>
              <td class="text-right min-w-64">Rp.{{ formatNumber(1000) }}</td>
            </tr>
            <tr>
              <td>
                <span class="text-sm text-black/55">Total Ongkos Kirim</span>
              </td>
              <td class="text-right min-w-64">Rp.{{ formatNumber(1000) }}</td>
            </tr>
            <tr>
              <td>
                <span class="text-sm text-black/55">Biaya Layanan</span>
              </td>
              <td class="text-right min-w-64">Rp.{{ formatNumber(1000) }}</td>
            </tr>
            <tr>
              <td>
                <span class="text-sm text-black/55">Biaya Layanan</span>
              </td>
              <td class="text-right min-w-64 text-3xl text-primary">
                Rp.{{ formatNumber(1000) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="border-t border-gray-100 border-dashed p-6 flex justify-end bg-yellow-50/30"
      >
        <UButton class="w-52 justify-center" @click="handlePayment"
          >Buat Pesanan</UButton
        >
      </div>
    </div>
    <ModalVoucher v-model="openVoucher" />
    <ModalAddress v-model:open="openAddress" />
    <ModalCourier v-model:open="openCourier" />
  </UContainer>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  header: {
    title: "Checkout",
    showProfile: true,
  },
});
const router = useRouter();
const openVoucher = ref(false);
const openCourier = ref(false);
const openAddress = ref(false);
const paymentSelected = ref("bni_va");
const paymentList = computed(() => [
  {
    value: "bni_va",
    label: "Bank BNI",
    image: "/images/logo-bni.webp",
  },
  {
    value: "qris",
    label: "QRIS",
    image: "/images/qris.png",
  },
]);
function handlePayment() {
  router.push("/checkout/payment");
}
</script>

<style scoped>
.price-summary tr:not(:first-child) td {
  @apply py-3;
}
.price-summary tr:first-child td {
  @apply pb-3;
}
.price-summary tr:last-child td {
  @apply pb-0 pt-10;
}
</style>
