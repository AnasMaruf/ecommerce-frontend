<template>
  <div class="seller-layout">
    <LayoutsHeaderSeller />
    <aside class="seller-sidebar">
      <LayoutsSidebar :items="sidebarItems" />
    </aside>
    <main class="main-content"><slot /></main>
  </div>
</template>

<script setup>
const route = useRoute();
const sidebarItems = computed(() => [
  {
    label: "Pesanan",
    icon: "i-heroicons:clipboard-document-list",
    to: "/seller/order",
  },
  {
    label: "Produk",
    icon: "i-heroicons:inbox-stack",
    children: [
      {
        label: "Produk Saya",
        to: "/seller/product",
        exact: true,
      },
      {
        label: "Tambah Produk Baru",
        to: "/seller/product/add",
      },
    ],
  },
  {
    label: "Voucher",
    icon: "i-heroicons:receipt-percent",
    to: "/seller/voucher",
  },
  {
    label: "Keuangan",
    icon: "i-heroicons:banknotes",
    children: [
      {
        label: "Saldo Saya",
        to: "/seller/balance",
      },
    ],
  },
]);
</script>

<style lang="scss" scoped>
.seller-layout {
  @apply flex flex-col;
  @apply min-h-screen;
  @apply relative;
  @apply text-slate-800;
}

.main-content {
  @apply flex-1;
  @apply bg-black/10;
  @apply pt-[calc(56px+16px)] pb-4 pl-[calc(240px+32px)] pr-8;
}

.seller-sidebar {
  @apply bg-white;
  @apply p-4;
  @apply fixed left-0 bottom-0;
  top: 56px;
  width: 240px;
}
</style>
