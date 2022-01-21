<template>
  <ExercisePage :exercise-id="3">
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

    <Exercise title="3.2: Advanced Functional JavaScript Programming">

      <Question>
        Pub/sub object
      </Question>

      <CodeSnippet>
        function pubsub() {
          this.subs = [];
          const that = this;
          return {
            subscribe(fn) {
              that.subs.push(fn);
            },
            publish(value) {
              that.subs.forEach(fn => {
                fn(value);
              });
            }
          }
        }
      </CodeSnippet>

      <Question>
        gensym()
      </Question>

      <CodeSnippet>
        function gensymf(symbol) {
          this.symbol = symbol;
          this.counter = 0;

          return () => {
            const output = `${this.symbol}${this.counter}`;
            this.counter++;
            return output;
          }
        }
      </CodeSnippet>

      <Question>
        fibonacci()
      </Question>

      <CodeSnippet>
        function fibonacci(first, second) {
          this.first = first;
          this.second = second;
          this.firstReturned = false;
          this.secondReturned = false;

          return () => {
            if (!this.firstReturned) {
              this.firstReturned = true;
              return this.first;
            } else if (!this.secondReturned) {
              this.secondReturned = true;
              return this.second;
            } else {
              const result = this.first + this.second;
              this.first = this.second;
              this.second = result;
              return result;
            }
          }
        }
      </CodeSnippet>

      <Question>
        addg()
      </Question>

      <CodeSnippet>
        function addg(value) {
          function fn(next) {
            if (!next) return value;

            value += next;
            return fn;
          }

          return fn;
        }
      </CodeSnippet>

      <Question>
        applyg()
      </Question>

      <CodeSnippet>
        function applyg(fn) {
          let store = 0;
          return function (first) {
            store = first;
            function cb(second) {
              if (second) {
                store = fn(store, second);
                return cb;
              } else {
                return store;
              }
            }
            return cb;
          }
        }
      </CodeSnippet>

      <Question>
        m()
      </Question>

      <CodeSnippet>
        function m(value, source) {
          return {
            value,
            source: source || String(value)
          };
        }
      </CodeSnippet>

      <Question>
        addm()
      </Question>

      <CodeSnippet>
        function addm(first, second) {
          return {
            value: first.value + second.value,
            source: `(${first.value}+${second.value})`
          };
        }
      </CodeSnippet>

      <Question>
        binarymf()
      </Question>

      <CodeSnippet>
        function binarymf(fn, sign) {
          return (first, second) => {
            return {
              value: fn(first.value, second.value),
              source: `(${first.value}${sign}${second.value})`
            }
          }
        }
      </CodeSnippet>

      <Question>
        binarymf2()
      </Question>

      <CodeSnippet>
        function binarymf2(fn, sign) {
          return (first, second) => {
            let firstRaw, secondRaw;
            if (typeof first === 'object' && first.hasOwnProperty('value')) {
              firstRaw = first.value;
            } else {
              firstRaw = first;
            }

            if (typeof second === 'object' && second.hasOwnProperty('value')) {
              secondRaw = second.value;
            } else {
              secondRaw = second;
            }

            return {
              value: fn(firstRaw, secondRaw),
              source: `(${firstRaw}${sign}${secondRaw})`
            }
          }
        }
      </CodeSnippet>

      <Question>
        unarymf()
      </Question>

      <CodeSnippet>
        function unarymf(fn, sign) {
          return (value) => {
            return {
              value: fn(value),
              source: `(${sign} ${value})`
            }
          }
        }
      </CodeSnippet>

      <Question>
        hyp()
      </Question>

      <CodeSnippet>
        function hyp(a, b) {
          return Math.sqrt(a*a + b*b);
        }
      </CodeSnippet>

      <Question>
        exp()
      </Question>

      <CodeSnippet>
        function exp(array) {
          const fn = array[0];
          const first = array[1];
          const second = array[2];

          let firstRaw, secondRaw;

          if (typeof first === 'number') {
            firstRaw = first;
          } else if (typeof first === 'object' && first.length) {
            firstRaw = exp(first);
          }

          if (second) {
            if (typeof second === 'number') {
              secondRaw = second;
            } else if (typeof second === 'object' && second.length) {
              secondRaw = exp(second);
            }
          }

          if (secondRaw) {
            return fn(firstRaw, secondRaw);
          } else {
            return fn(firstRaw);
          }
        }
      </CodeSnippet>

      <Question>
        store()
      </Question>

      <CodeSnippet>
        var variable;
        function store(value) {
          variable = value;
        }
      </CodeSnippet>

      <Question>
        quatre()
      </Question>

      <CodeSnippet>
        function quatre(bin, first, second, cb) {
          cb(bin(first, second));
        }
      </CodeSnippet>

      <Question>
        unaryc()
      </Question>

      <CodeSnippet>
        function unaryc(fn) {
          return function(value, cb) {
            cb(fn(value));
          }
        }
      </CodeSnippet>

      <Question>
        binaryc()
      </Question>

      <CodeSnippet>
        function binaryc(binary) {
          return function (first, second, cb) {
            cb(binary(first, second));
          }
        }
      </CodeSnippet>

    </Exercise>
  </ExercisePage>

</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import Exercise from '~/components/Exercise.vue';
import CodeSnippet from '~/components/CodeSnippet.vue';
import Answer from '~/components/Answer.vue';
import Question from '~/components/Question.vue';
import ExercisePage from '~/components/ExercisePage.vue';

export default defineComponent({
  components: {ExercisePage, Question, Answer, CodeSnippet, Exercise}
});
</script>
