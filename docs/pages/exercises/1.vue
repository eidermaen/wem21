<template>
  <div>
    <Title>
      {{ exercise.id }}: {{ exercise.title }}
    </Title>
    <p class="mt-2">
      {{ exercise.description }}
    </p>

    <hr class="mt-4">

    <div class="mt-6">
      <Title sub>
        1.1. Fachliche Argumentation über Erfolgsprinzipien des WWW
      </Title>

      <Question>
        Mit welchen fachlichen Argumenten wurde das WWW-Proposal von TBL abgelehnt?
      </Question>
      <Answer>
        <ul class="list-disc list-inside">
          <li>
            Chef TBL: Verwechslung Wagheit mit Evolvierbarkeit
          </li>
          <li>
            Hypertext Community sah Proposal als Rückschritt an: Sie wollten keine "Broken links". Zudem vorderten sie
            mathematische Rigorosität und ein Objekt- und kein Text-Protokoll.
            Sie sahen ihre Arbeiten als schon weiter fortgeschritten an. Sie stellten sich unter Hypertext etwas anderes
            vor.
          </li>
        </ul>
      </Answer>

      <Question>
        Was sind die fachlichen Argumente, warum das WWW dennoch ein Erfolg wurde?
      </Question>
      <Answer>
        Wurde von Marc Andreesen entdeck. Er baute den ersten Webbrowser (Mosaic), welcher als Grundlage vieler der
        aktuellen Browser diente. Dieser trug mit zum Erfolg des WWW bei. Weiterhein spielt Dezentralität und die
        unabhängige Entwicklung in verschiedene Dimensionen (HTTP Protokoll, HTML, URI) eine wichtige Rolle.
      </Answer>

      <Question>
        Was wäre der Preis für die garantierte Verhinderung von “broken links”?
      </Question>
      <Answer>
        Broken links könnten durch referenzielle Integrität vermieden werden. Das heißt also jeder Link müsste z.B. in
        einer Datenbank gespeichert werden und seine Korrektheit überprüft werden. Dies würde also eine zentrale
        Speicherung der Links notwendig machen -> Verlust der Dezentralität und Offenheit.
      </Answer>
    </div>

    <div class="mt-6">
      <Title sub>
        1.2 HTTP
      </Title>

      <Question>
        Sie bekommen im Browser den HTTP Status Code 200. Was bedeutet das?
      </Question>
      <Answer>
        Der Statuscode steht für „Success“. Das heißt also, dass die gesendet Anfrage erfolgreich war.
      </Answer>

      <Question>
        Sie bekommen im Browser den HTTP Status Code 301. Was hat das zu bedeuten?
      </Question>
      <Answer>
        Der Statuscode steht für „Moved Permanently“. Die genutzte URL ist also veraltet, bzw. die dahinterliegenden
        Ressourcen wurden verschoben. In Normalfall sollte hier die neue URL in der Response mitgeschickt werden.
      </Answer>

      <Question>
        Sie bekommen im Browser den HTTP Status Code 400. Was hat das zu bedeuten? Was können Sie dagegen tun?
      </Question>
      <Answer>
        400 steht für „Bad Request“, heißt also, dass die gesendete Anfrage fehlerhaft war. Dies kann viele Gründe haben
        (fehlerhafte URL, fehlerhafter Message body, fehlerhafte Daten, …). Über die Konsole kann man versuchen,
        genauere Informationen über den Fehler herauszufinden, oder aber man überprüft seine getätigten Eingaben (z.B.
        wenn es sich um ein ausgefülltes Formular in Verbindung mit einem POST request handelt).
      </Answer>

      <Question>
        Sie bekommen im Browser den HTTP Status Code 403. Was hat das zu bedeuten? Was können Sie dagegen tun?
      </Question>
      <Answer>
        403 steht für "Forbidden", was bedeutet, dass der anfragende client keine Berechtigung hat, diese Ressource
        anzufordern. Ein Biespiel hier wäre z.B. eine "restricted area" auf einer Internetseite, die man nur erreicht,
        wenn man eingelogged ist. Wäre man nun nicht eingelogged, könnte z.B. ein 403 zurückkommen.
        Somit kann man den Fehler versuchen zu beheben, indem man sich einlogged bzw. Berechtigungen für die jeweilige
        Ressource anfordert.
      </Answer>

      <Question>
        In einer Webanwendung benötigen Sie eine OPTIONS-Anfrage, die die Optionen des Servers vor dem eigentlichen
        Zugriff erfragen soll. Aus Performanzgründen soll die Abfrage jedoch cacheable sein. Wie könnten Sie dafür eine
        Lösung angehen?
      </Question>
      <Answer>
        OPTIONS request können standardmäßig so nicht gecached werden. Somit muss man hier eine eigene Implementierung
        finden, die dieser Cachevorgang vorgenommen werden kann. Da GET requests gecached werden, könnte man einen
        OPTIONS request in einen GET request und wieder zurück wandeln, um das Caching der GET requests ausnutzen zu
        können.
      </Answer>
    </div>

    <div class="mt-6">
      <Title sub>
        1.3. Wireframe with HTML and CSS: Tribute Page
      </Title>

      <div class="mt-2">
        <CustomLink to="/external/tribute.html" :nuxt="false" target="_blank">
          Link zum Wireframe
        </CustomLink>
      </div>
    </div>

    <div class="mt-6">
      <Title sub>
        1.4. Wireframe with HTML and CSS (Survey Form)
      </Title>

      <div class="mt-2">
        <CustomLink to="/external/survey.html" :nuxt="false" target="_blank">
          Link zum Wireframe
        </CustomLink>
      </div>
    </div>

    <div class="mt-6">
      <Title sub>
        1.5. Wireframe with HTML and CSS (Product Landing Page)
      </Title>

      <div class="mt-2">
        <CustomLink to="/external/landing.html" :nuxt="false" target="_blank">
          Link zum Wireframe
        </CustomLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Title from '~/components/Title.vue';
import exercises from '~/data/exercises';
import Question from '~/components/Question.vue';
import Answer from '~/components/Answer.vue';
import Button from '~/components/Button.vue';

export default Vue.extend({
  components: {Button, Answer, Question, Title},

  asyncData(): Promise<object | void> | object | void {
    return {
      exercise: exercises.find(ex => ex.id === 1)
    }
  }
});
</script>
