<template>
  <BaseInput :id="id" :label="label" :required="required">
    <input :value="value" :type="$attrs.type" :id="id" :name="name" :required="required" :placeholder="$attrs.placeholder"
           class="form-input" @input="$emit('input', $event.target.value)" v-bind="$attrs" @change="onChange"
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
  emits: ['update:modelValue'],

  props: {
    value: {
      type: [String, Number, Boolean, Object],
      default: '',
    },
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

  methods: {
    onChange(event: any) {
      if (this.$attrs.type === 'file') {
        this.$emit('change', event.target.files);
      }
    }
  }
});
</script>
