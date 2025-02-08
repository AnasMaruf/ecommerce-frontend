<template>
  <UContainer class="flex gap-5 flex-col py-5">
    <UCard class="address-section">
      <div class="flex gap-2 text-primary items-center">
        <UIcon name="i-heroicons:map-pin-16-solid" />
        <span>Alamat Pengiriman</span>
      </div>

      <div v-if="status === 'pending'" class="flex gap-4 mt-5 items-center">
        <USkeleton class="h-4 w-2/12" />
        <USkeleton class="h-4 w-4/12" />
        <USkeleton class="h-4 w-2/12" />
        <USkeleton class="h-4 w-2/12" />
      </div>
      <div v-else class="flex gap-20 mt-5 items-center">
        <div>
          <p class="font-bold">{{ addressSelected?.receiver_name }}</p>
          <p class="font-bold">{{ addressSelected?.receiver_phone }}</p>
        </div>
        <p class="text-black/80">
          {{ addressSelected?.detail_address }} {{ addressSelected?.district }},
          {{ addressSelected?.city?.name }},
          {{ addressSelected?.city?.province?.name }},
          {{ addressSelected?.postal_code }}
          {{ addressSelected?.address_note }}
        </p>
        <UBadge
          v-if="addressSelected?.is_default"
          variant="outline"
          class="font-normal"
          >Utama</UBadge
        >
        <UButton variant="link" color="blue" @click="openAddress = true">
          Ubah
        </UButton>
      </div>
    </UCard>
    <div class="bg-white divide-y divide-dashed">
      <div class="p-6">
        <div class="flex justify-between items-center">
          <span class="w-[33%] text-lg font-normal text-black/85 mb-4">
            Produk Dipesan
          </span>
          <span class="w-[16%]" />
          <span class="w-[16%] text-sm font-normal text-right text-black/55">
            Harga satuan
          </span>
          <span class="w-[16%] text-sm font-normal text-right text-black/55">
            Jumlah
          </span>
          <span class="w-[16%] text-sm font-normal text-right text-black/55">
            Subtotal produk
          </span>
        </div>
        <div>
          <div
            v-for="item in data?.data?.items"
            :key="item.uuid"
            class="flex justify-between items-center gap-4"
          >
            <div
              class="w-[33%] text-lg font-normal text-black/85 flex gap-2 items-center"
            >
              <NuxtImg
                :src="item.product.image_url"
                class="aspect-[1/1] w-10 object-cover"
                format="webp"
              />
              <p class="line-clamp-1 text-sm text-black/80">
                {{ item.product.name }}
              </p>
            </div>
            <div class="w-[16%]">
              <p class="line-clamp-1 text-sm text-black/40">
                Variasi:
                {{
                  item.variations?.map((variant) => variant.value).join(", ")
                }}
              </p>
            </div>
            <div class="w-[16%] text-sm font-normal text-right text-black/80">
              Rp{{
                formatNumber(item.product.price_sale || item.product.price)
              }}
            </div>
            <div class="w-[16%] text-sm font-normal text-right text-black/80">
              {{ formatNumber(item.qty) }}
            </div>
            <div class="w-[16%] text-sm font-medium text-right text-black/80">
              Rp{{ formatNumber(item.total) }}
            </div>
          </div>
        </div>
      </div>
      <div class="bg-blue-50/20 flex divide-x divide-dashed">
        <div class="py-4 px-6 flex gap-4 w-[480px] items-start justify-center">
          <span>Pesan:</span>
          <UInput
            v-model="notes"
            :disabled="statusUpdateQty === 'pending'"
            placeholder="(Opsional) Tinggalkan pesan ke penjual"
            class="flex-1"
          />
          <UButton
            v-if="notes"
            :loading="statusUpdateQty === 'pending'"
            size="xs"
            @click="handleUpdateNotes"
          >
            Update Notes
          </UButton>
        </div>
        <div class="divide-y divide-dashed flex-1">
          <div class="grid grid-cols-3 px-6 py-9 font-medium">
            <p class="text-sm text-black/80">Opsi Pengiriman</p>
            <div>
              <div class="flex justify-between gap-2 items-center">
                <p
                  v-if="courierSelected?.courier"
                  class="text-sm text-black/80 uppercase"
                >
                  {{ courierSelected.courier }} - {{ courierSelected.service }}
                </p>
                <p v-else class="text-sm text-black/55">
                  Pilih Kurir Terlebih Dahulu
                </p>
                <UButton
                  variant="link"
                  color="blue"
                  :padded="false"
                  @click="openCourier = true"
                >
                  Ubah
                </UButton>
              </div>
              <p
                v-if="courierSelected?.courier"
                class="text-xs text-gray-400 font-normal mt-2"
              >
                Garansi tiba:
                {{ getEstimate(data?.data?.cart?.courier_estimation) }}
              </p>
            </div>
            <p class="text-sm text-black/80 text-right">
              Rp{{ formatNumber(data?.data?.cart?.courier_price || 0) }}
            </p>
          </div>
          <div>
            <UButton
              v-if="courierSelected?.courier"
              variant="link"
              class="hover:no-underline"
              @click="openCourier = true"
            >
              <div class="flex items-center gap-1 text-green-700">
                <IconTruck /> Garansi tiba:
                {{ getEstimate(data?.data?.cart?.courier_estimation) }}
              </div>
              <div class="flex items-center">
                <span class="text-gray-400"
                  >dengan
                  <span class="uppercase"
                    >{{ courierSelected.courier }} -
                    {{ courierSelected.service }}</span
                  ></span
                >
                <UIcon name="i-heroicons:chevron-right" class="text-gray-400" />
              </div>
            </UButton>
          </div>
        </div>
      </div>
      <div class="bg-blue-50/20 flex justify-end px-6 py-4 items-center gap-3">
        <span class="text-sm text-black/55"
          >Total Pesanan ({{ data?.data?.items?.length }} Produk)</span
        >
        <span class="text-primary text-xl font-medium"
          >Rp{{ formatNumber(data?.data?.cart?.subtotal || 0) }}</span
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
            {{
              data?.data?.cart?.voucher?.code
                ? `${data?.data?.cart?.voucher?.code} - Klik untuk mengganti`
                : "Pilih Voucher"
            }}
          </UButton>
        </div>
      </template>
      <template #default>
        <div class="flex gap-7 items-center">
          <div class="flex gap-2 items-center font-normal text-lg">
            <IconCoin /> Koin Syopo
          </div>
          <p class="font-medium text-sm text-gray-400">
            {{
              session.profile.balance
                ? coinBalance
                : `Koin tidak dapat ditukarkan`
            }}
          </p>
          <div class="flex-1 flex justify-end items-center gap-2">
            <span class="text-gray-300">[-Rp{{ payWithCoin }}]</span>
            <UCheckbox
              v-model="useCoin"
              :disabled="!session.profile.balance || statusCoin === 'pending'"
              @change="submitPayWithCoin"
            />
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
                <img :src="option.image" />
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
                <span class="text-sm text-black/55">Subtotal untuk Produk</span>
              </td>
              <td class="text-right min-w-44">
                Rp{{ formatNumber(data?.data?.cart?.subtotal) }}
              </td>
            </tr>
            <tr>
              <td>
                <span class="text-sm text-black/55">Total Ongkos Kirim</span>
              </td>
              <td class="text-right min-w-44">
                Rp{{ formatNumber(data?.data?.cart?.courier_price) }}
              </td>
            </tr>
            <tr>
              <td><span class="text-sm text-black/55">Biaya Layanan</span></td>
              <td class="text-right min-w-44">
                Rp{{ formatNumber(data?.data?.cart?.service_fee) }}
              </td>
            </tr>
            <tr>
              <td><span class="text-sm text-black/55">Total Diskon</span></td>
              <td class="text-right min-w-44">Rp{{ totalDiscount }}</td>
            </tr>

            <tr>
              <td>
                <span class="text-sm text-black/55">Total Pembayaran</span>
              </td>
              <td class="text-right min-w-44 text-3xl text-primary">
                Rp{{ formatNumber(data?.data?.cart?.total_payment) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="border-t border-gray-100 border-dashed p-6 flex justify-end bg-yellow-50/30"
      >
        <UButton
          class="w-52 justify-center"
          :disabled="!courierSelected?.courier"
          :loading="statusCheckout === 'pending'"
          @click="handlePayment"
        >
          Buat Pesanan
        </UButton>
      </div>
    </div>

    <template v-if="data?.data?.items?.length">
      <ModalAddress v-model:open="openAddress" v-model="addressSelected" />
      <ModalCourier v-model:open="openCourier" v-model="courierSelected" />
      <ModalVoucher v-model="openVoucher" />
    </template>
  </UContainer>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  header: {
    title: "Checkout",
    showProfile: true,
  },
  middleware: ["must-auth"],
});
const nuxtApp = useNuxtApp();
const router = useRouter();

