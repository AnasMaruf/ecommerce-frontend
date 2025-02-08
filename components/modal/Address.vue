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
          <div
            v-if="status === 'pending'"
            class="flex gap-2 justify-center py-6"
          >
            <IconLoading class="w-6 text-primary" />
            <p>Loading...</p>
          </div>
          <URadioGroup
            v-else
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
                  v-if="option.is_default || option.type === 'office'"
                  :color="option.is_default ? 'primary' : 'gray'"
                  variant="outline"
                  class="mt-2"
                >
                  <template v-if="option.is_default">Utama</template>
                  <template v-else> Kantor </template>
                </UBadge>
              </div>
            </template>
          </URadioGroup>
        </div>
      </template>
      <template #footer>
        <div class="flex justify-end gap-2">
          <UButton
            color="white"
            :disabled="statusUpdate === 'pending'"
            @click="isOpen = false"
            >Batalkan</UButton
          >
          <UButton
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
const isOpen = defineModel("open", {
  type: Boolean,
  default: false,
});
const model = defineModel({
  type: Object,
});

const nuxtApp = useNuxtApp();

const addressSelected = ref("");

const { data, status } = useApi("/server/api/address", {
  key: "address-list",
  getCachedData() {
    return (
      nuxtApp.payload.data?.["address-list"] ||
      nuxtApp.static.data?.["address-list"]
    );
  },
});

const { execute, status: statusUpdate } = useSubmit(
  "/server/api/cart/update-address",
  {
    onResponse({ response }) {
      if (response.ok) {
        isOpen.value = false;
        model.value = data.value?.data?.find(
          (item) => item.uuid === addressSelected.value
        );
        refreshNuxtData("cart");
      }
    },
  }
);

watch(model, (newValue) => {
  if (newValue?.uuid) {
    addressSelected.value = newValue.uuid;
  }
});

const addressList = computed(() => {
  // [
  //   {
  //     value: "address1",
  //     label: "Irsyaad Budi",
  //     description: "Jalan raya",
  //     no_hp: "08912313123123",
  //     status: "default",
  //   },
  //   {
  //     value: "address2",
  //     label: "Irsyaad Budi",
  //     description: "Jalan raya",
  //     no_hp: "08912313123123",
  //     status: "shop",
  //   },
  //   {
  //     value: "address3",
  //     label: "Irsyaad Budi",
  //     description: "Jalan raya",
  //     no_hp: "08912313123123",
  //     status: "",
  //   },
  // ];

  return data.value?.data?.map((item) => ({
    value: item.uuid,
    label: item.receiver_name,
    description: `${item?.detail_address} ${item?.district}, ${item?.city?.name}, ${item?.city?.province?.name}, ${item?.postal_code} ${item?.address_note}`,
    no_hp: item.receiver_phone,
    is_default: item.is_default,
    type: item.type,
  }));
});

function handleConfirmCourier() {
  execute({
    uuid: addressSelected.value,
  });
}
</script>

<style lang="scss" scoped></style>
