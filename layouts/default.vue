<template>
  <div class="default-layout">
    <LayoutsHeaderOrange />
    <main class="main-layout"><slot /></main>
    <LayoutsFooter />
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.default-layout {
  @apply flex flex-col;
  @apply min-h-screen;
  @apply bg-red-200;
}

.main-layout {
  @apply flex-1;
  @apply bg-[#f5f5f5];
}
</style>
