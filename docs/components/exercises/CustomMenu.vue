<template>
  <nav ref="menu" :class="{vertical, end}">
    <slot />
  </nav>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    vertical: {
      type: Boolean,
      default: false
    },
    end: {
      type: Boolean,
      default: false
    }
  }
});

</script>

<style scoped>
nav {
  display: flex;
}

.vertical {
  flex-direction: column;
  align-items: start;
}

.end {
  justify-content: end;
}
</style>
