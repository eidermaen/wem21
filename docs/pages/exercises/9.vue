<template>
  <ExercisePage :exercise-id="9">
    <Exercise title="9.1 PWA">
      <Info title="Info" variant="info">
        Da die Webseite mit NuxtJs erstellt wurde, konnte hier das PWA Module verwendet werden, was die Erstellung
        der PWA automatisch übernimmt. Für weitere Informationen siehe
        <CustomAnchor href="/about">diese Seite</CustomAnchor>.
      </Info>
    </Exercise>
  </ExercisePage>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import ExercisePage from '~/components/ExercisePage.vue';
import Exercise from '~/components/Exercise.vue';
import Info from '~/components/Info.vue';
import CustomAnchor from '~/components/CustomAnchor.vue';

export default defineComponent({
  components: {CustomAnchor, Info, Exercise, ExercisePage}
});
</script>
