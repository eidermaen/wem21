<template>
  <ExercisePage :exercise-id="5">

    <Exercise title="5.1 Promises">

    </Exercise>

    <Exercise title="5.2 async/ await">

    </Exercise>

    <Exercise title="5.3 Webworker">

    </Exercise>

    <Exercise title="5.4 WWW-Navigator">

    </Exercise>


  </ExercisePage>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api';
import ExercisePage from '~/components/ExercisePage.vue';
import Exercise from '~/components/Exercise.vue';

export default defineComponent({
  components: {Exercise, ExercisePage}
});
</script>
