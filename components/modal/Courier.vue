<template>
  <UModal
    v-model="isOpen"
    :ui="{
      width: 'sm:max-w-2xl',
    }"
  >
    <UCard>
      <template #default>
        <div class="flex flex-col gap-4">
          <p class="text-lg font-medium text-black/85">Pilih Opsi Pengiriman</p>
          <div class="flex gap-2 items-center">
            <p class="font-medium text-black/40">PILIH JASA PENGIRIMAN</p>
            <img
              src="~/assets/images/garansi.png"
              class="object-contain w-3 h-3"
            />
          </div>
          <BaseRadioCard v-model="courierSelected" :items="items">
            <template #item="{ label, value, price, etd, selected, onClick }">
              <div
                class="hover:bg-primary-50 border hover:border-primary-200 p-5"
                :class="[
                  selected
                    ? 'bg-primary-50 border-primary-200'
                    : 'bg-gray-100/50 border-transparent',
                ]"
                role="button"
                @click="onClick(value)"
              >
                <div class="flex gap-5 text-sm">
                  <span class="font-medium">{{ label }}</span>
                  <span>Rp{{ price }}</span>
                </div>
                <p class="text-xs text-black/60 mt-1">
                  Garansi tiba: {{ etd }}
                </p>
              </div>
            </template>
          </BaseRadioCard>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="white" @click="isOpen = false">Nanti Saja</UButton>
          <UButton
            :disabled="!courierSelected"
            :loading="statusUpdate === 'pending'"
            @click="handleConfirmCourier"
            >Konfirmasi</UButton
          >
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { addDays, format } from "date-fns";

const isOpen = defineModel("open", {
  type: Boolean,
  default: false,
});
const model = defineModel({
  type: Object,
});
const courierSelected = ref({});

const { data: courierTiki, status: statusTiki } = useApi(
  "/server/api/cart/shipping?courier=tiki"
);
const { data: courierJne, status: statusJne } = useApi(
  "/server/api/cart/shipping?courier=jne"
);

const { execute, status: statusUpdate } = useSubmit(
  "/server/api/cart/shipping-fee",
  {
    onResponse({ response }) {
      if (response.ok) {
        isOpen.value = false;
        refreshNuxtData("cart");
      }
    },
  }
);

watch(
  model,
  (newCourier) => {
    if (newCourier?.courier) {
      courierSelected.value = newCourier;
    }
  },
  { immediate: true }
);

const items = computed(() => {
  // [
  //   {
  //     label: "Regular",
  //     price: "1000",
  //     value: "REG",
  //     etd: 7,
  //   },
  //   {
  //     label: "Premium",
  //     price: "1000",
  //     value: "PRE",
  //     etd: 7,
  //   },
  // ];
  const tiki = (courierTiki.value.data?.cost || [])?.map((courier) => ({
    label: `TIKI - ${courier.service}`,
    price: formatNumber(courier.value),
    etd: getEstimate(courier.etd),
    value: {
      courier: "tiki",
      service: courier.service,
    },
  }));

  const jne = (courierJne.value.data?.cost || [])?.map((courier) => ({
    label: `JNE - ${courier.service}`,
    price: formatNumber(courier.value),
    etd: getEstimate(courier.etd),
    value: {
      courier: "jne",
      service: courier.service,
    },
  }));

  return [...tiki, ...jne];
});

function handleConfirmCourier() {
  execute(courierSelected.value);
}
</script>

<style lang="scss" scoped></style>
