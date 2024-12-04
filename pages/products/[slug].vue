<template>
  <UContainer as="section" class="flex flex-col gap-5 py-5">
    <UBreadcrumb :links="links" :ui="uiBreadcrumb" />
    <UCard>
      <div class="product-briefing">
        <div class="product-image">
          <FeatureProductDetailCarousel :items="items" />
        </div>
        <div class="product-information">
          <div class="product-title">
            <h2>{{ dataDummy.name }}</h2>
            <div class="product-summary">
              <div class="product-summary-item">
                <span class="text-primary">{{ dataDummy.rating }}</span>
                <BaseRating :model-value="dataDummy.rating" disabled />
              </div>
              <div class="product-summary-item">
                <span class="test-black/80">{{ dataDummy.rating_count }}</span>
                <span class="product-summary-item-description">Penilaian</span>
              </div>
              <div class="product-summary-item">
                <span class="test-black/80">{{ dataDummy.sale_count }}</span>
                <span class="product-summary-item-description">Terjual</span>
              </div>
            </div>
          </div>
          <div class="product-price">
            <p class="text-gray-400 line-through font-normal">
              Rp{{ formatNumber(24000) }}
            </p>
            <p class="text-primary font-normal text-3xl">
              Rp.{{ formatNumber(125000) }}
            </p>
            <UBadge size="xs">50% OFF</UBadge>
          </div>
          <div class="product-variant">
            <div class="flex flex-col gap-6">
              <div
                v-for="variant in dataDummy.variations"
                :key="variant.name"
                class="flex gap-2 items-center"
              >
                <p class="w-28 text-black/55 text-sm">{{ variant.name }}</p>
                <div class="flex flex-wrap gap-2">
                  <UButton
                    v-for="values in variant.values"
                    :key="`${variant.name}-${values}`"
                    color="white"
                    :ui="{
                      base: 'min-w-20 justify-center',
                      padding: {
                        sm: 'px-2 py-2',
                      },
                    }"
                    >{{ values }}
                  </UButton>
                </div>
              </div>
            </div>
          </div>
          <div class="flex gap-2 items-center mt-6">
            <p class="w-28 text-black/55 text-sm">Kuantitas</p>
            <BaseInputQuantity v-model="quantity" />
          </div>
          <UButton class="mt-6" variant="soft"
            ><IconCartPlus /> Masukkan Keranjang</UButton
          >
          <hr class="my-5" />
          <div class="flex gap-5">
            <div class="flex gap-2">
              <img src="~/assets/images/garansi.png" alt="" />
              <p class="text-black/80 text-sm">Garansi Syopo</p>
            </div>
            <p class="text-black/55 text-sm">
              Dapatkan barang pesananmu atau uang kembali
            </p>
          </div>
        </div>
      </div>
    </UCard>
    <UCard>
      <div class="product-seller">
        <div class="flex gap-6 items-center w-96">
          <UAvatar :alt="dataDummy.seller.store_name" size="3xl" />
          <div>
            <h1>{{ dataDummy.seller.store_name }}</h1>
            <UButton
              color="white"
              size="xs"
              class="mt-2"
              :to="`/shop/${dataDummy.seller.username}`"
              ><IconShop /> Kunjungi Toko</UButton
            >
          </div>
        </div>
        <div class="w-[1px] bg-slate-200" />
        <div class="grid grid-cols-2 items-center flex-1">
          <div class="flex gap-2 text-sm">
            <p class="text-black/40 w-36">Penilaian</p>
            <p class="text-primary">{{ dataDummy.seller.rating_count }}</p>
          </div>
          <div class="flex gap-2 text-sm">
            <p class="text-black/40 w-36">Bergabung</p>
            <p class="text-primary">{{ dataDummy.seller.join_date }}</p>
          </div>
          <div class="flex gap-2 text-sm">
            <p class="text-black/40 w-36">Produk</p>
            <p class="text-primary">{{ dataDummy.seller.product_count }}</p>
          </div>
        </div>
      </div>
    </UCard>
    <UCard>
      <div class="product-detail">
        <div class="product-detail-title">
          <h3>Spesifikasi Produk</h3>
        </div>
        <div class="flex flex-col gap-2">
          <div class="product-detail-item">
            <p>Kategori</p>
            <div>
              <UBreadcrumb
                :links="[
                  {
                    label: dataDummy.category.parent.name,
                    to: '/',
                  },
                  {
                    label: dataDummy.category.name,
                    to: `/categories/${dataDummy.category.parent.slug}/${dataDummy.category.parent.slug}`,
                  },
                ]"
                :ui="{
                  ...uiBreadcrumb,
                  active: 'text-[#0055AA]',
                }"
              />
            </div>
          </div>
          <div class="product-detail-item">
            <p>Stok</p>
            <div class="text-sm font-normal">{{ dataDummy.stock }}</div>
          </div>
          <div class="product-detail-item">
            <p>Dikirim dari</p>
            <div class="text-sm font-normal">
              {{ dataDummy.seller.send_from.city.name }}
            </div>
          </div>
        </div>
        <div class="product-detail-title">
          <h3>Deskripsi Produk</h3>
        </div>
        <div
          class="text-sm text-black/80 whitespace-pre-line"
          v-text="dataDummy.description"
        />
      </div>
    </UCard>
    <UCard>
      <h3 class="text-lg font-normal text-black/85">Penilaian Produk</h3>
      <div
        class="mt-3 border border-primary-100/80 bg-primary-50/30 rounded-sm p-8 flex gap-8 items-center"
      >
        <div class="flex flex-col items-center">
          <p class="text-primary text-lg">
            <span class="text-3xl">{{ dataDummy.rating }}</span> dari 5
          </p>
          <BaseRating
            :model-value="dataDummy.rating"
            disabled
            size="lg"
            class="mt-2"
          />
        </div>
        <div class="flex flex-wrap gap-2 items-center">
          <UButton
            variant="outline"
            size="xs"
            class="min-w-24 text-sm justify-center"
            >Semua
          </UButton>
          <div class="flex flex-row-reverse gap-2">
            <UButton
              v-for="(i, index) in 5"
              :key="`rating-${i}`"
              color="white"
              size="xs"
              class="min-w-24 text-sm justify-center"
              >{{ i }} Bintang ({{ dataDummy.review_summary[index] || 0 }})
            </UButton>
          </div>
          <UButton
            color="white"
            size="xs"
            class="min-w-24 text-sm justify-center"
            >Dengan Komentar ({{ dataDummy.review_summary.with_description }})
          </UButton>
          <UButton
            color="white"
            size="xs"
            class="min-w-24 text-sm justify-center"
            >Dengan Media ({{ dataDummy.review_summary.with_attachment }})
          </UButton>
        </div>
      </div>
      <div class="flex flex-col mt-1 divide-y">
        <div v-for="i in 5" :key="`review-${i}`" class="flex gap-3 py-4">
          <UAvatar alt="Anas" size="lg" />
          <div class="flex-1">
            <p>Anas</p>
            <BaseRating :model-value="4" disabled class="mt-1" />
            <div class="flex gap-1 mt-0.5 text-black/55 text-xs">
              <p>2024-11-01 13:49</p>
              <p>Variasi: Vermont Camel, L</p>
            </div>
          </div>
        </div>
      </div>
      <div class="flex justify-end pt-5">
        <BasePagination v-model="page" :total="reviews.length" />
      </div>
    </UCard>
    <div class="flex flex-col gap-4 mt-2">
      <div class="flex justify-between gap-2 items-center">
        <h4 class="uppercase text-black/55 font-medium">
          Produk lain dari toko ini
        </h4>
        <UButton
          variant="link"
          class="font-thin"
          :padded="false"
          :to="`/shop/${dataDummy.seller.username}`"
          >Lihat Semua <UIcon name="i-heroicons:chevron-right"
        /></UButton>
      </div>
      <div class="grid grid-cols-6 gap-3">
        <BaseProductCard
          v-for="product in dataDummy.other_product"
          :key="`product-${product.uuid}`"
          :title="product.title"
          :price="product.price"
          :image="product.image_url"
          :slug="product.slug"
          :sale="product.sale_count"
          :discount="product.price_discount_percentage"
        />
      </div>
    </div>
  </UContainer>
