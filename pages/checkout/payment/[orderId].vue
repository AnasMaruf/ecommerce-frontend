<template>
  <UContainer class="py-5 text-black/85 text-sm">
    <div v-if="status === 'pending'" class="flex gap-2 justify-center py-6">
      <IconLoading class="w-6 text-primary" />
      <p>Loading...</p>
    </div>
    <UCard v-else>
      <template #header>
        <div class="flex items-center gap-4">
          <UButton
            :padded="false"
            icon="i-heroicons:arrow-left"
            variant="link"
            color="black"
          />
          <p class="text-xl">Pembayaran</p>
        </div>
      </template>
      <template #default>
        <div class="flex justify-center">
          <div class="max-w-[500px] w-full divide-y">
            <div class="payment-item justify-between">
              <span class="text-base font-normal">Total Pembayaran</span>
              <span class="text-base font-medium text-primary"
                >Rp{{ formatNumber(data?.data?.total_payment) }}</span
              >
            </div>
            <div class="payment-item justify-between">
              <span class="text-base font-normal">Bayar Dalam</span>
              <div class="text-right">
                <p class="text-primary text-base font-medium">
                  <!-- 23 jam 59 menit 50 detik -->
                  {{ countdownDisplay }}
                </p>
                <p class="text-black/55 font-normal">
                  Jatuh tempo {{ paymentExpiredAt }}
                </p>
              </div>
            </div>
            <div class="payment-item flex-col gap-5">
              <div class="flex gap-2">
                <img :src="paymentFrom.image" class="w-6 object-contain" />
                <p>{{ paymentFrom.label }}</p>
              </div>
              <div v-if="paymentSelected === 'bni_va'">
                <p>No. Rekening</p>
                <div class="flex gap-4 mt-1 items-center">
                  <p class="text-primary text-xl">
                    {{ data?.data?.virtual_account_number }}
                  </p>
                  <UButton
                    variant="link"
                    color="teal"
                    :padded="false"
                    @click="handleCopy"
                  >
                    SALIN
                  </UButton>
                </div>
              </div>
              <img
                v-if="paymentSelected === 'qris'"
                :src="data?.data?.qris_image_url"
                class="w-60 mx-auto"
              />
              <p class="text-teal-500">
                Proses verifikasi kurang dari 10 menit setelah pembayaran
                berhasil
              </p>
              <p>
                {{ message[paymentSelected].description }}
              </p>
              <p>{{ message[paymentSelected].caption }}</p>
              <UButton
                block
                class="max-w-72 mx-auto mt-7"
                @click="handleCheckPayment"
                >OK</UButton
              >
            </div>
          </div>
        </div>
      </template>
    </UCard>

    <UModal v-model="isSuccess" prevent-close>
      <UCard
        :ui="{
          rounded: 'rounded',
        }"
      >
        <p class="text-lg">Pembayaran Berhasil</p>
        <p class="text-black/55 text-s mt-5">
          Silakan cek notifikasi untuk mengetahui status pengiriman.
        </p>
        <div class="flex justify-end mt-1">
          <UButton block class="max-w-44 mt-10" @click="handleRedirect">
            OK
          </UButton>
        </div>
      </UCard>
    </UModal>
  </UContainer>
</template>

<script setup>
import { format } from "date-fns";

definePageMeta({
  header: {
    showProfile: false,
    showSearch: false,
    showCart: false,
  },
  middleware: ["must-auth"],
});

const route = useRoute();
const isSuccess = ref(false);
const toast = useToast();
const { copy } = useClipboard();

const { displayValue, startCountdown } = useCountdown();

const { data, status, refresh } = useApi(
  computed(() => `/server/api/order/${route.params.orderId}`),
  {
    onResponse({ response }) {
      if (response.ok) {
        if (response._data?.data?.is_paid) isSuccess.value = true;
        const expiredAt = response._data?.data?.payment_expired_at;
        if (expiredAt) {
          const seconds = getSecondsFromDate(expiredAt);
          startCountdown(seconds);
        }
      }
    },
  }
);

const countdownDisplay = computed(() => {
  const _countdown = displayValue.value.split(":");
  if (!_countdown[2]) {
    if (!_countdown[1]) return `00 Jam 00 Menit ${_countdown[0]} Detik`;
    return `00 Jam ${_countdown[0]} Menit ${_countdown[1]} Detik`;
  }
  return `${_countdown[0]} Jam ${_countdown[1]} Menit ${_countdown[2]} Detik`;
});

const paymentSelected = computed(() => data.value?.data?.payment_method);

const paymentExpiredAt = computed(() => {
  if (data.value?.data?.payment_expired_at) {
    const expiredAt = new Date(data.value.data.payment_expired_at);
    // 11 Ags 2024, 16:26
    return format(expiredAt, "dd MMM yyyy, HH:mm");
  }
  return "";
});

const paymentFrom = computed(() =>
  [
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
  ].find((item) => item.value === paymentSelected.value)
);

const message = {
  bni_va: {
    description:
      "Bayar pesanan ke Virtual Account di atas sebelum membuat pesanan kembali dengan Virtual Account agar nomor tetap sama.",
    caption: "Hanya menerima dari Bank BNI",
  },
  qris: {
    description:
      "Bayar pesanan ke QRIS di atas sebelum membuat pesanan kembali dengan QRIS agar nomor tetap sama.",
    caption: "Menerima dari semua Bank",
  },
};

function handleCopy() {
  copy(data.value?.data?.virtual_account_number);
  toast.add({
    color: "green",
    title: "Berhasil menyalin",
  });
}

function handleRedirect() {
  navigateTo(`/my-account/orders/${route.params.orderId}`);
}

function handleCheckPayment() {
  refresh();
}
</script>

<style scoped>
.payment-item {
  @apply py-5;
  @apply flex;
}
</style>
