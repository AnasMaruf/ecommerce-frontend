<template>
  <SellerCard title="Daftar Voucher">
    <template #header-append>
      <UButton icon="i-heroicons:plus" to="/seller/voucher/add"
        >Tambah Voucher</UButton
      >
    </template>
    <BaseTabs
      :items="status"
      :ui="{
        wrapper: 'border-b border-gray-100',
        list: {
          width: 'w-[unset] border-none',
          tab: {
            font: 'font-normal',
          },
        },
      }"
      :content="false"
    />
    <div class="mt-8 space-y-4 text-sm">
      <form class="flex gap-3 items-center">
        <span>Cari</span>
        <UInput placeholder="Input" class="w-80" />
        <UButton variant="outline" size="xs"> Cari </UButton>
      </form>
      <BaseDataTable :rows="items" :columns="columns">
        <template #name-data="{ row }">
          <div class="flex gap-2">
            <img
              class="w-14 h-14 object-cover"
              :src="
                row.voucher_type === 'discount'
                  ? image[row.discount_cashback_type]
                  : image['coin']
              "
            />
            <div class="flex flex-col items-start gap-0.5">
              <UBadge
                label="Telah Berakhir"
                color="gray"
                size="xs"
                variant="soft"
                :ui="{
                  variant: {
                    soft: 'bg-gray-100',
                  },
                }"
              />
              <span class="text-sm font-medium">
                {{ row.name }}
              </span>
              <span class="text-sm">KODE:{{ row.code }}</span>
            </div>
          </div>
        </template>
        <template #discount-data="{ row }">
          <p>
            {{ row.discount_cashback_type === "fixed" ? "Rp" : ""
            }}{{ formatNumber(row.discount_cashback_value)
            }}{{ row.discount_cashback_type === "percentage" ? "%" : "" }}
          </p>
          <div
            v-if="row.voucher_type === 'cashback'"
            class="flex gap-2 items-center text-sm text-black/55"
          >
            <IconCoin class="w-4 h-4" /> Cashback Koin
          </div>
        </template>
        <template #action-data="{ row }">
          <div class="flex flex-col gap-2">
            <UButton
              label="Ubah"
              variant="link"
              color="blue"
              :padded="false"
              @click="handleEdit(row)"
            />
            <UButton
              label="Hapus"
              variant="link"
              color="blue"
              :padded="false"
            />
          </div>
        </template>
      </BaseDataTable>
    </div>
  </SellerCard>
</template>

<script setup>
import VoucherCoin from "~/assets/images/voucher-cashback-coin.png";
import VoucherPercentage from "~/assets/images/voucher-percentage.png";
import VoucherFixed from "~/assets/images/voucher-fixed.png";

const router = useRouter()

const image = {
  coin: VoucherCoin,
  percentage: VoucherPercentage,
  fixed: VoucherFixed,
};

const status = [
  {
    label: "Semua",
    key: "all",
  },
  {
    label: "Berjalan",
    key: "ongoing",
  },
  {
    label: "Akan Datang",
    key: "coming_soon",
  },
  {
    label: "Expired",
    key: "expired",
  },
];

const columns = [
  {
    key: "name",
    label: "Nama Voucher | Kode",
  },
  {
    key: "discount",
    label: "Diskon",
  },
  {
    key: "discount_cashback_max",
    label: "Batas Pemakaian",
  },
  {
    key: "used_count",
    label: "Digunakan",
  },
  {
    key: "action",
    label: "Aksi",
  },
];

const items = [
  {
    uuid: "9875b0fc-82df-11ef-bdf6-b1d00190d36e",
    code: "DISCOUNT10000",
    name: "Discount 10000",
    used_count: 0,
    is_public: true,
    voucher_type: "discount",
    discount_cashback_type: "fixed",
    discount_cashback_value: 10000,
    discount_cashback_max: 100,
    start_date: "2024-10-05 06:03:51",
    end_date: "2024-10-12 06:03:51",
  },
  {
    uuid: "9875b0fc-82df-11ef-bdf6-b1d00190d36e",
    code: "DISCOUNT10000",
    name: "Discount 10000",
    used_count: 0,
    is_public: true,
    voucher_type: "discount",
    discount_cashback_type: "percentage",
    discount_cashback_value: 10,
    discount_cashback_max: 100,
    start_date: "2024-10-05 06:03:51",
    end_date: "2024-10-12 06:03:51",
  },
  {
    uuid: "9875b0fc-82df-11ef-bdf6-b1d00190d36e",
    code: "DISCOUNT10000",
    name: "Discount 10000",
    used_count: 0,
    is_public: true,
    voucher_type: "cashback",
    discount_cashback_type: "fixed",
    discount_cashback_value: 10000,
    discount_cashback_max: 100,
    start_date: "2024-10-05 06:03:51",
    end_date: "2024-10-12 06:03:51",
  },
  {
    uuid: "9875b0fc-82df-11ef-bdf6-b1d00190d36e",
    code: "DISCOUNT10000",
    name: "Discount 10000",
    used_count: 0,
    is_public: true,
    voucher_type: "cashback",
    discount_cashback_type: "percentage",
    discount_cashback_value: 10,
    discount_cashback_max: 100,
    start_date: "2024-10-05 06:03:51",
    end_date: "2024-10-12 06:03:51",
  },
];

function handleEdit(row) {
  router.push({
    path: `/seller/voucher/edit/${row.uuid}`,
    state: row,
  });
}
</script>

<style lang="scss" scoped></style>
