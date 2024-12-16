<template>
  <div>
    <DefineItem v-slot="{ icon, label }">
      <div class="sidebar-item">
        <UIcon v-if="icon" :name="icon" class="sidebar-item-icon" />
        <p class="sidebar-item-label">{{ label }}</p>
      </div>
    </DefineItem>
    <NuxtLink v-if="!item.children" :to="item.to">
      <ReuseItem v-bind="item" />
    </NuxtLink>
    <template v-else>
      <UAccordion
        :items="[item]"
        :ui="{
          item: {
            color: 'text-slate-800',
            padding: 'pb-0',
          },
        }"
      >
        <template #default="{ open, item: parent }">
          <div class="flex gap-2 items-center hover:text-primary" role="button">
            <ReuseItem v-bind="parent" class="flex-1" />
            <UIcon
              name="i-heroicons:chevron-down-20-solid"
              class="w-4 h-4 transition-all"
              :class="[open && 'rotate-180']"
            />
          </div>
        </template>
        <template #item>
          <div class="pl-8 flex flex-col gap-4 mt-4">
            <LayoutsSidebarItem
              v-for="(child, index) in item.children"
              :key="`child-${child.label}-${index}`"
              :item="child"
            />
          </div>
        </template>
      </UAccordion>
    </template>
  </div>
</template>
<script setup>
defineProps({
  item: {
    type: Object,
    default: () => ({}),
  },
});

const [DefineItem, ReuseItem] = createReusableTemplate();
</script>

<style scoped>
.sidebar-item {
  @apply flex gap-2 items-center hover:text-primary;
}
.sidebar-item-icon {
  @apply w-6 h-6;
}
.sidebar-item-label {
  @apply text-sm;
}
.router-link-active {
  @apply text-primary;
}
</style>
