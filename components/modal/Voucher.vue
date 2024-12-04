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
        header: {
          bas,
        },
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
              <UButton color="white" size="sm" class="py-2 h-10">
                PAKAI
              </UButton>
            </div>
          </div>
          <label
            v-for="i in 3"
            :key="i"
            class="shadow-border border-black/5 flex"
            role="button"
          >
            <div
              class="bg-primary aspect-[1/1] w-32 flex justify-center items-center flex-col text-white"
            >
              <UIcon name="i-heroicons:receipt-percent" class="w-8 h-8" />
              <p class="mt-2 text-xs uppercase">Voucher</p>
            </div>
            <div class="p-5 flex-1 flex justify-between items-center">
              <div class="flex flex-col">
                <p class="text-2xl font-medium text-black/80">Diskon 100RB</p>
                <span class="mt-2 text-black/55 text-xs">
                  Berakhir dlm: 1 Hari
                </span>
                <span class="text-primary text-sm mt-1">Azizah Store</span>
              </div>
              <URadio v-model="temporaryVoucher" :value="`voucher-${i}`" />
            </div>
          </label>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="white" @click="handleClose"> NANTI SAJA </UButton>
          <UButton
            class="min-w-[140px] justify-center"
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
const isOpen = defineModel({
  type: Boolean,
});
const temporaryVoucher = ref("");

const newVoucher = ref("");
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
</script>

<style lang="scss" scoped></style>
