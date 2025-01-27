<template>
  <UModal v-model="open">
    <UCard
      :ui="{
        rounded: 'rounded-sm',
      }"
    >
      <h3 class="text-xl font-normal">Alamat Baru</h3>
      <form class="grid grid-cols-2 gap-5 mt-5" @submit.prevent="handleSave">
        <UFormGroup :error="v$.receiver_name.$errors?.[0]?.$message">
          <UInput
            v-model="form.receiver_name"
            placeholder="Nama Lengkap"
            size="lg"
          />
        </UFormGroup>
        <UFormGroup :error="v$.receiver_phone.$errors?.[0]?.$message">
          <UInput
            v-model="form.receiver_phone"
            placeholder="Nomor Telepon"
            size="lg"
          />
        </UFormGroup>
        <UFormGroup
          class="col-span-2"
          :error="
            v$.city.uuid.$errors?.[0]?.$message ||
            v$.province.uuid.$errors?.[0]?.$message
          "
        >
          <FeatureProfileAddressInputSelectCity
            v-model:city="form.city"
            v-model:province="form.province"
          />
        </UFormGroup>
        <UFormGroup :error="v$.district.$errors?.[0]?.$message">
          <UInput v-model="form.district" placeholder="Kecamatan" size="lg" />
        </UFormGroup>
        <UFormGroup :error="v$.postal_code.$errors?.[0]?.$message">
          <UInput v-model="form.postal_code" placeholder="Kode Pos" size="lg" />
        </UFormGroup>
        <UFormGroup
          :error="v$.detail_address.$errors?.[0]?.$message"
          class="col-span-2"
        >
          <UTextarea
            v-model="form.detail_address"
            placeholder="Nama Jalan, Gedung, No. Rumah"
            size="lg"
          />
        </UFormGroup>
        <UFormGroup
          :error="v$.address_note.$errors?.[0]?.$message"
          class="col-span-2"
        >
          <UInput
            v-model="form.address_note"
            placeholder="Detail Lainnya (Cth: Blok / Unit No., Patokan)"
            size="lg"
          />
        </UFormGroup>
        <div class="col-span-2">
          <label class="text-sm font-normal text-black/80">
            Tandai Sebagai:
          </label>
          <BaseRadioCard
            v-model="form.type"
            :items="addressType"
            class="!flex !gap-2 justify-start my-2"
          >
            <template #item="{ label, value, selected, onClick }">
              <UButton
                :color="selected ? 'primary' : 'white'"
                :variant="selected ? 'soft' : 'solid'"
                :ui="{
                  padding: {
                    sm: 'py-3 px-3',
                  },
                }"
                @click="onClick(value)"
              >
                {{ label }}
              </UButton>
            </template>
          </BaseRadioCard>

          <p
            v-if="v$.type.$errors?.[0]?.$message"
            class="text-sm mb-2 text-red-500"
          >
            {{ v$.type.$errors[0].$message }}
          </p>
          <UCheckbox
            v-model="form.is_default"
            label="Atur sebagai Alamat Pribadi"
            :ui="{
              label: 'text-black/55',
            }"
          />
        </div>
        <div class="flex justify-end mt-6 gap-2 col-span-2">
          <UButton
            label="Nanti Saja"
            color="gray"
            class="max-w-36"
            variant="link"
            block
            @click="handleCancel"
          />
          <UButton
            type="submit"
            label="Ok"
            class="max-w-36"
            block
            :loading="status === 'pending' || statusEdit === 'pending'"
          />
        </div>
      </form>
    </UCard>
  </UModal>
</template>

<script setup>
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

const open = defineModel("open", {
  type: Boolean,
  default: false,
});

const form = ref({
  is_default: false,
  receiver_name: "",
  receiver_phone: "",
  district: "",
  postal_code: "",
  detail_address: "",
  address_note: "",
  type: "",

  city: {
    uuid: "",
    name: "",
  },
  province: {
    uuid: "",
    name: "",
  },
});
const rules = {
  is_default: { required },
  receiver_name: { required },
  receiver_phone: { required },
  district: { required },
  postal_code: { required },
  detail_address: { required },
  address_note: {},
  type: { required },
  city: {
    uuid: { required },
  },
  province: {
    uuid: { required },
  },
};
const $externalResults = ref({});
const v$ = useVuelidate(rules, form, {
  $autoDirty: true,
  $externalResults,
});

const addressType = [
  {
    label: "Rumah",
    value: "home",
  },
  {
    label: "Kantor",
    value: "office",
  },
];

const { execute, status, error } = useSubmit("/server/api/address");
const {
  execute: edit,
  status: statusEdit,
  error: errorEdit,
} = useSubmit(computed(() => `/server/api/address/${form.value?.uuid}`));

function setDefaultValue(defaultValue) {
  if (defaultValue && typeof defaultValue === "object") {
    form.value = defaultValue;
  }
}

function handleCancel() {
  form.value = {
    is_default: false,
    receiver_name: "",
    receiver_phone: "",
    district: "",
    postal_code: "",
    detail_address: "",
    address_note: "",
    type: "",

    city: {
      uuid: "",
      name: "",
    },
    province: {
      uuid: "",
      name: "",
    },
  };
  v$.value.$reset();
  open.value = false;
}

async function handleSave() {
  const isValid = await v$.value.$validate();
  if (!isValid) return;

  const { city, province, is_default, ...otherForm } = form.value;
  const newData = {
    ...otherForm,
    is_default: is_default ? 1 : 0,
    city_uuid: city.uuid,
  };

  if (form.value?.uuid) {
    await edit({ ...newData, _method: "PATCH" });
  } else {
    await execute(newData);
  }

  if (error.value || errorEdit.value) {
    if ((error.value || errorEdit.value).data?.meta?.validations) {
      const validations = {
        ...(error.value || errorEdit.value).data?.meta?.validations,
      };
      if (validations?.city_uuid) {
        Object.assign(validations, {
          city: {
            uuid: validations.city_uuid.map((message) =>
              message.replace("city uuid", "value")
            ),
          },
        });
      }
      $externalResults.value = validations;
    }
    return;
  }
  if (status.value === "success" || statusEdit.value === "success") {
    refreshNuxtData("address-list");
    handleCancel();
  }
}

defineExpose({
  setDefaultValue,
});
</script>

<style lang="scss" scoped></style>
