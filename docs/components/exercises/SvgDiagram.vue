<template>
  <svg width="500" height="400" viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="500" height="500" fill="white"/>
    <g>
      <text v-for="(party, index) in data" :key="`label-${index}`" x="10" :y="getY(index)" fill="black">
        {{ party.name }} ({{party.seats}} Sitze)
      </text>
    </g>
    <g>
      <SvgRect v-for="(party, index) in data" :key="`bar-${index}`" :party="party" :index="index"
               @change="onHoverChange(index, $event)" :inactive="hovered !== -1 && hovered !== index"
      ></SvgRect>
    </g>
  </svg>
</template>

<script lang="ts">
import {defineComponent, PropType} from '@nuxtjs/composition-api';
import {Party} from '~/data/bundestag';
import {getY} from '~/utils/svgUtils';
import SvgRect from '~/components/exercises/SvgRect.vue';

export default defineComponent({
  components: {SvgRect},
  props: {
    data: {
      type: Array as PropType<Party[]>,
      required: true
    }
  },

  data() {
    return {
      hovered: -1,
    }
  },

  methods: {
    onHoverChange(index: number, hovered: boolean) {
      this.hovered = hovered ? index : -1;
    },
  },

  setup() {
    return {
      getY
    }
  },

});
</script>

<style scoped>

</style>
