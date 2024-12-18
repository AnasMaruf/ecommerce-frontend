<template>
  <div class="space-y-3">
    <BaseTabs
      :items="items"
      :ui="{
        list: {
          height: 'h-full',
          tab: { font: 'font-normal', height: 'h-14' },
        },
      }"
      :content="false"
    />
    <UInput
      leading-icon="i-heroicons:magnifying-glass"
      size="lg"
      placeholder="Kamu bisa cari berdasarkan nama penjual, No. Pesanan, atau nama produk"
      :ui="{
        color: {
          white: {
            outline: 'bg-gray-200/50 ring-0 placeholder-gray-500',
          },
        },
      }"
    />
    <UCard
      v-for="i in 4"
      :key="`order-${i}`"
      :ui="{
        base: 'text-sm text-black/85',
        divide: 'divide-dashed',
        footer: {
          background: 'bg-yellow-50/30',
        },
      }"
    >
      <template #default>
        <div class="flex justify-between gap-4 items-center">
          <div class="flex gap-2 items-center">
            <span class="font-semibold">SHOP NAME</span>
            <UButton color="white" size="xs" :to="`/shop/sellerusername`"
              ><IconShop /> Kunjungi Toko</UButton
            >
          </div>
          <div class="divide-x flex">
            <div class="flex gap-2 items-center text-teal-500 pr-2">
              <UIcon name="i-heroicons:truck" class="w-4 h-4" />
              <span>Ini nanti deskripsi dari paket yang telah sampai</span>
            </div>
            <span class="text-primary pl-2">Selesai</span>
          </div>
        </div>
        <hr class="my-4" />
        <NuxtLink class="space-y-3" to="/my-account/orders/order-id">
          <FeatureProfileOrderCardProduct v-for="i in 3" :key="i" />
        </NuxtLink>
      </template>
      <template #footer>
        <div class="space-y-6">
          <div class="flex justify-end">
            <div class="flex gap-2 items-center">
              <img src="~/assets/images/garansi.png" class="w-4 h-4" />
              <span class="text-black/80">Total Pesanan:</span>
              <span class="text-primary text-2xl"
                >Rp.{{ formatNumber(100000) }}</span
              >
            </div>
          </div>
          <div class="flex justify-between items-center gap-4">
            <div class="text-xs">
              <p class="text-black/55">
                Nilai produk sebelum <span class="underline">31-10-2024</span>
              </p>
              <p class="text-primary">
                Nilai sekarang & dapatkan 25 koin syopo!
              </p>
            </div>
            <UButton
              label="Nilai"
              class="min-w-40 justify-center"
              @click="openReview = true"
            />
          </div>
        </div>
      </template>
    </UCard>

    <UModal v-model="openReview">
      <UCard class="text-black/85">
        <p class="text-xl font-normal">Nilai Produk</p>
        <div class="space-y-5 mt-8">
          <div
            class="border border-yellow-500 bg-yellow-50 rounded-sm py-2 px-3 flex gap-2"
          >
            <IconCoinSolid />
            <span class="font-medium">Beri penilaian & dapatkan 25 koin!</span>
          </div>
          <div class="space-y-2">
            <FeatureProfileOrderCardProduct
              v-for="a in 3"
              :key="`Product-${a}`"
              hide-price
              hide-description
              size="sm"
            />
          </div>
          <div class="flex gap-2 items-center">
            <span class="w-44">Kualitas Produk</span>
            <BaseRating v-model="formRating.rating" size="lg" color="yellow" />
            <span
              :class="{
                'text-yellow-500': formRating.rating > 3,
                'text-black/55': formRating.rating <= 3,
              }"
              >{{ reviewMessages[formRating.rating - 1] }}</span
            >
          </div>
          <div>
            <div class="bg-gray-100 px-6 py-3 rounded-sm space-y-3">
              <UTextarea
                placeholder="Bagikan penilaianmu tentang produk ini untuk membantu pembeli lain"
              />
              <div class="flex gap-2">
                <UButton
                  size="xs"
                  variant="soft"
                  icon="i-heroicons:camera-solid"
                  label="Tambah Foto"
                />
                <UButton
                  size="xs"
                  variant="soft"
                  icon="i-heroicons:video-camera-solid"
                  label="Tambahkan Video"
                />
              </div>
              <p class="text-right text-black/55">
                Tambahkan 50 karakter dengan 1 foto untuk mendapatkan 25 koin!
              </p>
            </div>
          </div>
          <div class="space-y-4">
            <p class="text-base">Tentang Layanan</p>
            <div class="flex gap-2 items-center">
              <span class="w-44">Kecepatan jasa kirim</span>
              <BaseRating
                v-model="formRating.courierRating"
                size="lg"
                color="yellow"
              />
              <span
                :class="{
                  'text-yellow-500': formRating.courierRating > 3,
                  'text-black/55': formRating.courierRating <= 3,
                }"
                >{{ reviewMessages[formRating.courierRating - 1] }}</span
              >
            </div>
          </div>
          <div class="flex justify-end gap-2 pt-6">
            <UButton
              class="min-w-36 justify-center"
              variant="link"
              color="gray"
              @click="openReview = false"
              >Nanti Saja</UButton
            >
            <UButton class="min-w-36 justify-center" @click="openReview = false"
              >OK</UButton
            >
          </div>
        </div>
      </UCard>
    </UModal>
  </div>
</template>

<script setup>
definePageMeta({
  wrapper: "div",
});

const openReview = ref(false);
const formRating = reactive({
  rating: 0,
  courierRating: 0,
});
const reviewMessages = [
  "Sangat Buruk",
  "Buruk",
  "Biasa",
  "Baik",
  "Sangat Baik",
];

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
</script>

<style scoped></style>
