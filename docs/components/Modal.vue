<template>
  <transition name="modal">
    <div v-if="open" class="backdrop fixed inset-0 bg-gray-300 flex justify-center items-center z-50">
      <div class="relative p-6 rounded-lg bg-white w-7/8 md:max-w-3/4 md:w-3/4">
        <span class="absolute p-2 top-4 right-4 cursor-pointer" @click="$emit('close')">
          <CrossIcon class="w-4 h-4"/>
        </span>
        <div class="text-center text-2xl mb-2">
          <Title :sub="true">
            <slot name="header"></slot>
          </Title>
        </div>

        <hr>

        <div class="mt-4">
          <slot name="body"></slot>
        </div>

        <div class="mt-12">
          <slot name="footer" :close="close" :ok="ok">
            <div class="text-center">
              <Button @click="close">Ok</Button>
            </div>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import CrossIcon from '~/components/icons/CrossIcon.vue';
import Button from '~/components/Button.vue';

export default defineComponent({
  components: {Button, CrossIcon},
  emits: ['close', 'ok'],

  props: {
    open: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit('close');
    },
    ok() {
      this.$emit('ok');
    },
  }
});
</script>

<style scoped>
.modal-enter-active, .modal-leave-active {
  transition: all .3s ease;
}

.modal-enter, .modal-leave-to {
  opacity: 0;
}

.backdrop {
  background-color: rgba(168, 172, 186, 0.6);
}
</style>
