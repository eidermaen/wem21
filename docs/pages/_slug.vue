<template>
  <article>
    <nuxt-content :document="article"></nuxt-content>
  </article>
</template>

<script>
export default {
  async asyncData({ $content, params }) {
    const article = await $content('pages', params.slug).fetch();

    return { article }
  },

  head() {
    return {
      title: `${this.article.title} | WEM21`,

      meta: [
        { hid: 'description', name: 'description', content: this.article.description },
        // Open Graph
        { hid: 'og:title', property: 'og:title', content: this.article.title },
        { hid: 'og:description', property: 'og:description', content: this.article.description },
        // Twitter Card
        { hid: 'twitter:title', name: 'twitter:title', content: this.article.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.article.description }
      ]
    }
  }
}
</script>
