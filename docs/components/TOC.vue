<template>
  <div class="overflow-hidden" :class="componentStyle">
    <div class="block inline-flex flex-row items-center cursor-pointer px-2 py-1 rounded bg-green-200"
         @click="toggleActive">
      <RightChevron class="w-6 h-6 transition-all duration-200" :class="isActive ? 'rotate' : ''"/>
      <span v-if="!moveToSide" class="mx-1">
        Auf dieser Seite
      </span>
    </div>

    <div class="mt-4 bg-white body" :class="!isActive && 'inactive'">
      <div class="inline-block p-4 rounded border-2 border-green-300">
        <ul class="space-y-2">
          <li v-for="h in headers" :key="h.label">
            <a :href="'#' + h.id" @click.prevent="goToHeader(h.id)">{{ h.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref, onBeforeUnmount, computed} from '@nuxtjs/composition-api';
import RightChevron from '~/components/icons/RightChevron.vue';

interface TocElement {
  label: string;
  id: string;
}

export default defineComponent({
  components: {RightChevron},
  props: {
    depth: {
      type: String as PropType<String>,
      required: true,
      validator: function (val: string) {
        return ['h1', 'h2', 'h3', 'h4', 'h5'].includes(val);
      },
    },
  },

  setup(props: any, {root}: { root: any }) {
    let headers = ref<TocElement[]>([]);
    let isActive = ref(false);
    let moveToSide = ref(false);

    let componentStyle = computed(() => {
      if (moveToSide.value) {
        return 'fixed z-10 top-16 left-4';
      } else {
        return 'block'
      }
    });

    const toggleActive = () => {
      isActive.value = !isActive.value;
    };

    const goToHeader = (id: string) => {
      toggleActive();
      setTimeout(() => {
        const elem = document.getElementById(id);
        const offset = elem && elem.offsetTop - 150 || 0;
        window.scroll({
          top: offset,
          left: 0,
          behavior: 'smooth'
        });
      }, 0);
    }

    const _onScroll = () => {
      moveToSide.value = window.scrollY >= 100;
    };

    onMounted(() => {
      root.$nextTick(() => {
        const headings = document.querySelectorAll(props.depth);
        headings.forEach(h => {
          headers.value.push({
            label: h.innerText,
            id: h.id
          });
        });
      });

      document.addEventListener('scroll', _onScroll);
    });

    onBeforeUnmount(() => {
      document.removeEventListener('scroll', _onScroll);
    });

    return {
      headers,
      isActive,
      toggleActive,
      componentStyle,
      moveToSide,
      goToHeader
    }
  }
});
</script>

<style scoped>
.rotate {
  transform: rotate(90deg);
}

.body {
  overflow: hidden;
  transition: max-height .5s ease;
  max-height: 400px;
}

.inactive {
  max-height: 0;
}
</style>
