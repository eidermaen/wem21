<template>
  <div class="border rounded p-5" :class="style">
    <h3 class="text-2xl font-bold">
      {{ title }}
    </h3>
    <p class="mt-4">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  props: {
    title: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
      validator: function (val) {
        return ['info', 'success', 'danger'].includes(val);
      }
    }
  },

  computed: {
    style() {
      let style = '';

      switch (this.variant) {
        case 'danger':
          style = 'border-red-600 bg-red-500 text-white';
      }

      return style;
    }
  }
});
</script>
