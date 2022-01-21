<template>
  <BaseInput v-bind="$props">
    <input :type="$attrs.type" :id="id" :name="name" :required="required" :placeholder="$attrs.placeholder"
           class="form-input"
    >
    <div class="text-gray-400 text-sm pl-1" v-if="description">
      {{ description }}
    </div>
  </BaseInput>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import BaseInput from '~/components/form/BaseInput.vue';

export default defineComponent({
  name: 'FormInput',
  components: {BaseInput},
  props: {
    id: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    required: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: false,
    }
  },
});
</script>
