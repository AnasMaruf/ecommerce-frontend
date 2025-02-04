<template>
  <UContainer class="py-5 flex flex-col gap-6">
    {{ status }}
    <div
      v-if="status === 'pending'"
      class="flex gap-4 items-center justify-center min-h-96"
    >
      <IconLoading class="w-12 text-primary" />
      <p>Loading...</p>
    </div>
    <template v-else>
      <div
        v-if="!data?.data?.items?.length"
        class="flex gap-4 items-center justify-center min-h-96 flex-col"
      >
        <UIcon
          name="heroicons:archive-box-x-mark"
          class="w-36 h-36 text-black/30"
        />
        <p class="text-2xl text-black/30 text-center">
          Tidak ada Produk di Keranjang
        </p>
      </div>
      <template v-else>
        <UCard>
          <div class="cart-header">
            <div class="w-[46%]">Produk</div>
            <div class="text-center w-[15%]">Harga Satuan</div>
            <div class="text-center w-[15%]">Kuantitas</div>
            <div class="text-center w-[15%]">Total Harga</div>
            <div class="text-center w-[10%]">Aksi</div>
          </div>
        </UCard>

        <UCard>
          <div class="grid grid-cols-1 divide-y">
            <FeatureCartProductItem
              v-for="item in data?.data?.items"
              :key="`product-${item.uuid}`"
              :item="item"
            />
          </div>
        </UCard>
        <UCard
          :ui="{
            header: {
              padding: paddingCheckoutFooter,
            },
            body: {
              padding: paddingCheckoutFooter,
            },
            footer: {
              padding: paddingCheckoutFooter,
            },
            divide: 'divide-dashed',
          }"
        >
          <template #header>
            <div class="flex justify-end gap-40">
              <div class="flex gap-1 items-center font-medium">
                <IconVoucher />
                Voucher Syopo
              </div>
              <UButton
                variant="link"
                color="blue"
                :disabled="statusCoin === 'pending'"
                @click="openVoucher = true"
              >
                {{
                  data?.data?.cart?.voucher?.code
                    ? `${data?.data?.cart?.voucher?.code} - Klik untuk mengganti`
                    : "Gunakan/ masukkan kode"
                }}
              </UButton>
            </div>
          </template>
          <template #default>
            <div class="flex justify-end">
              <div class="flex items-center gap-5">
                <UCheckbox
                  v-model="useCoin"
                  :disabled="
                    !session.profile.balance || statusCoin === 'pending'
                  "
                  @change="handlePayWithCoin"
                >
                  <template #label>
                    <div class="flex gap-2">
                      <IconCoin />
                      <span class="font-medium">Koin Syopo</span>
                    </div>
                  </template>
                </UCheckbox>
                <span class="font-medium text-sm text-gray-500">
                  Saldo Koin
                  {{ session.profile.balance ? coinBalance : "Tidak Cukup" }}
                </span>
                <div class="flex justify-end flex-1 min-w-48">
                  <span class="text-gray-300">-Rp{{ payWithCoin }}</span>
                </div>
              </div>
            </div>
          </template>
          <template #footer>
            <div class="flex justify-end item">
              <div class="flex gap-4">
                <div>
                  <div class="flex items-center gap-1">
                    <span>Total ({{ data?.data?.items?.length }} produk):</span>
                    <span class="text-primary font-normal text-2xl">
                      Rp{{ totalPrice }}
                    </span>
                  </div>
                  <div
                    v-if="
                      data.value?.data?.cart?.voucher_cashback ||
                      data.value?.data?.cart?.voucher_value
                    "
                    class="flex gap-6 text-sm font-normal justify-end"
                  >
                    <span>Hemat</span>
                    <span class="text-primary">{{ totalDiscount }}</span>
                  </div>
                </div>
                <UButton
                  class="px-9 min-w-52 justify-center"
                  :disabled="statusCoin === 'pending'"
                  @click="handleCheckout"
                  >Checkout</UButton
                >
              </div>
            </div>
          </template>
        </UCard>

        <ModalVoucher v-model="openVoucher" />
      </template>
    </template>
  </UContainer>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  header: {
    showProfile: true,
    showSearch: true,
    title: "Keranjang Belanja",
  },
  middleware: ["must-auth"],
});
const session = useSession();
const nuxtApp = useNuxtApp();
const openVoucher = ref(false);

const useCoin = ref(false);

const paddingCheckoutFooter = "sm:py-3 sm:px-7";

const router = useRouter();

const { data, status } = useApi(`/server/api/cart`, {
  server: false,
  key: "cart",
  onResponse({ response }) {
    if (response.ok) {
      useCoin.value = !!response._data?.data?.cart?.pay_with_coin;
    }
  },
  getCachedData() {
    return (
      nuxtApp.payload.data?.["category-list"] ||
      nuxtApp.static.data?.["category-list"]
    );
  },
});

const totalPrice = computed(() =>
  formatNumber(data.value?.data?.cart?.total || 0)
);
const totalDiscount = computed(() => {
  const cashback = data.value?.data?.cart?.voucher_cashback || 0;
  const discount = data.value?.data?.cart?.voucher_value || 0;
  return formatRb(cashback + discount);
});
const coinBalance = computed(() => formatNumber(session.profile.balance));
const payWithCoin = computed(() =>
  formatNumber(data.value?.data?.cart?.pay_with_coin)
);

const { execute: submitPayWithCoin, status: statusCoin } = useSubmit(
  "/server/api/cart/toggle-coin",
  {
    params: computed(() => {
      return {
        use: useCoin.value ? 1 : 0,
      };
    }),
    onResponse({ response }) {
      if (response.ok) {
        refreshNuxtData("cart");
      }
    },
  }
);

function handlePayWithCoin() {
  submitPayWithCoin();
}

function handleCheckout() {
  // Hit API
  router.push("/checkout");
}
</script>

<style scoped>
.cart-header {
  @apply flex items-center;
  @apply text-gray-500 text-sm font-normal;
}
</style>
