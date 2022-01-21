<template>
    <Info variant="danger" title="404 - Not found">
      Die Aufgabe konnte leider nicht gefunden werden. Bitte mit einer anderen ID versuchen.
    </Info>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import Title from '~/components/Title.vue';
import Info from '~/components/Info.vue';
import getTitle from '~/utils/getTitle';

export default defineComponent({
  layout: 'custom-error',

  components: {Info, Title},

  head: {
    title: getTitle('404'),
  }
});
</script>
