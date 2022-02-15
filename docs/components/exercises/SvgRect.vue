<template>
  <rect class="bar" :fill="party.color" :class="inactive ? 'bar-inactive' :''"
        :width="party.seats" :height="height" x="300" :y="getY(index, height)"
        @mouseover="onMouseChange(true)" @mouseleave="onMouseChange(false)"
  ></rect>
</template>

<script lang="ts">
import {defineComponent, PropType} from '@nuxtjs/composition-api';
import {Party} from '~/data/bundestag';
import {getY} from '~/utils/svgUtils';

export default defineComponent({
  emits: ['change'],

  props: {
    party: {
      type: Object as PropType<Party>,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
    inactive: {
      type: Boolean,
      default: false,
    },
  },

  methods: {
    onMouseChange(hovered: boolean) {
      this.$emit('change', hovered);
    }
  },

  data() {
    return {
      height: 10,
    }
  },

  setup() {
    return {
      getY
    }
  }
});
</script>

<style scoped>
.bar {
  transition: all 600ms;
  cursor: pointer;
}
.bar-inactive {
  fill: lightgray;
}
</style>
