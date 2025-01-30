<template>
  <form
    :class="[
      'searchbar',
      {
        'no-padded': !padded,
      },
    ]"
    @submit.prevent="handleSearch"
  >
    <input v-model="searchInput" placeholder="CEK: Flash Sale Rp17 Lokal!" />
    <UButton
      type="submit"
      icon="i-heroicons:magnifying-glass"
      class="px-6"
      v-bind="attribute"
    />
  </form>
</template>

<script setup>
const props = defineProps({
  padded: {
    type: Boolean,
    default: true,
  },
});

const router = useRouter();
const route = useRoute();

const searchInput = ref(route.query?.search || "");

const attribute = computed(() => {
  if (!props.padded) {
    return {
      ui: {
        rounded: "rounded-none",
      },
    };
  }
  return {};
});

watch(
  () => route.query.search,
  (newSearch) => {
    searchInput.value = newSearch;
  }
);

function handleSearch() {
  router.push({
    path: "/search",
    query: {
      ...route.query,
      search: searchInput.value,
    },
  });
}
</script>

<style scoped>
.searchbar {
  @apply bg-white;
  @apply flex items-center;
  @apply rounded-sm;
  @apply text-black;
}

.searchbar:not(.no-padded) {
  @apply p-1;
}

.searchbar.no-padded {
  @apply border-2 border-primary;
}

.searchbar input {
  @apply outline-none pl-3;
  @apply flex-1;
}
</style>
