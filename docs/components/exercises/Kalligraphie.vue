<template>
  <div class="container">
    <svg ref="editor" id="editor" @mousedown="onStartPaint"
         @mousemove="paint" @mouseup="onStopPaint"
    >
    </svg>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

type DragPosition = null | { x: number, y: number };
const SVG_NS = 'http://www.w3.org/2000/svg';

export default defineComponent({

  data() {
    return {
      startDragPosition: null as DragPosition,
    }
  },

  methods: {

    onStartPaint(e: UIEvent) {
      this.startDragPosition = this._getMousePosition(e);
    },

    paint(e: UIEvent) {
      if (this.startDragPosition) {
        const newMousePosition = this._getMousePosition(e);
        (this.$refs.editor as SVGGraphicsElement).appendChild(this.drawPath(this.startDragPosition, newMousePosition));
        this.startDragPosition = newMousePosition;
      }
    },

    onStopPaint() {
      this.startDragPosition = null;
    },

    drawPath(startCoordinates: DragPosition, endCoordinates: DragPosition) {
      const path = document.createElementNS(SVG_NS, 'path');
      let direction = '';
      direction += `M${startCoordinates!.x} ${startCoordinates!.y}`;
      direction += ` L${endCoordinates!.x} ${endCoordinates!.y}`;

      this._setAttribute(path, 'd', direction);
      return path;
    },

    _setAttribute(node: SVGPathElement, attribute: string, value: string) {
      node.setAttributeNS(null, attribute, value);
    },

    _getMousePosition(e: any) {
      const CTM = (this.$refs.editor as SVGGraphicsElement).getScreenCTM();
      return {
        x: (e.clientX - CTM!.e) / CTM!.a,
        y: (e.clientY - CTM!.f) / CTM!.d
      };
    }
  }
});
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 400px;
  padding: 5px;
  @apply border-2 rounded-lg border-gray-400;
}

#editor {
  position: relative;
  background-color: white;
  padding: .2rem;
  width: 100%;
  height: 100%;
  cursor: cell;
}

#editor >>> path {
  fill: none;
  stroke: black;
  stroke-width: 2;
}
</style>
