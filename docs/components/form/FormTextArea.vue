<template>
  <BaseInput v-bind="$props">
    <textarea :value="value" @input="$emit('input', $event.target.value)" :id="id"
              :name="name" :required="required" :rows="rows" class="form-input" />
  </BaseInput>
</template>
<script>
import BaseInput from './BaseInput';
export default {
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
    },
    rows: {
      type: Number,
      default: 4
    },
    value: {
      type: String,
      default: ''
    },
  }
}
</script>
