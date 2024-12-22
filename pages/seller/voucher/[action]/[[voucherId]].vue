<template>
  <form class="space-y-5 py-5">
    <SellerCard title="Rincian Dasar">
      <div class="space-y-4 mt-4">
        <SellerFormGroup
          label="Nama Voucher"
          help="Nama Voucher tidak ditampilkan ke Pembeli"
        >
          <UInput v-model="form.name" size="lg" maxlength="100">
            <template #trailing>
              <span class="text-sm text-black/55">{{
                `${form.name.length}/100`
              }}</span>
            </template>
          </UInput>
        </SellerFormGroup>
        <SellerFormGroup label="Kode Voucher">
          <UInput v-model="form.code" size="lg" />
        </SellerFormGroup>
        <SellerFormGroup :label="' '">
          <UCheckbox v-model="form.is_public" label="Hanya Pelanggan Setia" />
        </SellerFormGroup>
      </div>
    </SellerCard>
    <SellerCard title="Pengaturan Bonus">
      <div class="space-y-4 mt-4">
        <SellerFormGroup
          label="Nama Voucher"
          :ui="{
            wrapper: 'flex items-center gap-4',
            label: {
              wrapper: 'pt-0',
            },
          }"
        >
          <URadioGroup
            v-model="form.voucher_type"
            :options="['discount', 'cashback']"
            :ui="{
              fieldset: 'flex gap-3',
            }"
            :ui-radio="{
              label: 'capitalize',
            }"
          />
        </SellerFormGroup>
        <SellerFormGroup label="Tipe Diskon | Diskon">
          <div class="flex border rounded-sm divide-x">
            <USelectMenu
              v-model="form.discount_cashback_type"
              :options="[
                {
                  label: 'Nominal',
                  value: 'fixed',
                },
                {
                  label: 'Diskon',
                  value: 'percentage',
                },
              ]"
              variant="none"
            />
            <UInput
              v-model="form.discount_cashback_value"
              class="flex-1"
              :padded="false"
              variant="none"
              :ui="{
                base: 'h-full',
              }"
            >
              <template #leading>
                {{ form.discount_cashback_type === "fixed" ? "Rp" : "%" }}
              </template>
            </UInput>
          </div>
        </SellerFormGroup>
        <SellerFormGroup label="Diskon/Cashback Maksimal">
          <UInput v-model="form.discount_cashback_max" size="lg">
            <template #leading> Rp </template>
          </UInput>
        </SellerFormGroup>
        <SellerFormGroup label="Tanggal Voucher Bisa Digunakan">
          <div class="grid grid-cols-2 gap-4">
            <BaseDatePicker v-model="form.start_date" />
            <BaseDatePicker v-model="form.end_date" />
          </div>
        </SellerFormGroup>
      </div>
    </SellerCard>
  </form>
</template>

<script setup>
definePageMeta({
  validate: ({ params }) => {
    if (params.action === "add") {
      return !params.voucherId;
    }
    return params.action === "edit" && !!params.voucherId;
  },
});

const route = useRoute();
const router = useRouter();

route.meta.breadcrumb =
  route.params.action === "add"
    ? [
        {
          label: "Voucher Toko Saya",
          to: "/seller/voucher",
        },
        {
          label: "Buat Voucher Baru",
        },
      ]
    : [
        {
          label: "Voucher Saya",
          to: "/seller/voucher",
        },
        {
          label: "Ubah Voucher",
        },
      ];

const form = ref({
  name: "",
  code: "",
  discount_cashback_type: "fixed",
  voucher_type: "discount",
  discount_cashback_value: 0,
  discount_cashback_max: 0,
  start_date: null,
  end_date: null,
  is_public: false,
});

onMounted(() => {
  if (route.params.action === "edit") {
    const defaultData = router.options.history.state;
    if (!defaultData?.uuid) {
      router.replace("/seller/voucher");
      return;
    }
    form.value = {
      ...form.value,
      ...defaultData,
      start_date: defaultData.start_date
        ? new Date(defaultData.start_date)
        : null,
      end_date: defaultData.end_date ? new Date(defaultData.end_date) : null,
    };
  }
});
</script>

<style lang="scss" scoped></style>
