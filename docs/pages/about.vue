<template>
  <div>
    <Title>
      Über diese Webseite
    </Title>

    <div class="mt-6">
      <p>
        Diese Webseite wurde im Rahmen des Moduls <strong>Web Engineering</strong> im Wintersemester 2021/22 erstellt.
        <br>
        Sie dient als <strong>Solution-Navigator</strong> für die während des Semesters erarbeiteten Aufgaben.
      </p>

      <p>
        Die Webseite ist technisch wie folgt umgesetzt:
      </p>

      <Title sub>
        Frontend
      </Title>

      <p>
        Für das Frontend kommt
        <CustomAnchor href="https://nuxtjs.org" target="_blank">NuxtJS</CustomAnchor>
        zum Einsatz.
        Da NuxtJS out-of-the-box Static Site Generation unterstützt, kann die Seite sehr schnell deployed werden.
      </p>

      <p>
        Weiterhin wird für das Styling
        <CustomAnchor target="_blank" href="https://tailwindcss.com">TailwindCSS</CustomAnchor> verwendet. Dabei
        handelt es sich um ein CSS-Framework mit Utility-Klassen, um das Styling mit CSS zu vereinfachen.
      </p>

      <p>
        Außerdem finden die folgenden (NuxtJS-)Module Anwendung:
      </p>

      <ul class="list-disc list-inside mb-4">
        <li>
          <CustomAnchor href="https://composition-api.nuxtjs.org" target="_blank">Nuxt Composition-API</CustomAnchor>
        </li>
        <li>
          <CustomAnchor href="https://clipboardjs.com/" target="_blank">clipboard</CustomAnchor>
          zum Kopieren von Code-Snippets
        </li>
        <li>
          <CustomAnchor href="https://prismjs.com/" target="_blank">prismjs</CustomAnchor>
          zur Formatierung von Code-Snippets
        </li>
        <li>
          <CustomAnchor href="https://typescript.nuxtjs.org/" target="_blank">Nuxt Typescript</CustomAnchor>
        </li>
        <li>
          <CustomAnchor href="https://storybook.nuxtjs.org/" target="_blank">Nuxt Storybook</CustomAnchor>
          für die einfachere Integration von Storybook
        </li>
      </ul>

      <Title sub>
        Deployment/ Hosting
      </Title>

      <p>
        Das Deployment der Seite passiert über
        <CustomAnchor target="_blank" href="https://netlify.com">Netlify</CustomAnchor>.
        Netlify hat dabei eine Verbindung zum Git-Repository, in dem der Code für die Seite liegt und macht jedes Mal
        ein Rebuild, wenn auf einen bestimmten Branch Änderungen committed werden.
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import CustomAnchor from '~/components/CustomAnchor.vue';
import getTitle from '~/utils/getTitle';

export default defineComponent({
  components: {CustomAnchor},

  head: {
    title: getTitle('About'),
  },
});
</script>

<style scoped>
p {
  @apply my-4;
}
</style>
