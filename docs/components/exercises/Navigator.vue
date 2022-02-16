<template>
  <div class="container">
    <div class="top">
      <h1>WWW-Navigator</h1>
      <div id="navbar-links">
        <span v-if="isLoading">{{ loadingMessage }}</span>
        <NavigatorMenu v-else>
          <NavigatorItem v-for="key in Object.keys(data.data)" :key="key"
                         :selected="data.selectedTop === key" @click="clickUpdateSelection(key, 'top')">
            {{ key.toUpperCase() }}
          </NavigatorItem>
        </NavigatorMenu>
      </div>
    </div>
    <div class="left">
      <div id="left-sidebar">
        <span v-if="isLoading">{{ loadingMessage }}</span>
        <NavigatorMenu v-else vertical>
          <NavigatorItem v-for="key in Object.keys(data.data[data.selectedTop])" :key="key"
                         :selected="data.selectedLeft === key" @click="clickUpdateSelection(key, 'left')">
            {{ key.toUpperCase() }}
          </NavigatorItem>
        </NavigatorMenu>
      </div>
    </div>
    <div class="content">
      <span v-if="isLoading">{{ loadingMessage }}</span>
      <div v-else>
        {{ data.data[data.selectedTop][data.selectedLeft].content }}
      </div>
    </div>
    <div class="right">
      <span v-if="isLoading">{{ loadingMessage }}</span>
      <div v-else>
        <h3>Links</h3>
        <a :href="href" :key="href" target="_blank"
           v-for="href in data.data[data.selectedTop][data.selectedLeft].references">
          {{ href }}
        </a>
      </div>
    </div>
    <div class="footer">
      <h2>Footer</h2>
      <a href="#">Sitemap</a>
      <a href="#">Home</a>
      <a href="#">News</a>
      <a href="#">Contact</a>
      <a href="#">About</a>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from '@nuxtjs/composition-api';
import {ToastVariant} from '~/plugins/toast/Toast';
import NavigatorMenu from '~/components/exercises/NavigatorMenu.vue';
import NavigatorItem from '~/components/exercises/NavigatorItem.vue';
import {NavigatorData} from '~/data/NavigatorData';
import {NavigatorState} from '~/store/navigator';

const _restURL = 'https://www2.inf.h-brs.de/~jitter2s/wem/navigator_contents.json';

export default defineComponent({
  components: {NavigatorItem, NavigatorMenu},
  data() {
    return {
      isLoading: true,
      loadingMessage: 'Loading . . .',
    }
  },

  methods: {
    _pushHistory(top: string, left: string) {
      history.pushState({
          top,
          left
        },
        `${top}-${left}`,
        '#');
    },

    async clickUpdateSelection(key: string, position: 'top' | 'left') {
      switch (position) {
        case 'top':
          await this.$store.dispatch('navigator/setTop', key);
          this._pushHistory(key, this.data.selectedTop);
          break;
        case 'left':
          await this.$store.dispatch('navigator/setLeft', key);
          this._pushHistory(this.data.selectedTop, key);
          break;
      }
    }
  },

  computed: {
    data(): NavigatorState {
      return this.$store.state.navigator
    }
  },

  async mounted() {
    window.addEventListener('popstate', (e) => {
      if (e.state) {
        this.$store.dispatch('navigator/setBoth', e.state);
      }
    });

    try {
      const data = await fetch(_restURL);
      const json = await data.json();
      await this.$store.dispatch('navigator/setData', json);

      const topKey = Object.keys(json)[0];
      this._pushHistory(topKey, Object.keys(json[topKey])[0]);
      this.isLoading = false;
      this.$toaster('Ready to go!', 'Navigator wurde erfolgreich geladen', {
        variant: ToastVariant.SUCCESS,
        timeout: 2000,
      }).show();
    } catch (e) {
      this.$toaster('Fehler', 'Error while trying to fetch data: ' + e, {
        variant: ToastVariant.ERROR
      }).show();
    }
  }
});

</script>

<style scoped>
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: grid;
  grid-template-columns: 2fr 4fr 2fr;
  grid-template-rows: auto 1fr auto;
  overflow: hidden;
  border-radius: 1rem;
  margin: .5rem;
}

.top {
  grid-column: 1 / span 8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: #26C485;
  color: white;
}

#navbar-links {
  width: 50%;
  display: flex;
  justify-content: space-around;
  align-items: center;
  overflow-x: scroll;
}

.left {
  background-color: #E63946;
  padding: 1rem;
  height: 100%;
}

#left-sidebar {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  overflow: scroll;
}

.content {
  background-color: #7F828B;
  padding: 1rem;
  overflow-y: scroll;
  color: white;
}

.right {
  background-color: #E63946;
  padding: 1rem;
  color: white;
}

.right h3 {
  text-align: center;
}

.right a {
  margin-bottom: 1rem;
  color: white;
}

.footer {
  grid-column: 1 / span 8;
  padding: .5rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #457B9D;
  color: white;
}

.footer a {
  color: white;
}
</style>
