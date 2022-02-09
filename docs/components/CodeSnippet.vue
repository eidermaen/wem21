<template>
  <div class="prism max-w-100">
    <pre class="line-numbers" :class="`language-${lang}`">
      <code>
        <slot />
      </code>
    </pre>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
//@ts-ignore
import Prism from 'prismjs';
import 'clipboard';

export default Vue.extend({
  name: 'CodeSnippet',

  props: {
    lang: {
      type: String,
      default: 'js'
    }
  },

  mounted() {
    Prism.highlightAll();
  }
});
</script>
