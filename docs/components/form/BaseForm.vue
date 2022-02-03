<template>
  <form @submit="onSubmit" class="mt-4" :netlify="netlify" :name="name" :method="method" :action="action"
        :data-netlify-honeypot="netlify && 'bot-field'">
    <div class="bot" v-if="netlify">
      <label>Don’t fill this out if you’re human: <input name="bot-field"/></label>
    </div>
    <input v-if="netlify" type="hidden" name="form-name" :value="name"/>

    <slot/>
  </form>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    method: {
      type: String,
      required: false,
    },
    action: {
      type: String,
      required: false,
    },
    netlify: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    onSubmit(e: Event) {
      this.$emit('submit', e);
    }
  }
});
</script>

<style scoped>
.bot {
  position: absolute;
  display: none;
}
</style>
