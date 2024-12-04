<template>
  <div
    class="flex flex-row-reverse items-center justify-end -ml-[2px]"
    :class="{ 'cursor-pointer': !disabled }"
  >
    <template v-for="star in starsLength" :key="`star-${star}`">
      <UIcon
        name="i-heroicons-star-solid"
        class="peer transition-all duration-150"
        :class="[
          { [hoverColor[color]]: !disabled },
          modelValue && star <= modelValue
            ? activeColor[color]
            : 'text-gray-200',
          sizeClass[size],
        ]"
        @click="onChange(star)"
      />
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false,
  },
  maxStars: {
    type: Number,
    default: 5,
  },
  size: {
    type: String,
    default: "sm",
    validator: (value) => ["sm", "lg"].includes(value),
  },
  color: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "yellow"].includes(value),
  },
});

const sizeClass = {
  sm: "h-4 w-4",
  lg: "h-5 w-5",
};

const hoverColor = {
  primary: "peer-hover:text-primary hover:text-primary",
  yellow: "peer-hover:text-yellow-400 hover:text-yellow-400",
};

const activeColor = {
  primary: "text-primary",
  yellow: "text-yellow-400",
};

const modelValue = defineModel({
  type: Number,
});

const starsLength = computed(() =>
  Array.from({ length: props.maxStars }, (_, i) => i + 1).reverse()
);

function onChange(value) {
  if (!props.disabled) {
    modelValue.value = value;
  }
}
</script>

<style scoped></style>
