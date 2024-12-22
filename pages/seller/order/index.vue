<template>
  <SellerCard title="Pesanan Saya">
    <div class="mt-4 space-y-4">
      <BaseTabs
        :items="status"
        :content="false"
        :ui="{
          wrapper: 'border-b border-gray-100',
          list: {
            width: 'w-[unset] border-none',
            tab: {
              base: 'font-normal',
            },
          },
        }"
      />
      <form class="flex gap-4 items-center">
        <UInput class="flex-1" placeholder="Masukkan no. pesanan" />
        <UButton label="Terapkan" size="xs" variant="outline" type="submit" />
        <UButton label="Reset" size="xs" color="white" />
      </form>
      <p class="text-lg font-medium">0 Pesanan</p>
      <BaseDataTable :columns="columns" :rows="orders">
        <template #total-data="{row}">
          Rp{{ formatNumber(row.total) }}
        </template>
        <template #action-data="{ row }">
          <UButton
            variant="link"
            color="blue"
            :padded="false"
            label="Lihat Detail"
            :to="`/seller/order/${row.uuid}`"
          />
        </template>
      </BaseDataTable>
    </div>
  </SellerCard>
</template>

<script setup>
definePageMeta({
  breadcrumb: [{
    label: 'Pesanan Saya'
  }]
})
const status = [
  {
    label: "Semua",
    key: "all",
  },
  {
    label: "Belum Dibayar",
    key: "pending_payment",
  },
  {
    label: "Dibayar",
    key: "pending_payment",
  },
  {
    label: "Sedang Diproses",
    key: "on_processing",
  },
  {
    label: "Dikirim",
    key: "on_delivery",
  },
  {
    label: "Selesai",
    key: "done",
  },
  {
    label: "Dibatalkan",
    key: "failed",
  },
];

const columns = [
  {
    key: "invoice_number",
    label: "No. Pesanan",
  },
  {
    key: "total",
    label: "Harga Total",
  },
  {
    key: "last_status.status",
    label: "Status",
    rowClass: "capitalize",
  },
  {
    key: "action",
    label: "Aksi",
  },
];

const orders = [
  {
    uuid: "5f8f599c-83fb-11ef-be4b-1a72ee53d328",
    invoice_number: "INV-2-20241006155513",
    buyer: {
      name: "azizah@gmail.com",
      email: "azizah@gmail.com",
      photo_url:
        "http://localhost:8000/storage/user-photo/iAdzpaTT8wNzF58ZQ67Ys4YwTzFnQHW3tLFY3msm.jpg",
      username: "azizah",
      phone: null,
    },
    address: {
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
    total: 90000,
    courier: "jne",
    courier_type: "JTR",
    items: [
      {
        uuid: "5f90214c-83fb-11ef-be4b-1a72ee53d328",
        product: {
          uuid: "ebfaf0c4-8010-11ef-9abb-3dda8f3f8c01",
          name: "Produk 98",
          slug: "produk-98",
          price: 10000,
          price_sale: null,
          price_discount_percentage: null,
          sale_count: 9,
          image_url: "http://localhost:8000/storage/attachment2.jpg",
          stock: 9,
        },
        variations: [
          {
            label: "Ukuran",
            value: "XL",
          },
        ],
        qty: 9,
        note: "Cepetan yaa min",
        price: 10000,
        total: 90000,
        weight: 3,
        is_reviewed: false,
      },
    ],
    status: [
      {
        status: "pending_payment",
        description: "Silahkan selesaikan pembayaran Anda",
        created_at: "2024-10-06 15:55:13",
      },
      {
        status: "paid",
        description: "Pembayaran berhasil, menunggu proses pengiriman",
        created_at: "2024-10-06 15:56:59",
      },
    ],
    last_status: {
      status: "paid",
      description: "Pembayaran berhasil, menunggu proses pengiriman",
      created_at: "2024-10-06 15:56:59",
    },
    created_at: "2024-10-06 15:55:13",
  },
];
</script>

<style scoped></style>
