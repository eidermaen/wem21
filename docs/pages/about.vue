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
import Vue from 'vue';
import CustomAnchor from '~/components/CustomAnchor.vue';

export default Vue.extend({
  components: {CustomAnchor}
});
</script>

<style scoped>
p {
  @apply my-4;
}
</style>
