<template>
  <div class="container">
    <h1>Vue components</h1>

    <div class="content">
      <CustomMenu class="top-nav">
        <MenuItem to="start">
          Start
        </MenuItem>
        <MenuItem to="about">
          About
        </MenuItem>
      </CustomMenu>

      <CustomMenu vertical>
        <MenuItem to="test">
          Test
        </MenuItem>
        <MenuItem to="another">
          Another entry
        </MenuItem>
      </CustomMenu>

    </div>
  </div>
</template>

<script setup>

import CustomMenu from './components/CustomMenu.vue';
import MenuItem from './components/MenuItem.vue';</script>

<style scoped>
.container {
  max-width: 75%;
  margin: 2rem auto;
}

.content {
  display: grid;
  grid-template-columns: auto 1fr;
}

.top-nav {
  grid-column: span 2;
  margin-bottom: 2rem;
}
</style>
