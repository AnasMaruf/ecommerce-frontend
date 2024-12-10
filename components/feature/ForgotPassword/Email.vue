<template>
  <div>
    <div class="flex gap-7 items-center">
      <UButton icon="i-heroicons:arrow-left" variant="link" />
      <h3 class="text-xl font-normal">Reset Password</h3>
    </div>
    <div class="px-16 pb-16 pt-9">
      <form class="space-y-6">
        <UFormGroup>
          <UInput type="email" placeholder="Email" size="lg" />
        </UFormGroup>
        <UButton block class="uppercase">Berikutnya</UButton>
      </form>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
