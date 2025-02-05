<template>
  <UModal
    v-model="isOpen"
    prevent-close
    :ui="{
      width: 'sm:max-w-[38rem]',
    }"
  >
    <UCard
      :ui="{
        footer: {
          padding: 'py-3 sm:py-3',
        },
      }"
    >
      <template #default>
        <div class="flex flex-col gap-5">
          <p class="text-xl">Pilih Voucher Syopo</p>
          <div>
            <div class="bg-[#F8F8F8] p-4 flex gap-3 items-center">
              <span class="text-sm text-black/80">Tambah Voucher</span>
              <UInput
                v-model="newVoucher"
                placeholder="Masukkan kode Voucher"
                class="flex-1"
                size="lg"
              />
              <UButton
                color="white"
                size="sm"
                class="py-2 h-10"
                :loading="statusApply === 'pending'"
                @click="handlePrivateVoucher"
              >
                PAKAI
              </UButton>
            </div>
          </div>
          <div
            v-if="status === 'pending'"
            class="py-4 flex gap-4 items-center justify-center"
          >
            <IconLoading class="text-primary w-6" />
            <p>Loading...</p>
          </div>
          <template v-else>
            <label
              v-for="voucher in data?.data"
              :key="voucher.code"
              class="shadow border border-black/5 flex"
              role="button"
            >
              <div
                class="bg-primary aspect-[1/1] w-32 flex justify-center items-center flex-col text-white"
              >
                <UIcon name="i-heroicons:receipt-percent" class="w-8 h-8" />
                <p class="mt-2 text-xs uppercase">{{ voucher.code }}</p>
              </div>
              <div class="p-5 flex-1 flex justify-between items-center">
                <div class="flex flex-col">
                  <p class="text-2xl font-medium text-black/80">
                    {{
                      voucher.voucher_type === "discount"
                        ? "Diskon"
                        : "Cashback"
                    }}
                    {{
                      voucher.discount_cashback_type === "percentage"
                        ? `${voucher.discount_cashback_value}%`
                        : formatRb(voucher.discount_cashback_value)
                    }}
                  </p>
                  <p
                    v-if="voucher.discount_cashback_type === 'percentage'"
                    class="text-xs text-black/55"
                  >
                    Maksimum Rp{{ formatNumber(voucher.discount_cashback_max) }}
                  </p>
                  <span class="mt-2 text-black/55 text-xs">
                    Berakhir dlm: {{ getDiffDay(voucher.end_date) }} hari
                  </span>
                  <span class="text-primary text-sm mt-1">{{
                    voucher.seller.store_name
                  }}</span>
                </div>
                <URadio v-model="temporaryVoucher" :value="voucher.code" />
              </div>
            </label>
          </template>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="white" @click="handleClose"> NANTI SAJA </UButton>
          <UButton
            class="min-w-[140px] justify-center"
            :loading="statusApply === 'pending'"
            @click="handleUseVoucher"
          >
            OK
          </UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
import { differenceInDays } from "date-fns";

const isOpen = defineModel({
  type: Boolean,
});
const nuxtApp = useNuxtApp();
const temporaryVoucher = ref("");

const newVoucher = ref("");

const { data, status } = useApi("/server/api/cart/get-voucher", {
  key: "voucher-list",
  getCachedData() {
    return (
      nuxtApp.payload.data?.["voucher-list"] ||
      nuxtApp.static.data?.["voucher-list"]
    );
  },
});

const { execute: applyVoucher, status: statusApply } = useSubmit(
  "/server/api/cart/apply-voucher",
  {
    onResponse({ response }) {
      if (response.ok) {
        handleClose();
        refreshNuxtData("cart");
      }
    },
  }
);

function getDiffDay(endDate) {
  const _endDate = new Date(endDate);
  const today = new Date();
  return differenceInDays(_endDate, today);
}

function handleClose() {
  isOpen.value = false;
  newVoucher.value = "";
  temporaryVoucher.value = "";
}

function handleUseVoucher() {
  applyVoucher({
    voucher_code: temporaryVoucher.value,
  });
}

function handlePrivateVoucher() {
  if (!newVoucher.value) return;
  applyVoucher({
    voucher_code: newVoucher.value,
  });
}
</script>

<style lang="scss" scoped></style>
