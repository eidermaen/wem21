<template>
  <Exercise title="5.1 Promises">
    <div>
      <CustomLink to="/exercises/5">
        &larr; Zurück zur Aufgabe
      </CustomLink>
    </div>

    <div class="mt-8">
      <div v-if="!totalTime" class="w-1/2">
        <LoadingAnimation></LoadingAnimation>
      </div>

      <div v-else>
        <strong>Total loading time: {{ totalTime }}s</strong>
      </div>
      <div class="mt-4">
        <div v-for="(value, index) in result" :key="index">
          {{ value }}
        </div>
      </div>
    </div>
  </Exercise>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import Exercise from '~/components/Exercise.vue';
import BulbIcon from '~/components/icons/BulbIcon.vue';
import LoadingAnimation from '~/components/animations/LoadingAnimation.vue';
import getTitle from '~/utils/getTitle';

const URL = 'https://www2.inf.h-brs.de/~jitter2s/wem';

export default defineComponent({
  components: {LoadingAnimation, BulbIcon, Exercise},

  head: {
    title: getTitle('5.1 Promises')
  },

  data() {
    return {
      result: [] as string[],
      totalTime: undefined as number | undefined,
    }
  },

  fetch() {
    const start = Date.now();

    const fileOne = new Promise((resolve) => {
      fetch(`${URL}/A.txt`)
        .then(d => (d.text()))
        .then(d => resolve(d.split('\n')));
    });
    const fileTwo = new Promise((resolve) => {
      fetch(`${URL}/B.txt`)
        .then(d => d.text())
        .then(d => resolve(d.split('\n')));
    });

    Promise.all([fileOne, fileTwo])
      .then((responses: any) => {
        this.result.push(...responses[0]);
        for (let i = 0; i < responses[1].length; i++) {
          this.result[i] += responses[1][i];
        }

        const end = Date.now();

        this.totalTime = (end - start) / 1000;
      });
  }
});
</script>
