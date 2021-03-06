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
        Da NuxtJS out-of-the-box <strong>Static Site Generation</strong> unterstützt, kann die Seite sehr schnell
        deployed werden.
      </p>

      <p>
        Weiterhin wird für das Styling
        <CustomAnchor target="_blank" href="https://tailwindcss.com">TailwindCSS</CustomAnchor>
        verwendet. Dabei
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
        <li>
          <CustomAnchor href="https://pwa.nuxtjs.org/" target="_blank">PWA</CustomAnchor>
          für die automatische Erstellung einer PWA
        </li>
      </ul>

      <p>
        Auf der Seite werden Icons verwendet. Diese stammen von
        <CustomAnchor target="_blank" href="https://heroicons.com/">Heroicons</CustomAnchor>.
        Weiterhin wurden zwei Schriftarten verwendet:
        <CustomAnchor target="_blank" href="https://fonts.google.com/specimen/Kameron">Kameron</CustomAnchor> und
        <CustomAnchor target="_blank" href="https://fonts.google.com/specimen/Montserrat">Montserrat</CustomAnchor>.
      </p>

      <Title sub>
        Deployment/ Hosting
      </Title>

      <p>
        Das Deployment der Seite geschieht über
        <CustomAnchor target="_blank" href="https://netlify.com">Netlify</CustomAnchor>.
        Netlify hat dabei eine Verbindung zum Git-Repository, in dem der Code für die Seite liegt.
        Jedes Mal, wenn auf den <strong>master</strong> Branch committed wird, wird ein Rebuild der Seite durch
        Netlify getriggered und die Homepage im Netlify-CDN neu deployed.
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
