<template>
  <button class="back-button" @click="$emit('click')">
    <svg xmlns="http://www.w3.org/2000/svg" class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"/>
    </svg>
    <span>
        <slot></slot>
    </span>
  </button>
</template>

<script>
export default {}
</script>

<style scoped>
.back-button {
  display: flex;
  align-items: center;
  background-color: #1D3557;
  color: white;
  transition: all 200ms;
  cursor: pointer;
  border-radius: .4rem;
  border: none;
  padding: .5rem;
}

.back-button:hover {
  background-color: #457B9D;
}
</style>
