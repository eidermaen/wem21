<template>
  <ExercisePage :exercise-id="12">
    <Exercise title="12.5 Sicherheitskonzepte für die eigene Homepage">
      <div>
        Folgende Maßnahmen wurden getroffen, um die Homepage abzusichern.
      </div>

      <Question>TLS-Verschlüsselung</Question>
      <Answer>
        Die Webseite wird mithilfe von Netlify deployed. Dort wird jede Seite standardmäßig per TLS abgesichert,
        sodass jeglicher Datenaustausch über die Seite verschlüsselt wird. Ein Abfangen von Klardaten (z.B. aus dem
        Feedback-Form ist somit nicht möglich.
      </Answer>

      <Question>HTML-Escaping</Question>
      <Answer>
        Die Seite wurde mithilfe von NuxtJS erstellt, was VueJS als darunterliegendes Framework nutzt. Bei VueJS
        wird standardmäßig jeglicher Inhalt HTML-escaped. Das heißt, alle Eingaben, die z.B. in Input-Felder getätigt
        werden und dann auf der Seite gerendert werden, werden escaped. Ein Ausführen von Script-Blöcken ist somit
        nicht möglich.
      </Answer>

      <Question>Escaping des ausgehenden Verkehrs</Question>
      <Answer>
        Wird z.B. eine neue Nachricht über das Feedback-Form eingereicht, wird diese an Netlify weitergeleitet
        (<CustomAnchor target="_blank" href="https://www.netlify.com/products/forms/">Netlify Forms</CustomAnchor>).
        Neben einem Honeypot-Feld werden die Daten zudem anschließend durch Akismet auf Spam untersucht und automatisch
        aussortiert. <br>
        Die Daten, die letztendlich auf dem Server gespeichert werden, werden durch Netlify entsprechend gespeichert,
        sodass dort kein Ausführen von z.B. SQL-Ausdrücken möglich ist.
      </Answer>
    </Exercise>
  </ExercisePage>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import ExercisePage from '~/components/ExercisePage.vue';
import Exercise from '~/components/Exercise.vue';
import Title from '~/components/Title.vue';
import Question from '~/components/Question.vue';
import Answer from '~/components/Answer.vue';
import CustomAnchor from '~/components/CustomAnchor.vue';

export default defineComponent({
  components: {CustomAnchor, Answer, Question, Title, Exercise, ExercisePage}
});
</script>
