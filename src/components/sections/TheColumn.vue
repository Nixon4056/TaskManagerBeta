<template>
  <div class="flexColumn">
    <slot></slot>
  </div>
</template>

<script>

</script>

<style scoped>
.flexColumn{
  padding: 0 0.5rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  overflow-y: hidden;
  transition: 0.3s all;
}
</style>