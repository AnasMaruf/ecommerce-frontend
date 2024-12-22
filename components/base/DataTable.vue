<template>
  <UCard
    :ui="{
      base: 'border border-gray-100',
      rounded: 'rounded overflow-hidden',
      ring: '',
      divide: 'divide-y divide-gray-100',
      header: { padding: 'px-4 py-5' },
      body: {
        padding: '',
        base: 'divide-y divide-gray-100',
      },
      footer: { padding: 'p-4' },
      shadow: 'shadow-none'
    }"
  >
    <UTable
      v-bind="$attrs"
      :ui="{
        divide: 'divide-y-0',
        thead: 'bg-gray-100',
        th: {
          color: 'text-black/55',
          font: 'font-normal',
        },
        tbody: 'divide-y-0',
        td: {
          color: 'text-black/80',
        },
      }"
    >
      <template #empty-state>
        <div class="flex flex-col items-center justify-center py-6 gap-3">
          <IconEmpty />
          <span class="text-black/50">{{ emptyText }}</span>
        </div>
      </template>

      <template v-for="(_, slotName) in $slots" #[slotName]="slotScope">
        <slot :name="slotName" v-bind="slotScope" />
      </template>
    </UTable>
    <div class="flex justify-end py-3">
      <BasePagination v-model="page" :total-product="total" />
    </div>
  </UCard>
</template>

<script setup>
defineOptions({
  inheritAttrs: false,
});

defineProps({
  total: {
    type: Number,
    default: 0,
  },
  emptyText: {
    type: String,
    default: "Belum Ada Data",
  },
});

const page = defineModel("page", {
  type: Number,
  default: 0,
});
</script>

<style lang="scss" scoped></style>
