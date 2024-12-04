<template>
  <UModal
    v-model="isOpen"
    :ui="{
      width: 'sm:max-w-2xl',
    }"
  >
    <UCard>
      <template #header>
        <p class="text-lg font-medium text-black/85">Alamat Saya</p>
      </template>
      <template #default>
        <div class="flex flex-col gap-4">
          <URadioGroup
            v-model="addressSelected"
            :options="addressList"
            :ui="{
              wrapper: 'items-stretch',
              fieldset: 'grid grid-cols-1 divide-y w-full',
            }"
            :ui-radio="{
              wrapper: 'py-4',
              label: 'w-full',
              inner: 'flex-1',
            }"
          >
            <template #label="{ option }">
              <div class="flex divide-x">
                <p class="font-medium text-black/85 pr-2">{{ option.label }}</p>
                <p class="font-normal text-black/55 pl-2">{{ option.no_hp }}</p>
              </div>
              <div>
                <p class="text-sm text-black/55 font-normal">
                  {{ option.description }}
                </p>
                <UBadge
                  v-if="option.status"
                  :color="option.status === 'default' ? 'primary' : 'gray'"
                  variant="outline"
                  class="mt-2"
                >
                  {{ option.status === "default" ? "Utama" : "Alamat Toko" }}
                </UBadge>
              </div>
            </template>
          </URadioGroup>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton color="white" @click="isOpen = false">Batalkan</UButton>
          <UButton @click="handleConfirmCourier">Konfirmasi</UButton>
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup>
const isOpen = defineModel("open", {
  type: Boolean,
  default: false,
});
const model = defineModel({
  type: Object,
});
const addressSelected = ref("");
const addressList = computed(() => [
  {
    value: "Address1",
    label: "Anas Ma'ruf",
    description: "Jalan raya km 9",
    no_hp: "085526271924",
    status: "default",
  },
  {
    value: "Address2",
    label: "Rudi Van Nistelrooy",
    description: "Jalan raya km 19",
    no_hp: "085526271924",
    status: "Shop",
  },
  {
    value: "Address3",
    label: "Rudianto",
    description: "Jalan raya km 9",
    no_hp: "085526271924",
    status: "",
  },
]);

function handleConfirmCourier() {
  isOpen.value = false;
  model.value = items.value.find(
    (item) => item.value === courierSelected.value
  );
}
</script>

<style scoped></style>
