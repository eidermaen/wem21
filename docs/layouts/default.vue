<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" sticky>
      <nuxt-link to="/" class="navbar-brand">Home</nuxt-link>

      <b-navbar-nav>
        <nuxt-link class="nav-link nav-item" to="about">About</nuxt-link>
        <nuxt-link class="nav-link nav-item" to="#">Exercises</nuxt-link>
      </b-navbar-nav>

    </b-navbar>

    <main class="container mt-4">
      <Nuxt/>
    </main>

    <footer>

    </footer>
  </div>
</template>

<script>
export default {}
</script>
