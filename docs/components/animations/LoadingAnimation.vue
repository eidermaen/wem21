<template>
  <div class="border border-gray-200 shadow rounded-md p-4 w-3/4 lg:w-1/2 xl:w-1/3">
    <div class="animate-pulse flex space-x-4">
      <div class="flex-1 space-y-6 py-1">
        <div class="text-gray-400 tracking-widest text-md">Loading . . .</div>
        <div class="h-2 bg-gray-400 rounded"></div>
        <div class="space-y-3">
          <div class="h-2 bg-gray-400 rounded"></div>
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-gray-400 rounded col-span-1"></div>
            <div class="h-2 bg-gray-400 rounded col-span-2"></div>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div class="h-2 bg-gray-400 rounded col-span-2"></div>
            <div class="h-2 bg-gray-400 rounded col-span-1"></div>
          </div>
          <div class="h-2 bg-gray-400 rounded"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({});
</script>
