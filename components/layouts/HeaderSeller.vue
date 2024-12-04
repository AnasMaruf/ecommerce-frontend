<template>
  <header class="header-seller">
    <UBreadcrumb :links="breadcrumb" :ui="ui" />
    <UDropdown :items="profileItems">
      <template #default="{ open }">
        <div class="flex gap-2 items-center">
          <UAvatar alt="Anas Maruf" />
          <p>Anas Maruf</p>
          <UIcon
            name="i-heroicons:chevron-down-20-solid"
            class="w-4 h-4 transition-all"
            :class="[open && 'rotate-180']"
          />
        </div>
      </template>
    </UDropdown>
  </header>
</template>

<script setup>
const route = useRoute();
const breadcrumb = computed(() => {
  const defaultBreadcrumb = [{ label: "beranda" }];
  if (!route.meta.breadcrumb || !Array.isArray(route.meta.breadcrumb)) {
    return defaultBreadcrumb;
  }
  return [...defaultBreadcrumb, ...route.meta.breadcrumb];
});

const profileItems = [
  [
    {
      label: "Switch to Customer",
      icon: "i-heroicons:arrow-path",
    },
    {
      label: "Logout",
      icon: "i-heroicons:arrow-left-start-on-rectangle",
    },
  ],
];

const ui = {
  active: "text-slate-800",
  inactive: "text-black/50",
  base: "font-normal text-lg",
};
</script>

<style scoped>
.header-seller {
  @apply bg-white px-4 py-3;
  @apply shadow;
  @apply fixed top-0 left-0 right-0 z-50;
  @apply flex justify-between gap-2;
}
</style>
