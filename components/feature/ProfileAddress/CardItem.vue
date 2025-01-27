<template>
  <div class="py-4 text-sm flex flex-col gap-1">
    <div class="flex justify-between items-center gap-3">
      <div class="flex divide-x items-center">
        <p class="text-base font-medium pr-2">{{ item.receiver_name }}</p>
        <span class="text-black/55 pl-2">{{ item.receiver_phone }}</span>
      </div>
      <UButton
        color="blue"
        variant="link"
        :padded="false"
        size="xs"
        @click="emit('change', item)"
      >
        Ubah
      </UButton>
    </div>
    <div class="flex justify-between items-start text-black/55">
      <div>
        <p>{{ item.detail_address }}</p>
        <p>
          {{ item.district }}, {{ item.city?.name }},
          {{ item.city?.province?.name }}, {{ item.postal_code }}
        </p>
        <p v-if="item.address_note">{{ item.address_note }}</p>
      </div>
      <UButton
        color="white"
        size="xs"
        :disabled="item.is_default"
        :loading="status === 'pending'"
        @click="handleUpdateDefaultAddress"
      >
        Atur sebagai utama
      </UButton>
    </div>
    <div v-if="item.is_default">
      <UBadge color="primary" variant="outline" size="xs">Utama</UBadge>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const emit = defineEmits(["change", "change:status"]);

const { execute, status } = useSubmit(
  computed(() => `/server/api/address/${props.item.uuid}/set-default`)
);

async function handleUpdateDefaultAddress() {
  if (props.item.is_default) return;
  await execute();

  if (status.value === "success") {
    refreshNuxtData("address-list");
  }
}
</script>

<style lang="scss" scoped></style>
