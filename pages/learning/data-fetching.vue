<template>
  <div>
    <h3>Learning: Data Fetching</h3>
    <div class="grid grid-cols-2">
      <div>
        <UButton color="white" @click="execute">GET DATA</UButton>
        <UButton @click="refresh">Refresh DATA</UButton>
        <p v-if="status === 'pending'">Loading...</p>
        <pre>{{ data }}</pre>
      </div>
      <div>
        <UInput v-model="productName" />
        <UButton @click="handleAddProduct">Add</UButton>
        <p>{{ statusAdd }}</p>
        <!-- <p>{{ loading ? "Loading..." : "" }}</p> -->
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: ["learning-data-fetching"],
});
const productName = ref("");
// const data = ref("");
// const loading = ref(true);

// onMounted(() => {
//   fetch("https://dummyjson.com/products")
//     .then((res) => res.json())
//     .then((res) => {
//       data.value = res;
//     })
//     .finally(() => (loading.value = false));
// });

// function getProduct() {
//   return fetch("https://dummyjson.com/products").then((res) => res.json());
// }

// const { data, status, error, execute } = useAsyncData("product", getProduct, {
//     immediate: false
// });

// const { data, status, execute, refresh } = useFetch(
//   "https://dummyjson.com/products",
//   {
//     key: 'product-list',
//     // immediate: false,
//     params: { limit: 10, skip: 10 },
//   }
// );

// function refresh() {
//     refreshNuxtData('product')
// }

// const { status: statusAdd } = useApi("https://dummyjson.com/products/add", {
//     method: "POST",
//     body: computed(() => ({
//       title: productName.value
//     })),
//     watch: false,
    
//   })

const { data, status, execute, refresh } = useApi(
  "https://dummyjson.com/products"
);

const {execute: addProduct, status: statusAdd} = useSubmit('https://dummyjson.com/products/add')
// const loading = ref(false);
// const dataAdd = ref()
function handleAddProduct() {
  // const formData = new FormData()
  // formData.append('title', productName.value)
  const newData = {
    title: productName.value,
  };

  addProduct(newData)
  // loading.value = true;
  // const { status: statusAdd } = useApi("https://dummyjson.com/products/add", {
  //   method: "POST",
  //   body: newData,
  //   watch: false,
  //   onResponse({ response }) {
  //     loading.value = false;
  //   },
  // });

  // const response = $fetch("https://dummyjson.com/products/add", {
  //   method: "POST",
  //   body: newData,
  //   headers: {},
  //   onResponse() {
  //     loading.value = false;
  //   },
  // });
}
</script>

<style lang="scss" scoped></style>
