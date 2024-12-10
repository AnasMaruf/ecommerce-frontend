<template>
  <div class="flex flex-col justify-center items-center gap-6 px-16 pb-16 pt-9">
    <UIcon
      name="i-heroicons:check-circle-solid"
      class="h-36 w-36 text-green-500"
    />
    <p class="text-center text-sm text-black/85">
      Pendaftaran anda berhasil dan anda akan diarahkan ke homepage dalam
      {{ 3 }} detik
    </p>
    <UButton block to="/">Arahkan Sekarang</UButton>
  </div>
</template>

<script setup></script>

<style scoped></style>
