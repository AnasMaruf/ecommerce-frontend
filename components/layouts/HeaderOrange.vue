<template>
  <header class="header-orange">
    <LayoutsHeaderProfile v-if="defaultMeta.showProfile" />
    <div class="header-bottom">
      <UContainer class="header-bottom-container">
        <BaseLogo />
        <LayoutsSearchBar v-if="defaultMeta.showSearch" class="flex-1" />
        <UChip
          v-if="defaultMeta.showCart"
          :text="countCart"
          size="2xl"
          :show="countCart > 0"
        >
          <UButton variant="link" to="/cart">
            <IconCart />
          </UButton>
        </UChip>
      </UContainer>
    </div>
  </header>
</template>

<script setup>
const route = useRoute();
// const meta = {
//   showProfile: false,
//   title:"Keranjang",
//   showSearch: false,
// }
const defaultMeta = computed(() => {
  return {
    showProfile:
      route.meta?.header && "showProfile" in route.meta.header
        ? route.meta.header.showProfile
        : true,
    showSearch:
      route.meta?.header && "showSearch" in route.meta.header
        ? route.meta.header.showSearch
        : true,
    showCart:
      route.meta?.header && "showCart" in route.meta.header
        ? route.meta.header.showCart
        : true,
  };
});

const { data } = useApi(`/server/api/cart`, {
  server: false,
  key: "cart",
});

const countCart = computed(() =>
  data.value?.data?.items?.reduce((result, current) => {
    result += current.qty;
    return result;
  }, 0)
);
</script>

<style lang="scss" scoped>
.header-orange {
  @apply text-white;
  @apply flex flex-col;
}

.header-orange .header-bottom {
  @apply bg-gradient-to-b from-primary to-[#ff6633];
  @apply flex-1;
  @apply py-6;
}

.header-bottom-container {
  @apply flex justify-between items-center gap-12;
  @apply h-full;
}
</style>