</template>

<script setup>
const page = ref(1);
const reviews = ref(Array(55));
const quantity = ref(0);
const dataDummy = computed(() => {
  return {
    uuid: "ebfbf3ac-8010-11ef-9abb-3dda8f3f8c01",
    name: "Produk 100",
    slug: "produk-100",
    price: 100000,
    price_sale: 80000,
    rating: 4,
    rating_count: 2,
    sale_count: 0,
    price_discount_percentage: 20,
    stock: 68,
    category: {
      slug: "makanan",
      name: "Makanan",
      description: null,
      parent: {
        slug: "makanan-minuman",
        name: "Makanan & Minuman",
        description: null,
      },
    },
    description: "Deskripsi produk 100. Lorem ipsum \n bla bla bla",
    weight: 9,
    length: 34,
    width: 34,
    height: 97,
    video_url: "http://localhost:8000/storage/attachment.mp4",
    seller: {
      username: "azizah",
      store_name: "Azizah Store",
      photo_url:
        "http://localhost:8000/storage/user-photo/iAdzpaTT8wNzF58ZQ67Ys4YwTzFnQHW3tLFY3msm.jpg",
      product_count: 33,
      rating_count: 66,
      join_date: "2 weeks ago",
      send_from: {
        uuid: "8c438746-79c5-11ef-b707-97a05ceb87e2",
        is_default: true,
        receiver_name: "Azis Hapidin",
        receiver_phone: "08888",
        city: {
          uuid: "ee8eb26c-78fe-11ef-bd77-9e4478916c69",
          province: {
            uuid: "ee8d857c-78fe-11ef-bd77-9e4478916c69",
            name: "Bali",
          },
          external_id: 128,
          name: "Kabupaten Gianyar",
        },
        district: "Bojong",
        postal_code: "43222",
        detail_address: "Jl. ABC No. 123",
        address_note: "Dekat tugu pahlawan",
        type: "home",
      },
    },
    images: [
      "http://localhost:8000/storage/attachment2.jpg",
      "http://localhost:8000/storage/attachment4.jpg",
      "http://localhost:8000/storage/attachment1.jpg",
      "http://localhost:8000/storage/attachment3.jpg",
    ],
    variations: [
      {
        name: "Ukuran",
        values: ["M", "L", "XL"],
      },
      {
        name: "Warna",
        values: ["Hitam", "Kuning", "Biru"],
      },
    ],
    review_summary: {
      1: 0,
      2: 1,
      3: 0,
      4: 0,
      5: 1,
      with_attachment: 2,
      with_description: 2,
    },
    other_product: [
      {
        uuid: "ebd71974-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 26",
        slug: "produk-26",
        price: 86971,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment1.jpg",
        stock: 66,
      },
      {
        uuid: "ebd984de-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 31",
        slug: "produk-31",
        price: 95979,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment1.jpg",
        stock: 79,
      },
      {
        uuid: "ebe6e782-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 58",
        slug: "produk-58",
        price: 51470,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment4.jpg",
        stock: 59,
      },
      {
        uuid: "ebec2e90-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 68",
        slug: "produk-68",
        price: 37069,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment3.jpg",
        stock: 75,
      },
      {
        uuid: "ebf0821a-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 77",
        slug: "produk-77",
        price: 92435,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment1.jpg",
        stock: 95,
      },
      {
        uuid: "ebf563c0-8010-11ef-9abb-3dda8f3f8c01",
        name: "Produk 87",
        slug: "produk-87",
        price: 65521,
        price_sale: null,
        price_discount_percentage: null,
        sale_count: 0,
        image_url: "http://localhost:8000/storage/attachment2.jpg",
        stock: 12,
      },
    ],
  };
});

