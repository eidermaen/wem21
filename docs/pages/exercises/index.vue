<template>
  <div>
    <h1>Aufgaben</h1>
    <p>
      Hier kann aus allen bearbeiteten Aufgaben ausgewählt werden.
    </p>
    <div>
      <BigButton v-for="ex of config" :key="ex.sheet" @click="clickNavigateToSheet(ex.sheet)">
        Blatt {{ ex.sheet }}: {{ ex.name }}
      </BigButton>
    </div>
  </div>
</template>

<script>
import config from '~/data/data.json';

export default {
  data() {
    return {
      config: [],
    }
  },

  methods: {
    clickNavigateToSheet(sheet) {
      this.$router.push(`/exercises/${sheet}`);
    }
  },

  created () {
    this.config = config;
  }
}
</script>
