<template>
  <div class="flex gap-5 justify-center">
    <input
      v-for="i in length"
      ref="inputElement"
      :key="`pin-${i}`"
      :value="model[i - 1]"
      class="outline-none border-b bg-transparent w-9 text-center"
      :maxlength="1"
      @input="setValue(i - 1, $event)"
      @keyup="handleNextInput($event, i)"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  length: {
    type: Number,
    default: 6,
  },
});

const model = defineModel({
  type: String,
  get(value) {
    return value
      ? value.split("")
      : Array.from({ length: props.length }, () => "");
  },
  set(value) {
    if ("index" in value && "value" in value) {
      const duplicateArray = structuredClone(model.value);
      duplicateArray[value.index] = value.value;
      return duplicateArray.join("");
    }
    return value;
  },
  default: () => [],
});

const inputElement = ref();

function handleNextInput($event, index) {
  const key = $event.keyCode || $event.charCode;

  if (key == 8 || key == 46) {
    if (index - 1 > 0) {
      return inputElement.value[index - 2]?.focus?.();
    }
    return;
  }

  if (/\d/.test(String.fromCharCode(key))) {
    inputElement.value[index]?.focus?.();
  }
}

function setValue(index, event) {
  const { value } = event.target;
  model.value = { index, value };
}

</script>

<style lang="scss" scoped></style>
