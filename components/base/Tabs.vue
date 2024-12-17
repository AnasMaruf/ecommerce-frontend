<template>
  <UTabs
    v-model="tabActive"
    :items="item"
    :ui="{
      list: {
        background: 'bg-white border-b',
        padding: 'p-0',
        rounded: 'rounded-none',
        marker: {
          wrapper: '!top-[0px] left-0 !h-[100%] border-b-2 border-primary',
          rounded: 'rounded-none',
          shadow: 'shadow-none',
        },
        tab: {
          active: 'text-primary',
          inactive: 'text-black/80',
          rounded: 'rounded-none',
        },
      },
    }"
  >
    <template #item="{ item }">
      <template v-if="options[item.key].length">
        <UButton
          v-for="child in options[item.key]"
          :key="child.uuid"
          variant="ghost"
          block
          :color="form[item.key]?.uuid === child.uuid ? 'primary' : 'gray'"
          class="justify-start"
          :label="child.name"
          @click="handleSelect(child, item.key, close)"
        />
      </template>
      <p v-else class="text-center my-3 text-black/40">
        Tidak ada data yang ditemukan
      </p>
    </template>
  </UTabs>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped></style>
