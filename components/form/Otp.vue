<template>
  <div class="flex gap-7 items-center">
    <UButton
      icon="i-heroicons:arrow-left"
      variant="link"
      @click="emit('back')"
    />
    <h3 class="text-xl font-normal">Masukkan Kode OTP</h3>
  </div>
  <div class="px-16 pb-16 pt-9">
    <p class="text-center text-sm text-black/80">
      Kode OTP telah dikirim via e-mail ke
    </p>
    <p class="text-center font-medium text-black/80 mt-2">
      {{ showingEmail }}
    </p>
    <form class="space-y-16 mt-16">
      <UFormGroup
        :error="errorMessages"
        :ui="{
          error: 'text-center',
        }"
      >
        <BaseInputPin v-model="otpValue" />
      </UFormGroup>
      <div>
        <p v-if="isRunning" class="text-black/25 text-sm text-center">
          Mohon tunggu {{ displayValue }} detik untuk mengirim ulang.
        </p>
        <div v-else class="text-black/25 text-sm text-center">
          Tidak mendapatkan kode?
          <UButton
            variant="link"
            :padded="false"
            color="blue"
            :loading="loadingResend"
            @click="emit('resend')"
          >
            Kirim Ulang
          </UButton>
        </div>
        <UButton
          block
          class="uppercase mt-2"
          :loading="loading"
          :disabled="otpValue.length !== 6"
          @click="handleSubmit"
        >
          Berikutnya
        </UButton>
      </div>
    </form>
  </div>
</template>

<script setup>
defineProps({
  loading: {
    type: Boolean,
    default: false,
  },
  loadingResend: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["next", "back", "resend"]);
const { registrationForm } = storeToRefs(useSession());
const otpValue = ref("");
const errorMessages = ref("");

const { maskEmail } = useMasking();
const showingEmail = computed(() => maskEmail(registrationForm.value.email));

const { startCountdown, displayValue, isRunning } = useCountdown();
startCountdown(30);

function handleSubmit() {
  if (otpValue.value.length !== 6) {
    return;
  }

  emit("next", {
    otp: otpValue.value,
  });
}

defineExpose({
  startCountdown: () => startCountdown(30),
  setError: (error) => {
    errorMessages.value = error;
  },
});
</script>

<style lang="scss" scoped></style>
