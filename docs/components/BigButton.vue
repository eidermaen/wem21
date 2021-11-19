<template>
  <button class="button" @click="$emit('click')">
    <slot />
  </button>
</template>

<script>
export default {

}
</script>

<style scoped>
.button {
  padding: 2rem;
  border: none;
  border-radius: .4rem;
  background-color: #146746;
  color: white;
  font-weight: bold;
  cursor: pointer;
  font-size: larger;
  transition: all 200ms;
  width: 90%;
}

.button:hover {
  background-color: #26C485;
}
</style>
