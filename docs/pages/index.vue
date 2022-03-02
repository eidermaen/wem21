<template>
  <div>
    <div class="text-center text-gray-800 animate-flyin">
      <h1 class="text-4xl">WEM Solution Navigator</h1>
      <p>Built with NuxtJS and TailwindCSS</p>
    </div>

    <FlyDelay>
      <div class="mt-6 ">
        <h2 class="text-3xl">Aufgaben</h2>

        <div class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-2">
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
import {defineComponent, ref} from '@nuxtjs/composition-api';
import Card from '~/components/Card.vue';
import FlyDelay from '~/components/animations/FlyDelay.vue';
import exercises from '~/data/exercises';
import Info from '~/components/Info.vue';

export default defineComponent({
  components: {Info, FlyDelay, Card},

  asyncData(): Promise<object | void> | object | void {
    return {
      data: exercises
    }
  },

  setup() {
    const isModalOpen = ref(true);

    return {
      isModalOpen
    }
  }
})
</script>
