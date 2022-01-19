<template>
  <div>
    <div class="text-center text-gray-800 animate-flyin">
      <h1 class="text-4xl">WEM Solution Navigator</h1>
      <p>Built with NuxtJS and TailwindCSS</p>
    </div>

    <FlyDelay>
      <div class="mt-6 ">
        <h2 class="text-3xl">Aufgaben</h2>

        <div class="mt-2 grid grid-cols-3 gap-2">
          <nuxt-link v-for="ex in data" :key="ex.id" :to="`exercises/${ex.id}`">
            <Card :title="`${ex.id}: ${ex.title}`">
              {{ ex.description }}
            </Card>
          </nuxt-link>
        </div>
      </div>
    </FlyDelay>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Card from '~/components/Card.vue';
import FlyDelay from '~/components/animations/FlyDelay.vue';
import exercises from '~/data/exercises';

export default Vue.extend({
  name: 'IndexPage',
  components: {FlyDelay, Card},

  asyncData(): Promise<object | void> | object | void {
    return {
      data: exercises
    }
  }
})
</script>
