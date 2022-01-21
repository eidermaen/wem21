<template>
  <div class="flex flex-col justify-center items-center w-screen h-screen bg-gray-200">
    <Info variant="danger" :title="title()">
      {{ error.message }}
    </Info>

    <div class="mt-6">
      <nuxt-link to="/" class="text-gray-700">
        &larr; Zurück zur Startseite
      </nuxt-link>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, useMeta} from '@nuxtjs/composition-api';
import getTitle from '~/utils/getTitle';
import Info from '~/components/Info.vue';

export default defineComponent({
  layout: 'empty',
  components: {Info},
  props: ['error'],

  setup(props: any) {
    const title = () => {
      switch (props.error.statusCode) {
        case 404:
          return 'Four Oh Four'
        default:
          return props.error.statusCode;
      }
    };

    useMeta(() => ({
      title: getTitle(props.error.statusCode)
    }));

    return {
      title
    }
  },

  head: {},
});
</script>
