<template>
  <div>
    <div class="flex gap-7 items-center">
      <UButton icon="i-heroicons:arrow-left" variant="link" />
      <h3 class="text-xl font-normal">Atur Password Kamu</h3>
    </div>
    <div class="px-16 pb-16 pt-9">
      <form class="space-y-6">
        <p class="text-center text-sm text-black/80">Buat password baru</p>
        <UFormGroup>
          <BaseInputPassword placeholder="password" size="lg" />
        </UFormGroup>
        <ul>
          <li
            v-for="validation in validationMessage"
            :key="validation.key"
            class="text-red-500 text-sm"
          >
            {{ validation.message }}
            <UIcon name="i-heroicons:x-circle" class="w-5 h-5 -mb-1.5" />
          </li>
        </ul>
        <UButton block class="uppercase">Berikutnya</UButton>
      </form>
    </div>
  </div>
</template>

<script setup>
const password = ref("");
const validationMessage = [
  { message: "Min. satu karakter huruf kecil", key: "lowercase" },
  { message: "Min. satu karakter huruf besar", key: "uppercase" },
  { message: "8-16 karakter", key: "validLength" },
  {
    message: "Hanya huruf, angka, dan tanda baca umum yang dapat digunakan",
    key: "allowedChar",
  },
];

const isContain = ref({
  lowercase: false,
  uppercase: false,
  validLength: false,
  allowedChar: false,
});

function hasLowerCase(str) {
  return /[a-z]/.test(str);
}
function hasUpperCase(str) {
  return /[A-Z]/.test(str);
}
function hasValidLength(str) {
  return str.length >= 8 && str.length <= 16;
}
function hasAllowedChar(str) {
  return /^[a-zA-Z0-9,.!?-]+$/.test(str);
}
</script>

<style scoped></style>
