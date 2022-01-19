<template>
  <div>
    <nav class="sticky top-0 py-2 bar">
      <div class="flex items-center">
        <nuxt-link to="/">
          <img src="logo.png" class="w-10 h-10">
        </nuxt-link>

        <nuxt-link to="about" class="ml-10">
          About
        </nuxt-link>
      </div>
    </nav>

    <div class="w-full md:w-2/3 mx-8 md:mx-auto my-6 min-h-screen">
      <Nuxt />
    </div>

    <div class="bar py-1 text-sm text-gray-300 text-center">
      &copy; Jona Ittermann 2022
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

})
</script>

<style scoped>
.bar {
  @apply px-4 bg-blue-600 z-10;
}
</style>
