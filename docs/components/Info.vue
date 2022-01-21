<template>
  <div class="border rounded p-5" :class="style">
    <div class="flex flex-row items-center">
      <div class="mr-2">
        <InfoIcon v-if="variant === 'info'" :class="iconStyle" />
        <ErrorIcon v-else-if="variant === 'danger'" :class="iconStyle" />
      </div>
      <h3 class="text-2xl font-bold">
        {{ title }}
      </h3>
    </div>
    <p class="mt-4">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api';
import InfoIcon from '~/components/icons/InfoIcon.vue';
import ErrorIcon from '~/components/icons/ErrorIcon.vue';

export default defineComponent({
  components: {ErrorIcon, InfoIcon},
  props: {
    title: {
      type: String,
      required: true,
    },
    variant: {
      type: String,
      required: true,
      validator: function (val: string) {
        return ['info', 'success', 'danger'].includes(val);
      }
    }
  },

  setup(props: any) {

    let style = computed(() => {
      let style = '';

      switch (props.variant) {
        case 'info':
          style = 'border-blue-600 bg-blue-300 text-blue-700';
          break;
        case 'danger':
          style = 'border-red-600 bg-red-500 text-white';
          break;
      }

      return style;
    });

    return {
      iconStyle: 'h-6 w-6',
      style,
    }
  },
});
</script>
