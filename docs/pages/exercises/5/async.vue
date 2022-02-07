<template>
  <Exercise title="5.2 Async/await">
    <div>
      <CustomLink to="/exercises/5">
        &larr; Zurück zur Aufgabe
      </CustomLink>
    </div>

    <div class="mt-8">
      <div v-if="!totalTime">
        <LoadingAnimation />
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
import CustomLink from '~/components/CustomLink.vue';
import LoadingAnimation from '~/components/animations/LoadingAnimation.vue';
import getTitle from '~/utils/getTitle';

const URL = 'https://www2.inf.h-brs.de/~jitter2s/wem';

export default defineComponent({
  components: {LoadingAnimation, CustomLink, Exercise},

  head: {
    title: getTitle('5.2 Async/Await')
  },

  data() {
    return {
      result: [] as string[],
      totalTime: undefined as number | undefined,
    }
  },

  fetchOnServer: false,

  async fetch() {
    const start = Date.now();

    const fileOne = async () => {
      const response = await fetch(`${URL}/A.txt`);
      const data = await response.text();
      return data.split('\n');
    };

    const fileTwo = async () => {
      const response = await fetch(`${URL}/B.txt`);
      const data = await response.text();
      return data.split('\n');
    };

    const one = await fileOne();
    const two = await fileTwo();

    this.result = [...one];

    for (let i = 0; i < one.length; i++) {
      this.result[i] += two[i];
    }

    const end = Date.now();

    this.totalTime = (end - start)/1000;
  }
});
</script>
