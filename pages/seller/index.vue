<script setup>
definePageMeta({
  middleware: [
    function () {
      return navigateTo("/seller/order");
    },
  ],
});
</script>
