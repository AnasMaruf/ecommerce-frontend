<template>
  <div>
    <div class="flex gap-7 items-center">
      <UButton icon="i-heroicons:arrow-left" variant="link" />
      <h3 class="text-xl font-normal">Masukkan Kode OTP</h3>
    </div>
    <div class="px-16 pb-16 pt-9">
      <p class="text-center text-sm text-black/80">
        Kode OTP telah dikirim via e-mail ke
      </p>
      <p class="text-center font-medium text-black/80 mt-2">
        anasmaruf@gmail.com
      </p>
      <form class="space-y-6 mt-16">
        <UFormGroup>
          <BaseInputPin v-model="otpValue" />
        </UFormGroup>
        <div>
          <p class="text-black/50 text-sm text-center">
            Mohon tunggu {{ 47 }} detik untuk mengirim ulang
          </p>
          <UButton block class="uppercase mt-2">Berikutnya</UButton>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const otpValue = ref("");
</script>

<style scoped></style>
