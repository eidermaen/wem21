<template>
  <div>
    <ExerciseHeader :id="3" />

    <Exercise title="3.1: Funktionen in JavaScript">
      <Question>identify_function()</Question>
      <CodeSnippet>
        function identity_function(param) {
          return function() {
            return param;
          }
        }
      </CodeSnippet>

      <Question>
        addf()
      </Question>
      <CodeSnippet>
        function addf(x) {
          return function(y) {
            return x + y;
          }
        }
      </CodeSnippet>

      <Question>
        applyf()
      </Question>
      <CodeSnippet>
        function applyf(fn) {
          return function(x) {
            return function(y) {
              return fn(x,y);
            }
          }
        }
      </CodeSnippet>

      <Question>
        curry()
      </Question>

      <CodeSnippet>
        function curry(fn, first) {
          return function(second) {
            return fn(first, second);
          }
        }
      </CodeSnippet>

      <Question>
        inc()
      </Question>

      <CodeSnippet>
        function inc(x) {
          return addf(x)(1);
        }
      </CodeSnippet>

      <Question>
        methodize()
      </Question>

      <CodeSnippet>
        function methodize(fn) {
          return function(x) {
            return fn(this, x);
          }
        }
      </CodeSnippet>

      <Question>
        demethodize()
      </Question>

      <CodeSnippet>
        function demethodize(fn) {
          return function(x,y) {
            return fn.call(x, y);
          }
        }
      </CodeSnippet>

      <Question>
        twice()
      </Question>

      <CodeSnippet>
        function twice(fn) {
          return function(x) {
            return fn(x,x);
          }
        }
      </CodeSnippet>

      <Question>
        composeu()
      </Question>

      <CodeSnippet>
        function composeu(first, second) {
          return function(x) {
            return second(first(x));
          }
        }
      </CodeSnippet>

      <Question>
        composeb()
      </Question>

      <CodeSnippet>
        function composeb(first, second) {
          return function(x, y, z) {
            return second(first(x, y), z);
          }
        }
      </CodeSnippet>

      <Question>
        once()
      </Question>

      <CodeSnippet>
        function once(fn) {
          this.ran = false;
          const that = this;
          return function(x,y) {
            if (!that.ran) {
              that.ran = true;
              return fn(x,y);
            } else {
              throw new Error("Function already ran!");
            }
          }
        }
      </CodeSnippet>

      <Question>
        counterf()
      </Question>

      <CodeSnippet>
        function counterf(value) {
          const counter = { value };
          counter.inc = function() {
            counter.value ++;
            return counter.value;
          }
          counter.dec = function() {
            counter.value --;
            return counter.value;
          }

          return counter;
        }
      </CodeSnippet>

      <Question>
        revocable()
      </Question>

      <CodeSnippet>
        function revocable(fn) {
          const state = { fn };
          state.invoke = function(value) {
            if (state.fn) {
              return fn(value);
            } else {
              throw new Error("No function available!");
            }
          }
          state.revoke = function() {
            state.fn = null;
          }
          return state;
        }
      </CodeSnippet>

      <Question>
        Array Wrapper
      </Question>

      <CodeSnippet>
        function vector() {
          this.vector = [];
          const object = {};
          const that = this;
          object.append = function(value) {
            that.vector.push(value);
          }
          object.store = function(index, value) {
            that.vector.splice(index, 0, value);
            that.vector.join();
          }
          object.get = function(index) {
            return that.vector[index];
          }
          return object;
        }
      </CodeSnippet>

    </Exercise>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import ExerciseHeader from '~/components/ExerciseHeader.vue';
import ExerciseWrapper from '~/components/ExerciseWrapper.vue';
import Exercise from '~/components/Exercise.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';
import Answer from '~/components/Answer.vue';
import Question from '~/components/Question.vue';

export default Vue.extend({
  components: {Question, Answer, CodeSnippet, Exercise, ExerciseWrapper, ExerciseHeader}
});
</script>
