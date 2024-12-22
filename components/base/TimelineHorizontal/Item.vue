<template>
  <div
    :class="[
      'timeline-status',
      {
        active,
        passed,
      },
    ]"
  >
    <div class="timeline-status-header">
      <div class="timeline-status-icon">
        <component :is="icon" />
      </div>

      <div v-if="!noLineLeft" class="timeline-status-line-left" />
      <div v-if="!noLineRight" class="timeline-status-line-right" />
    </div>
    <div>
      <p class="timeline-status-title">{{ title }}</p>
      <p class="timeline-status-time">
        {{ time }}
      </p>
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
  passed: {
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
  icon: {
    type: String,
    default: "",
  },
  noLineLeft: {
    type: Boolean,
    default: false,
  },
  noLineRight: {
    type: Boolean,
    default: false,
  },
});
</script>

<style scoped>
.timeline-status {
  @apply flex flex-col items-stretch gap-5;
}

.timeline-status-header {
  @apply flex justify-center items-center relative w-full;
}

.timeline-status-icon {
  @apply rounded-full border-4 border-gray-200 flex items-center justify-center w-14 h-14 bg-white relative z-10;
  @apply text-gray-200;
}

.timeline-status-line-left {
  @apply h-1 bg-gray-200 w-1/2 absolute left-0 z-0;
}

.timeline-status-line-right {
  @apply h-1 bg-gray-200 w-1/2 absolute right-0 z-0;
}

.timeline-status-title {
  @apply text-sm text-center;
}

.timeline-status-time {
  @apply text-black/25 text-xs text-center mt-1;
}

.timeline-status.active .timeline-status-icon {
  @apply bg-green-600 text-white;
  @apply border-green-600;
}

.timeline-status.active .timeline-status-line-left {
  @apply bg-green-600;
}

.timeline-status.passed .timeline-status-icon {
  @apply border-green-600 text-green-600;
}

.timeline-status.passed .timeline-status-line-left,
.timeline-status.passed .timeline-status-line-right {
  @apply bg-green-600;
}
</style>
