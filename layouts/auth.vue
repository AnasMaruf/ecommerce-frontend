<template>
  <div class="auth-layout">
    <LayoutsHeaderWhite />
    <main class="main-layout"><slot /></main>
    <LayoutsFooter />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
.auth-layout {
  @apply flex flex-col;
  @apply min-h-screen;
  @apply bg-red-200;
}

.main-layout {
  @apply flex-1;
  @apply bg-slate-300;
}

.header-white {
  background-color: white;
}
</style>
