<template>
  <div class="flex gap-4 flex-wrap">
    <template v-if="attachments.length < max">
      <div
        role="button"
        class="rounded border-2 border-dashed p-3 flex items-center justify-center flex-col gap-1 w-20 h-20 text-primary"
        @click="handleChooseFile"
      >
        <UIcon :name="icon" class="w-6" />
        <p class="text-center text-xs">
          Tambahkan {{ type === "image" ? "Foto" : "Video" }} ({{
            attachments.length
          }}/{{ max }})
        </p>
      </div>
      <input
        ref="inputFileElement"
        type="file"
        :accept="accept[type]"
        class="hidden"
        @change="handleChangeFile"
      />
    </template>
    <div
      v-for="(media, indx) in attachments"
      :key="`img-${indx}`"
      class="rounded border-2 w-20 h-20 relative group/photos flex items-center justify-center"
    >
      <img
        v-if="type === 'image'"
        :src="generateImage(media)"
        class="w-full h-full object-cover rounded"
      />
      <video v-if="type === 'video'" preload="metadata">
        <source :src="`${generateImage(media)}#t=0.1`" type="video/mp4" />
      </video>
      <div
        class="absolute bg-black/50 inset-0 items-center justify-center hidden group-hover/photos:flex"
      >
        <UButton
          icon="i-heroicons:x-mark-20-solid"
          variant="link"
          @click="handleDelete(indx)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  max: {
    type: Number,
    default: 1,
  },
  type: {
    type: String,
    default: "image",
    validator: (propsValue) => ["video", "image"].includes(propsValue),
  },
  icon: {
    type: String,
    default: "i-heroicons:photo-solid",
  },
});

const accept = {
  image: ".jpeg,.png",
  video: ".mp4",
};

const attachments = ref([]);
const inputFileElement = ref();

function handleChooseFile() {
  inputFileElement.value.value = null;
  inputFileElement.value.click();
}

function handleChangeFile(event) {
  const file = event.target.files?.[0];

  const allowedExtensions = accept[props.type].split(",");
  const fileExtension = file.name.split(".").pop();

  if (!allowedExtensions.includes(`.${fileExtension}`)) {
    alert(
      `Format file tidak didukung. Silakan upload file ${accept[props.type]}`
    );
    return;
  }

  attachments.value.push(file);
}

function handleDelete(index) {
  attachments.value.splice(index, 1);
}

function generateImage(img) {
  return window.URL.createObjectURL(img);
}
</script>

<style lang="scss" scoped></style>
