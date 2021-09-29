<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="primary" sticky>
      <b-navbar-brand href="/">Home</b-navbar-brand>

      <b-navbar-nav>
        <b-nav-item href="about">About</b-nav-item>
        <b-nav-item href="#">Exercises</b-nav-item>
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
