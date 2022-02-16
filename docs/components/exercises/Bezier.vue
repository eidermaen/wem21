<template>
  <svg ref="svg" width="100%" height="400" @mousedown="startDrag" @mousemove.prevent="drag" @mouseup="endDrag">
    <circle class="draggable" cx="100" cy="100" r="5" style="fill: black"></circle>
    <circle class="draggable" cx="200" cy="100" r="5" style="fill: red"></circle>
    <circle class="draggable" cx="100" cy="200" r="5" style="fill: blue"></circle>
    <circle class="draggable" cx="200" cy="200" r="5" style="fill: green"></circle>
    <g ref="bezier" v-if="circles">
      <path
        :d="`M${circles[0].getAttribute('cx')},${circles[0].getAttribute('cy')} C${circles[1].getAttribute('cx')},${circles[1].getAttribute('cy')} ${circles[3].getAttribute('cx')},${circles[3].getAttribute('cy')} ${circles[2].getAttribute('cx')},${circles[2].getAttribute('cy')}`"></path>
      <path
        :d="`M${circles[0].getAttribute('cx')},${circles[0].getAttribute('cy')} L${circles[1].getAttribute('cx')},${circles[1].getAttribute('cy')}`"></path>
      <path
        :d="`M${circles[1].getAttribute('cx')},${circles[1].getAttribute('cy')} L${circles[3].getAttribute('cx')},${circles[3].getAttribute('cy')}`"></path>
      <path
        :d="`M${circles[3].getAttribute('cx')},${circles[3].getAttribute('cy')} L${circles[2].getAttribute('cx')},${circles[2].getAttribute('cy')}`"></path>
    </g>
  </svg>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  data() {
    return {
      isMounted: false,
      selectedElement: null as any,
      circles: undefined as undefined | NodeListOf<Element>,
      offset: {
        x: 0,
        y: 0,
      },
    }
  },

  methods: {
    startDrag(e: UIEvent) {
      if ((e.target as HTMLElement)?.classList?.contains('draggable')) {
        this.selectedElement = e.target;
        this.offset = this._getMousePosition(e);
        this.offset.x -= parseFloat(this.selectedElement.getAttribute('cx'));
        this.offset.y -= parseFloat(this.selectedElement.getAttribute('cy'));
      }
    },

    _getMousePosition(e: any) {
      const CTM = (this.$refs.svg as SVGGraphicsElement).getScreenCTM();
      return {
        x: (e.clientX - CTM!.e) / CTM!.a,
        y: (e.clientY - CTM!.f) / CTM!.d
      };
    },

    drag(e: UIEvent) {
      if (this.selectedElement) {
        const coord = this._getMousePosition(e);
        this.selectedElement.setAttribute('cx', String(coord.x - this.offset.x));
        this.selectedElement.setAttribute('cy', String(coord.y - this.offset.y));
        this._updateCircles();
      }
    },

    endDrag() {
      this.selectedElement = null;
    },

    _updateCircles(): void {
      this.circles = (this.$refs.svg as HTMLElement)?.querySelectorAll('.draggable');
    }
  },

  mounted() {
    this._updateCircles();
  }
});
</script>

<style scoped>
.draggable {
  cursor: move;
}

path {
  fill: none;
  stroke: black;
  stroke-width: 1;
}
</style>
