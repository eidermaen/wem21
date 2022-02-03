<template>
  <div class="flex flex-row items-center space-x-4">
    <span>
      {{ name }}
    </span>

    <span>
      {{ time }}
    </span>

    <span class="ml-2 flex flex-row items-center space-x-2">
      <button class="button start" v-if="!isActive" @click="$emit('start')">Start</button>
      <button class="button stop" v-else @click="$emit('stop')">Stop</button>
      <button class="button reset" @click="clickResetTimer">Reset</button>
    </span>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch} from '@nuxtjs/composition-api';

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    isActive: {
      type: Boolean,
      default: false,
    }
  },

  setup(props: any, {emit}) {
    let time = ref<string>('00:00:00');
    let interval: any = null;

    let seconds = 0;
    let minutes = 0;
    let hours = 0;

    watch(() => props.isActive, () => {
      props.isActive ? clickStartTimer() : clickStopTimer();
    });

    const clickStartTimer = function () {
        interval = setInterval(() => {
        seconds++;

        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes == 60) {
          minutes = 0;
          hours++;
        }

        const formatted = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        time.value = formatted;
      }, 1000);
    }

    const clickStopTimer = function () {
      clearInterval(interval);
    }

    const clickResetTimer = () => {
      emit('stop');
      clearInterval(interval);
      seconds = 0;
      minutes = 0;
      hours = 0;
      time.value = '00:00:00';
    };

    return {
      time,
      clickResetTimer,
    }
  }
});
</script>

<style scoped>
.button {
  @apply py-1 px-2  border rounded;
}

.start {
  @apply border-green-500 bg-green-400 text-green-900;
}

.stop {
  @apply border-red-500 bg-red-400 text-white;
}

.reset {
  @apply border-gray-500 bg-gray-400 text-gray-900;
}
</style>
