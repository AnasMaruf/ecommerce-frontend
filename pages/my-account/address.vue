<template>
  <div>
    <div class="flex justify-between gap-4 items-center">
      <h3 class="text-lg font-medium">Alamat Saya</h3>
      <UButton @click="openEditor = true">Tambah alamat baru</UButton>
    </div>
    <hr class="mt-5 mb-3 border-gray-200/60" />
    <h4 class="text-lg font-normal">Alamat</h4>
    <div class="divide-y">
      <FeatureProfileAddressCardItem
        v-for="address in addressList"
        :key="address.uuid"
        :item="address"
        @change="handleChange"
      />
    </div>
    <FeatureProfileAddressModalMutation v-model:open="openEditor" />
  </div>
</template>

<script setup>
const openEditor = ref(false);
const addressList = [
  {
    uuid: "8c438746-79c5-11ef-b707-97a05ceb87e2",
    is_default: true,
    receiver_name: "Azis Hapidin",
    receiver_phone: "08888",
    city: {
      uuid: "ee8eb26c-78fe-11ef-bd77-9e4478916c69",
      province: {
        uuid: "ee8d857c-78fe-11ef-bd77-9e4478916c69",
        name: "Bali",
      },
      external_id: 128,
      name: "Kabupaten Gianyar",
    },
    district: "Bojong",
    postal_code: "43222",
    detail_address: "Jl. ABC No. 123",
    address_note: "Dekat tugu pahlawan",
    type: "home",
  },
  {
    uuid: "953bc2be-79c5-11ef-b707-97a05ceb87e2",
    is_default: false,
    receiver_name: "Azis Hapidin",
    receiver_phone: "08888",
    city: {
      uuid: "ee8eb26c-78fe-11ef-bd77-9e4478916c69",
      province: {
        uuid: "ee8d857c-78fe-11ef-bd77-9e4478916c69",
        name: "Bali",
      },
      external_id: 128,
      name: "Kabupaten Gianyar",
    },
    district: "Bojong",
    postal_code: "43222",
    detail_address: "Jl. ABC No. 123",
    address_note: "Dekat tugu pahlawan",
    type: "home",
  },
];
function handleChange() {
  openEditor.value = true;
}
</script>

<style scoped></style>
