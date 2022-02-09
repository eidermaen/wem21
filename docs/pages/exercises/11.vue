<template>
  <ExercisePage :exercise-id="11">
    <Exercise title="11.1 WebAssembly-Modul von Hand erstellen">
      <Question>WAT-Code</Question>
      <CodeSnippet lang="wat">
        (module
          (export "ggT" (func $ggT))
          (func $ggT (param $first i32)(param $second i32)(result i32)(local $div i32)
            local.get $first
            i32.eqz
            if
              local.get $second
              return
            end
            local.get $second
            i32.eqz
            if
              local.get $first
              return
            end
            loop $loop
              local.get $first
              local.get $second
              i32.rem_u
              local.set $div
              local.get $second
              local.set $first
              local.get $div
              local.set $second
              local.get $second
              i32.eqz
              if
                local.get $first
                return
              end
              br $loop
            end

            local.get $first
          )
        )
      </CodeSnippet>

      <Question>Test-Code</Question>
      <CodeSnippet lang="js">
        const response = await fetch('ggt.wasm');
        const buffer = await response.arrayBuffer();
        const wasm = await WebAssembly.instantiate(buffer);
        const ggT = wasm.instance.exports.ggT;

        const tbody = document.querySelector('#table > tbody');

        const getRandomNumber = () => {
          return Math.floor(Math.random() * 100)
        }

        for (let i=0; i < 50; i++) {
          const first = getRandomNumber();
          const second = getRandomNumber();
          const result = ggT(first, second);

          const tr = document.createElement('tr');
          tr.innerHTML = `
            <td>${first}</td>
            <td>${second}</td>
            <td>${result}</td>
          `;

          tbody.appendChild(tr);
        }
      </CodeSnippet>
    </Exercise>

    <Exercise title="11.2 Performanz-Messungen und -Vergleich">
      <Question>Wie viele Primzahlen gibt es bis 100.000?</Question>
      <Answer>
        9593
      </Answer>

      <Question>JS-Code für Primzahl-Algorithmus</Question>
      <CodeSnippet lang="js">
        const isPrime = number => {
          let prime = true;

          for (let i = 2; i < number - 1; i++) {
            if (number % i == 0) {
              prime = false;
              break;
            }
          }

          return prime;
        }

        const resultDiv = document.querySelector('#result');
        let primes = 0;

        const start = Date.now();
        for (let i = 1; i < 100_001; i++) {
          if (isPrime(i)) {
            primes++;
          }
        }
      </CodeSnippet>

      <Question>WAT-Code</Question>
      <Answer>
        Ich habe den Code in Go geschrieben. Die Go CLI kann direkt zu WASM compilen.
        Wenn ich dieses File dann zu WAT transformiere, hat diese Datei etwa 630.000 Zeilen.
        Diese Datei ist <CustomAnchor target="_blank" href="/external/11/primego.wat">hier</CustomAnchor> zu finden.
      </Answer>

      <Question>Quelltext</Question>
      <CodeSnippet lang="go">
        package main

        import (
        "fmt"
        "time"
        )

        func main() {
          primes := 0

          startTime := time.Now()

          for i := 1; i < 100_001; i++ {
            if isPrime(i) {
              primes++
            }
          }

          endTime := time.Now()

          fmt.Println(endTime.Sub(startTime))
        }

        func isPrime (number int) bool {
          prime := true

          for i := 2; i < 100_001; i++ {
            if number%i == 0 {
              prime = false
              break
            }
          }

          return prime
        }
      </CodeSnippet>

      <Question>Messergebnisse</Question>
      <Answer>
        JS (10 mal ausgeführt): <br>
        Min: 1376ms <br>
        Max: 1419ms <br>
        Avg: 1393,6ms <br><br>

        Web Assembly: <br>
        Min: 6,7s <br>
        Max: 6,8s <br>
        Avg: 6,75s
      </Answer>

      <Question>Wie viel schneller ist WebAssembly?</Question>
      <Answer>
        Bei mir war der Web Assembly Code immer langsamer. Der JS Code war fast 5 mal schneller.
      </Answer>

      <Question>Wie erklären Sie sich die Performanz-Unterschiede?</Question>
      <Answer>
        Kann mir den großen Unterschied nicht erklären. Der Web Assembly und JS Code sind 1:1 gleich.
      </Answer>
    </Exercise>
  </ExercisePage>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import ExercisePage from '~/components/ExercisePage.vue';
import Exercise from '~/components/Exercise.vue';
import Question from '~/components/Question.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';
import Answer from '~/components/Answer.vue';
import CustomAnchor from '~/components/CustomAnchor.vue';

export default defineComponent({
  components: {CustomAnchor, Answer, CodeSnippet, Question, Exercise, ExercisePage}
});
</script>
