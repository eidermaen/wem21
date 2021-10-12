<template>
  <div>
    <nav>
      <nuxt-link to="/" class="nav-home">Home</nuxt-link>

      <span>
        <nuxt-link to="about">About</nuxt-link>
        <nuxt-link to="#">Exercises</nuxt-link>
        <a href="storybook">Storybook</a>
      </span>

    </nav>

    <main class="container">
      <Nuxt/>
    </main>

    <footer>

    </footer>
  </div>
</template>

<script>
export default {}
</script>

<style>
body {
  margin: 0;
}

nav {
  padding: 1.2rem;
  background-color: #1D3557;
  display: flex;
  align-items: center;
}

nav a {
  color: #F1FAEE;
  text-decoration: none;
  margin-right: 1rem;
}

nav .nuxt-link-active {
  color: #E63946;
}

.nav-home {
  font-size: 1.5rem;
  margin-right: 2rem;
}

.container {
  max-width: 80%;
  margin: 2rem auto;
}
</style>
