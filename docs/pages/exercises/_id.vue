<template>
    <Info variant="danger" title="Fehler">
      Die Aufgabe konnte leider nicht gefunden werden. Bitte mit einer anderen ID versuchen.
    </Info>
</template>

<script lang="ts">
import Vue from 'vue';
import Title from '~/components/Title.vue';
import Info from '~/components/Info.vue';

export default Vue.extend({
  components: {Info, Title},
});
</script>