const session = useSession();

const useCoin = ref(false);

const openVoucher = ref(false);

const openCourier = ref(false);
const openAddress = ref(false);
const notes = ref("");

const addressSelected = ref({});
const courierSelected = ref({
  courier: "",
  service: "",
});

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

const { data, status } = useApi(`/server/api/cart`, {
  server: false,
  key: "cart",
  onResponse({ response }) {
    if (response.ok) {
      useCoin.value = !!response._data?.data?.cart?.pay_with_coin;
      addressSelected.value = response._data?.data?.cart?.address || {};
      courierSelected.value = {
        courier: response._data?.data?.cart?.courier,
        service: response._data?.data?.cart?.courier_type,
      };
      notes.value = response._data?.data?.items?.[0]?.note;

      if (response._data?.data?.items.length < 1) {
        router.replace("/cart");
      }
    }
  },
  getCachedData() {
    return (
      nuxtApp.payload.data?.["category-list"] ||
      nuxtApp.static.data?.["category-list"]
    );
  },
});

const product = computed(() => data.value?.data?.items?.[0]);

const { execute: updateQty, status: statusUpdateQty } = useSubmit(
  computed(() => `/server/api/cart/${product.value?.uuid}`),
  {
    onResponse({ response }) {
      if (response.ok) {
        refreshNuxtData("cart");
      }
    },
  }
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

const { status: statusCheckout, execute: checkout } = useSubmit(
  "/server/api/cart/checkout",
  {
    onResponse({ response }) {
      if (response.ok) {
        router.push(`/checkout/payment/${response._data?.data?.uuid}`);
      }
    },
  }
);

const coinBalance = computed(() => formatNumber(session.profile.balance));
const payWithCoin = computed(() =>
  formatNumber(data.value?.data?.cart?.pay_with_coin || 0)
);
const totalDiscount = computed(() => {
  const cashback = data.value?.data?.cart?.voucher_cashback || 0;
  const discount = data.value?.data?.cart?.voucher_value || 0;
  return formatNumber(cashback + discount);
});

function handleUpdateNotes() {
  if (!product.value) return;

  const formData = new FormData();

  product.value?.variations?.forEach((variant, index) => {
    formData.append(`variations[${index}][label]`, variant.label);
    formData.append(`variations[${index}][value]`, variant.value);
  });
  formData.append("qty", product.value.qty);
  formData.append("note", notes.value);
  formData.append("_method", "PATCH");

  updateQty(formData);
}

function handlePayment() {
  checkout({
    payment_method: paymentSelected.value,
  });
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
