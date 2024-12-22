<template>
  <div class="flex flex-col gap-6 pb-6">
    <section class="banner-section">
      <UContainer>
        <FeatureHomepageCarousel :items="items" />
      </UContainer>
    </section>
    <section class="category-section">
      <UContainer>
        <div class="category-section-card">
          <div class="category-section-header">
            <h2>Kategori</h2>
          </div>
          <div class="category-section-content">
            <FeatureHomepageCategoryItem
              v-for="i in 20"
              :key="`cat-${i}`"
              title="Elektronik"
              :image="tvImage"
            />
          </div>
        </div>
      </UContainer>
    </section>
    <section class="product-section">
      <UContainer>
        <div class="product-section-header"><h2>Rekomendasi</h2></div>
        <div class="product-section-content">
          <BaseProductCard
            v-for="i in 36"
            :key="`product-${i}`"
            title="Kawabata Sepatu Sandal
Kasual Slingback Mules"
            price="10000"
            image="https://picsum.photos/1920/1080?random=1"
            :slug="`product-${i}`"
          />
        </div>
      </UContainer>
    </section>

    <UContainer>
      <UButton color="white" class="font-normal px-28">
        Login untuk lihat lainnya
      </UButton>
    </UContainer>
  </div>
</template>

<script setup>
import tvImage from "~/assets/images/tv.png";
const items = [
  "https://picsum.photos/1920/1080?random=1",
  "https://picsum.photos/1920/1080?random=2",
  "https://picsum.photos/1920/1080?random=3",
  "https://picsum.photos/1920/1080?random=4",
  "https://picsum.photos/1920/1080?random=5",
  "https://picsum.photos/1920/1080?random=6",
];
</script>

<style scoped>
.banner-section {
  @apply bg-white py-7;
}
.category-section-card {
  @apply bg-white;
}
.category-section-header {
  @apply p-5;
  @apply border-b border-black/5;
}
.category-section-header h2 {
  @apply text-base text-black/55 font-medium;
  @apply uppercase;
}
.category-section-content {
  @apply grid grid-cols-10;
}

.product-section-header {
  @apply bg-white;
  @apply p-5;
  @apply border-b-4 border-primary;
}

.product-section-header h2 {
  @apply text-base text-primary font-medium;
  @apply text-center;
  @apply uppercase;
}
.product-section-content {
  @apply grid grid-cols-6 gap-3;
  @apply mt-3;
}
</style>
