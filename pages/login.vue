<template>
  <section class="bg-primary">
    <UContainer class="grid grid-cols-2 h-full py-10">
      <div class="flex justify-center items-center">
        <div class="flex flex-col gap-14 text-white text-center">
            <h1 class="text-8xl">Syopo</h1>
            <p>Tempat belanja online No. 1<hr/> di Asia Tenggara dan Taiwan</p>
        </div>
      </div>
      <div>
        <UCard class="w-96" :ui="{ rounded: 'rounded-sm' }">
            <h2>Login</h2>
            <form class="mt-7 space-y-7">
                <UFormGroup>
                    <UInput placeholder="No. Handphone/Email" size="lg"/>
                </UFormGroup>
                <UFormGroup>
                    <BaseInputPassword placeholder="Password" size="lg"/>
                </UFormGroup>
                <div>
                    <UButton block>Log In</UButton>
                    <UButton variant="link" color="blue" :padded="false" to="/forgot-password">Lupa Password</UButton>
                </div>
            </form>
            <UDivider label="ATAU" class="my-4" :ui="{ label:'text-gray-400 font-normal' }" />
            <UButton block color="white"><img src="~/assets/images/google.png" alt="" class="w-6">Google</UButton>
            <p class="text-sm font-normal text-black/55 text-center mt-8">Baru di Syopo? <NuxtLink to="/registration" class="text-primary">Daftar Sekarang</NuxtLink></p>
        </UCard>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
definePageMeta({
  layout: "auth",
  header: {
    title: "Login",
  },
});
</script>

<style scoped></style>
