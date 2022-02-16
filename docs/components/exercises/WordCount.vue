<template>
  <div class="container">
    <div class="form">
      <label :for="id">{{ label }}</label>
      <input :id="id" :name="id" v-model.trim="inputValue">
    </div>

    <div class="info">
      Anzahl an Buchstaben: {{ countLetters }}
    </div>

    <div class="info">
      Anzahl an Leerzeichen: {{ countSpaces }}
    </div>

    <div class="info">
      Anzahl an Wörtern: {{ countWords }}
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
  },

  setup() {
    const inputValue = ref('');

    const countLetters = computed(() => inputValue.value.match(/[a-zA-Z]/g)?.length || 0);
    const countSpaces = computed(() => inputValue.value.match(/ /g)?.length || 0);
    const countWords = computed(() => inputValue.value.match(/(\w+)/g)?.length || 0);

    return {
      inputValue,
      countWords,
      countSpaces,
      countLetters
    }
  }
});

</script>

<style scoped>
.container {
  padding: 2rem 4rem;
  border-radius: .4rem;
  background-color: #26C485;
}

label {
  display: block;
  color: #47494E;
}

input {
  padding: .5rem .3rem;
  margin: .2rem 0;
  border: none;
  border-radius: .2rem;
  width: 100%;
}

.form {
  margin: 1rem 0;
  width: 70%;
}

.info {
  margin: 1rem 0;
}
</style>
