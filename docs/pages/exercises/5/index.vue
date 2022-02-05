<template>
  <ExercisePage :exercise-id="5">

    <Exercise title="5.1 Promises">
      <CustomLink to="/exercises/5/promises">
        Zur Aufgabe
      </CustomLink>
    </Exercise>

    <Exercise title="5.2 async/ await">
      <CustomLink to="/exercises/5/async">
        Zur Aufgabe
      </CustomLink>
    </Exercise>

    <Exercise title="5.3 Webworker">
      <div class="space-y-6">
        <div>
          <CustomLink :nuxt="false" target="_blank" to="/external/5/index.html">
            Implementierung ohne Webworker
          </CustomLink>
        </div>
        <div>
          <CustomLink :nuxt="false" target="_blank" to="/external/5/webworker.html">
            Implementierung mit Webworker
          </CustomLink>
        </div>
      </div>
    </Exercise>

    <Exercise title="5.4 WWW-Navigator">
      <Info title="Info" variant="info">
        Die ursprüngliche Implementierung ist
        <CustomAnchor target="_blank" href="/external/5/navigator.html">
          hier
        </CustomAnchor>
        zu finden. Die Aufgabe wurde mit VanillaJS umgesetzt und nicht in Vue-Komponenten überführt, da diese Homepage
        den WWW-Navigator darstellt.
      </Info>

    </Exercise>


  </ExercisePage>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import CustomLink from '~/components/CustomLink.vue';
import Info from '~/components/Info.vue';
import CustomAnchor from '~/components/CustomAnchor.vue';

export default defineComponent({
  components: {CustomAnchor, Info, CustomLink}
});
</script>