const links = computed(() => [
  {
    label: "Syopo",
    to: "/",
  },
  {
    label: dataDummy.value.category.parent.name,
    to: `/`,
  },
  {
    label: dataDummy.value.category.name,
    to: `/categories/${dataDummy.value.category.parent.slug}/${dataDummy.value.category.slug}`,
  },
  {
    label: dataDummy.value.name,
  },
]);

const uiBreadcrumb = {
  active: "text-black/80",
  inactive: "text-[#0055AA]",
  li: "text-black/80",
  base: "font-normal",
};

const items = [
  "https://picsum.photos/1920/1000?random=1",
  "https://picsum.photos/1920/1000?random=2",
  "https://picsum.photos/1920/1000?random=3",
  "https://picsum.photos/1920/1000?random=4",
  "https://picsum.photos/1920/1000?random=5",
  "https://picsum.photos/1920/1000?random=6",
  "https://picsum.photos/1920/1000?random=7",
  "https://picsum.photos/1920/1000?random=8",
  "https://picsum.photos/1920/1000?random=9",
  "https://picsum.photos/1920/1000?random=10",
];
</script>

<style scoped>
.product-briefing {
  @apply flex gap-8;
}
.product-information {
  @apply flex-1;
}
.product-summary {
  @apply mt-2;
  @apply flex gap-4;
  @apply divide-x;
}
.product-summary > div:not(:first-child) {
  @apply pl-4;
}
.product-summary-item {
  @apply flex gap-2 items-center;
}
.product-summary-item span {
  @apply underline underline-offset-4;
}
.product-summary-item .product-summary-item-description {
  @apply no-underline;
  @apply text-black/50 text-sm;
}
.product-price {
  @apply flex gap-4 items-center;
  @apply my-3;
  @apply bg-gray-50;
  @apply p-4;
}
.product-seller {
  @apply flex gap-6 items-stretch;
}
.product-detail-title {
  @apply bg-gray-50;
  @apply p-3;
}
.product-detail-title h3 {
  @apply text-lg font-normal text-black/85;
}
.product-detail {
  @apply flex flex-col gap-6;
}
.product-detail-item {
  @apply flex gap-2;
}
.product-detail-item > p {
  @apply text-black/40 text-sm w-40;
}
</style>
