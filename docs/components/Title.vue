<template>
  <h1 ref="title" :id="id" v-if="!sub" class="text-4xl">
    <slot/>
  </h1>
  <h2 ref="title" :id="id" v-else class="text-2xl">
    <slot/>
  </h2>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    sub: {
      type: Boolean,
      default: false,
    }
  },

  setup(props: any) {
    let title = ref(null);
    let id = ref('');

    onMounted(() => {
      id.value = (title.value as any)?.textContent?.toLowerCase()
        .trim()
        .replaceAll(' ', '_')
        .replaceAll('.', '-');
    });

    return {
      id,
      title
    }
  }
});
</script>
