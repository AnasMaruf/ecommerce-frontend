<template>
  <div class="flex gap-3">
    <div class="relative">
      <div class="w-6 h-6 flex justify-center">
        <div v-if="!noLine" class="absolute inset-0 flex justify-center">
          <div class="bg-gray-300 w-[1px] h-full" />
        </div>
        <div
          class="w-3 h-3 rounded-full relative"
          :class="{
            'bg-gray-300': !active,
            'bg-teal-500': active,
          }"
        />
      </div>
    </div>
    <div class="flex gap-4 pb-2">
      <span class="text-sm">{{ time }}</span>
      <span
        class="flex-1"
        :class="{
          'text-black/55': !active,
          'text-teal-500': active,
        }"
      >
        {{ title }}
      </span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  noLine: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    default: "",
  },
  time: {
    type: String,
    default: "",
  },
});
</script>

<style lang="scss" scoped></style>
