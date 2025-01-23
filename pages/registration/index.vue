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
              <h2>Daftar</h2>
              <form class="mt-7 space-y-7" @submit.prevent="handleSubmit">
                  <UFormGroup>
                      <UInput placeholder="Email" size="lg"/>
                  </UFormGroup>
                  <div>
                      <UButton type="submit" block class="uppercase">Berikutnya</UButton>
                  </div>
              </form>
              <UDivider label="ATAU" class="my-4" :ui="{ label:'text-gray-400 font-normal' }" />
              <BaseButtonGoogleSignIn />

              <p class="text-sm font-normal text-black/55 text-center mt-8">Punya akun? <NuxtLink to="/login" class="text-primary">Log in</NuxtLink></p>
          </UCard>
        </div>
      </UContainer>
    </section>
  </template>
  
  <script setup>
  definePageMeta({
    layout: "auth",
    header: {
      title: "Daftar",
    },
  });
  const router = useRouter();
  
  const handleSubmit = () => {
    router.push("/registration/form");
  }
  </script>
  
  <style scoped></style>
  