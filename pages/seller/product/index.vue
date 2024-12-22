<template>
  <div class="space-y-9">
    <div class="flex justify-between items-center gap-2">
      <h3 class="font-medium text-xl">Produk Saya</h3>
      <UButton
        icon="i-heroicons:plus"
        label="Tambah Produk Baru"
        to="/seller/product/add"
      />
    </div>
    <UCard>
      <div class="space-y-6">
        <div class="flex gap-4 items-center">
          <UInput
            leading-icon="i-heroicons:magnifying-glass"
            class="flex-1"
            placeholder="Cari Nama Produk, SKU Induk, Kode Variasi, ID Produk"
          />
          <USelectMenu
            :options="[]"
            placeholder="Cari berdasarkan kategori"
            class="flex-1"
          />
          <UButton size="xs" label="Terapkan" variant="outline" />
          <UButton size="xs" label="Atur Ulang" color="white" />
        </div>
        <p class="text-lg font-medium">8 Produk</p>
        <BaseDataTable
          :columns="columns"
          :rows="products"
          empty-text="Produk Tidak Ditemukan"
        >
          <template #name-data="{ row }">
            <div class="flex gap-2">
              <img
                :src="row.images?.[0]"
                alt=""
                class="v-14 h-14 object-cover"
              />
              <div class="flex flex-col items-start gap-0.5">
                <span class="text-sm font-medium">{{ row.name }}</span>
                <span class="text-sm text-black/65"
                  >ID Produk: {{ row.uuid }}</span
                >
              </div>
            </div>
          </template>
          <template #price-data="{ row }">
            Rp.{{ formatNumber(row.price) }}
          </template>
          <template #action-data="{ row }">
            <div class="flex flex-col gap-1">
              <UButton
                variant="link"
                :padded="false"
                color="blue"
                label="Ubah"
                @click="handleEdit(row)"
              />
              <UButton
                variant="link"
                :padded="false"
                color="blue"
                label="Hapus"
              />
            </div>
          </template>
        </BaseDataTable>
      </div>
    </UCard>
  </div>
</template>

<script setup>
const router = useRouter();

const columns = [
  {
    key: "name",
    label: "Produk",
  },
  {
    key: "sale_count",
    label: "Penjualan",
  },
  {
    key: "price",
    label: "Harga",
  },
  {
    key: "stock",
    label: "Stok",
  },
  {
    key: "action",
    label: "Aksi",
  },
];
const products = [
  {
    uuid: "ebc983cc-8010-11ef-9abb-3dda8f3f8c01",
    name: "Produk 4",
    slug: "produk-4",
    price: 67377,
    price_sale: null,
    stock: 7,
    category: {
      slug: "laptop",
      name: "Laptop",
      description: null,
      parent: {
        slug: "komputer-laptop",
        name: "Komputer & Laptop",
        description: null,
      },
    },
    description: "Deskripsi produk 4. Lorem ipsum bla bla bla",
    weight: 73,
    length: 36,
    width: 88,
    height: 10,
    video_url: "http://localhost:8000/storage/attachment.mp4",
    sale_count: 0,
    images: [
      "https://picsum.photos/1920/1080?random=1",
      "http://localhost:8000/storage/attachment2.jpg",
      "http://localhost:8000/storage/attachment4.jpg",
      "http://localhost:8000/storage/attachment1.jpg",
    ],
    variations: [
      {
        name: "Warna",
        values: ["Hitam", "Kuning", "Biru"],
      },
      {
        name: "Ukuran",
        values: ["M", "L", "XL"],
      },
    ],
  },
  {
    uuid: "ebcd89cc-8010-11ef-9abb-3dda8f3f8c01",
    name: "Produk 9",
    slug: "produk-9",
    price: 33974,
    price_sale: 30000,
    stock: 84,
    category: {
      slug: "dress",
      name: "Dress",
      description: null,
      parent: {
        slug: "fashion-wanita",
        name: "Fashion Wanita",
        description: null,
      },
    },
    description: "Deskripsi produk 9. Lorem ipsum bla bla bla",
    weight: 70,
    length: 30,
    width: 12,
    height: 58,
    video_url: "http://localhost:8000/storage/attachment.mp4",
    sale_count: 0,
    images: [
      "https://picsum.photos/1920/1080?random=2",
      "http://localhost:8000/storage/attachment1.jpg",
      "http://localhost:8000/storage/attachment2.jpg",
      "http://localhost:8000/storage/attachment4.jpg",
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
  },
];

function handleEdit(row) {
  router.push({
    path: `/seller/product/edit/${row.uuid}`,
    state: row,
  });
}
</script>

<style scoped></style>
