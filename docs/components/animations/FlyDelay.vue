<template>
  <div class="opacity-0" :class="style">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'FlyDelay',

  props: {
    direction: {
      type: String,
      default: ''
    }
  },

  computed: {
    style() {
      switch (this.direction) {
        case 'left':
          return 'animate-flyleftdelay';
        case '':
          return 'animate-flyindelay';
      }
    }
  }

})
</script>
