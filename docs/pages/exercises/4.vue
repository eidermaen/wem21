<template>
  <ExercisePage :exercise-id="4">
    <Info variant="info" title="Info zur Umsetzung">
      Die Komponenten wurden ursprünglich mit VanillaJS gebaut. Für die Homepage wurden diese in Vue-Komponenten
      umgewandelt. Die Originalkomponenten können hier abgerufen werden:

      <ul class="list-disc list-inside mt-2">
        <li>
          <CustomAnchor target="_blank" href="/external/4/einkaufsliste.html">Einkaufsliste</CustomAnchor>
        </li>
        <li>
          <CustomAnchor target="_blank" href="/external/4/rednerliste.html">Rednerliste</CustomAnchor>
        </li>
        <li>
          <CustomAnchor target="_blank" href="/external/4/tabellenkalkulation.html">Tabellenkalkulation</CustomAnchor>
        </li>
        <li>
          <CustomAnchor target="_blank" href="/external/4/wysiwyg.html">HTML-Editor</CustomAnchor>
        </li>
      </ul>
    </Info>

    <Exercise title="4.1 Einkaufsliste">
      <Einkaufsliste/>
    </Exercise>

    <Exercise title="4.2 Rednerliste mit Zeitmessung">
      <Rednerliste />
    </Exercise>

    <Exercise title="4.3 Tabellenkalkulation">
      <Tabellenkalkulation />
    </Exercise>

    <Exercise title="4.4 HTML-Editor">
    </Exercise>
  </ExercisePage>

</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import Exercise from '~/components/Exercise.vue';
import Info from '~/components/Info.vue';
import ExercisePage from '~/components/ExercisePage.vue';
import CustomAnchor from '~/components/CustomAnchor.vue';
import Einkaufsliste from '~/components/exercises/Einkaufsliste.vue';
import Rednerliste from '~/components/exercises/Rednerliste.vue';
import Tabellenkalkulation from '~/components/exercises/Tabellenkalkulation.vue';

export default defineComponent({
  components: {Tabellenkalkulation, Rednerliste, Einkaufsliste, CustomAnchor, ExercisePage, Info, Exercise},
});
</script>
