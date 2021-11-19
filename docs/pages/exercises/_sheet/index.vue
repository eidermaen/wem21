<template>
  <div>
    <BackButton @click="clickNavigateBack">
      Zurück zur Übersicht
    </BackButton>

    <h1>Aufgabenblatt {{ sheet }}: {{ config.name }}</h1>
    <div>
      <BigButton v-for="ex in config.exercises" :key="ex.id" @click="clickGoToNumber(sheet, ex.id)">
        {{ ex.id }}: {{ ex.name }}
      </BigButton>
    </div>
  </div>
</template>

<script>
import config from "~/data/data.json";
import BigButton from '../../../components/BigButton';

export default {
  components: {BigButton},
  methods: {
    clickNavigateBack() {
      this.$router.push(`/exercises`);
    },
    clickGoToNumber(sheet, id) {
      this.$router.push(`/exercises/${sheet}/${id}`);
    }
  },

  asyncData({ params }) {
    const { sheet } = params;
    const fetchedConfig = config[sheet];

    return {
      sheet,
      config: fetchedConfig
    };
  }
}
</script>
