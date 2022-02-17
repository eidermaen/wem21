<template>
  <div>
    <transition name="fade">
      <div v-show="showScrollToTop" @click.stop="scrollToTop"
           class="fixed w-12 h-12 z-10 flex bottom-8 right-8 text-green-600 cursor-pointer">
        <span class="animate-ping absolute inline-flex h-full w-full bg-green-200 rounded-full opacity-75"></span>
        <span class="relative inline-flex justify-center items-center
        rounded-full w-12 h-12 bg-green-300 hover:bg-green-200 transition-all duration-200">
          &uarr;
        </span>
      </div>
    </transition>

    <nav class="sticky top-0 py-2 bar">
      <div class="flex items-center text-gray-400">
        <nuxt-link to="/">
          <img src="/logo.png" class="w-10 h-10">
        </nuxt-link>

        <nuxt-link to="/about" class="ml-6 menu-hover-item">
          About
        </nuxt-link>

        <nuxt-link to="/feedback" class="ml-1 menu-hover-item">
          Feedback
        </nuxt-link>

        <a href="/storybook" class="ml-1 menu-hover-item">
          Storybook
        </a>
      </div>
    </nav>

    <div class="w-full px-2 md:px-0 md:w-3/4 md:mx-auto xl:w-2/3 my-6 min-h-screen">
      <Nuxt />
    </div>

    <div class="bar py-1 text-sm text-gray-300 text-center">
      &copy; Jona Ittermann 2022
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({

  data() {
    return {
      showScrollToTop: false,
    }
  },

  methods: {
    _onScroll() {
      this.showScrollToTop = window.scrollY >= 100;
    },
    scrollToTop() {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    },
  },

  mounted() {
    document.addEventListener('scroll', this._onScroll);
  },

  beforeDestroy() {
    document.removeEventListener('scroll', this._onScroll);
  }

})
</script>

<style scoped>
.bar {
  @apply px-4 bg-blue-600 z-10;
}

.menu-hover-item {
  @apply px-3 py-2 rounded hover:bg-gray-100 hover:text-gray-600 transition-all duration-500
}

/* https://vuejs.org/v2/guide/transitions.html */
.fade-enter-active, .fade-leave-active {
  transition: all .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(1rem);
}
</style>
