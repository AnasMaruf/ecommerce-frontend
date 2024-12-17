<template>
  <UModal v-model="open">
    <UCard :ui="{ rounded: 'rounded-sm' }"
      ><h3>Alamat Baru</h3>
      <form action="" class="grid grid-cols-2 gap-5 mt-5">
        <UFormGroup>
          <UInput placeholder="Nama Lengkap" size="lg" />
        </UFormGroup>
        <UFormGroup>
          <UInput placeholder="Nomor Telephone" size="lg" />
        </UFormGroup>
        <UFormGroup class="col-span-2">
          <FeatureProfileAddressInputSelectCity />
          <!-- <UInput placeholder="Provinsi, Kota" size="lg" /> -->
        </UFormGroup>
        <UFormGroup>
          <UInput placeholder="Kecamatan" size="lg" />
        </UFormGroup>
        <UFormGroup>
          <UInput placeholder="Kode Pos" size="lg" />
        </UFormGroup>
        <UFormGroup class="col-span-2">
          <UTextarea placeholder="Nama Jalan, Gedung, No. Rumah" size="lg" />
        </UFormGroup>
        <UFormGroup class="col-span-2">
          <UInput placeholder="Detail Lainnya" size="lg" />
        </UFormGroup>
        <div class="col-span-2">
          <label for="" class="text-sm font-normal text-black/80"
            >Tandai Sebagai:</label
          >
          <div class="flex gap-2 justify-start my-2">
            <UButton
              color="white"
              :ui="{
                padding: {
                  sm: 'py-3 px-3',
                },
              }"
              >Rumah</UButton
            >
            <UButton
              color="white"
              :ui="{
                padding: {
                  sm: 'py-3 px-3',
                },
              }"
              >Kantor</UButton
            >
          </div>
          <UCheckbox
            label="Atur sebagai alamat pribadi"
            :ui="{ label: 'text-black/55' }"
          />
        </div>
        <div class="flex justify-end mt-6 gap-2 col-span-2">
          <UButton
            label="Nanti Saja"
            color="gray"
            class="max-w-36"
            variant="link"
            block
            @click="handleCancel"
          />
          <UButton label="OK" class="max-w-36" block @click="handleSave" />
        </div>
      </form>
    </UCard>
  </UModal>
</template>

<script setup>
const open = defineModel("open", {
  type: Boolean,
  default: false,
});

function handleCancel() {
  open.value = false;
}
function handleSave() {
  open.value = false;
}
</script>

<style scoped></style>
