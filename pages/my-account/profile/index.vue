<template>
  <div>
    <h3 class="font-medium text-lg">Profil Saya</h3>
    <p class="text-sm text-black/65">
      Kelola informasi profile anda untuk mengontrol, melindungi dan mengakses
      akun
    </p>
    <hr class="mt-5 mb-8 border-gray-200/60" />
    <div class="flex divide-x items-start">
      <div class="flex-1 pr-6 flex flex-col gap-8">
        <div class="profile-item">
          <p class="profile-item-title">Username</p>
          <span v-if="profile.username" class="profile-item-text">{{
            profile.username || "-"
          }}</span>
          <UInput v-else v-model="profile.username" class="flex-1" size="lg" />
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Nama</p>
          <UInput v-model="profile.name" class="flex-1" size="lg" />
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Email</p>
          <div class="flex gap-2 items-center">
            <span class="profile-item-text">{{ profile.email || "-" }}</span>
            <UButton
              variant="link"
              color="blue"
              class="underline"
              label="Ubah"
              :padded="false"
              to="/my-account/profile/change-email"
            />
          </div>
        </div>
        <div class="profile-item items-center">
          <p class="profile-item-title">Nomor Telepon</p>
          <div class="flex gap-2">
            <span class="profile-item-text">{{ profile.phone || "-" }}</span>
            <UButton
              variant="link"
              color="blue"
              class="underline"
              label="Ubah"
              :padded="false"
              to="/my-account/profile/change-phone"
            />
          </div>
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Nama Toko</p>
          <UInput v-model="profile.store_name" class="flex-1" size="lg" />
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Jenis Kelamin</p>
          <URadioGroup
            v-model="profile.gender"
            :options="['Laki-laki', 'Perempuan']"
            class="flex-1"
            size="lg"
            :ui="{
              fieldset: 'flex gap-5',
            }"
          />
        </div>
        <div class="profile-item">
          <p class="profile-item-title">Tanggal Lahir</p>
          <BaseDatePicker v-model="profile.birth_date" />
        </div>
        <div class="mt-4">
          <UButton label="Simpan" />
        </div>
      </div>
      <div class="w-72 pl-6 flex flex-col items-center gap-5">
        <UAvatar
          :src="imageProfile"
          size="3xl"
          alt="anasmaruf"
          img-class="object-cover"
        />
        <UButton label="Pilih Gambar" color="white" @click="handleChooseFile" />
        <input
          ref="inputFileElement"
          type="file"
          accept=".jpg,.png,.jpeg"
          class="hidden"
          @change="handleUploadFile"
        />
        <ul class="text-sm font-normal text-black/55">
          <li>Ukuran gambar: Maks. 1MB</li>
          <li>Format gambar:.JPG.PNG</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
const session = useSession();
const { profile } = storeToRefs(session);

const inputFileElement = ref();
const temporaryPhoto = ref();
const imageProfile = computed(() => {
  if (temporaryPhoto.value)
    return window.URL.createObjectURL(temporaryPhoto.value);
  return profile.value.photo_url;
});
function handleChooseFile() {
  inputFileElement.value.value = null;
  inputFileElement.value.click();
}
function handleUploadFile(event) {
  const file = event.target?.files?.[0];
  const allowedExtension = [".jpg", ".png"];
  const fileExtension = file.name.split(".").pop();

  if (!allowedExtension.includes(`.${fileExtension}`)) {
    alert(`Format file tidak didukung. Silakan upload file ${props.accept}`);
    return;
  }

  if (file.size > 1024000) {
    alert("File size melebihi ketentuan");
    return;
  }

  temporaryPhoto.value = file;
}
</script>

<style scoped>
.profile-item {
  @apply flex gap-11 items-center;
}
.profile-item-title {
  @apply text-black/55;
  @apply text-sm;
  @apply w-24;
  @apply text-right;
}
.profile-item-text {
  @apply profile-item-title;
  @apply text-black/80;
  @apply text-left;
  @apply w-[unset];
}
</style>
