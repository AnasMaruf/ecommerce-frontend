<script setup>
definePageMeta({
  middleware: [
    function () {
      return navigateTo("/my-account/profile");
    },
  ],
});
</script>
