<template>
  <nav>
    <add-button @click="addTaskModalHandler"></add-button>
  </nav>
</template>

<script>
export default {
  inject:['addTaskModalHandler'],
}
</script>

<style scoped>
nav{
  position: fixed;
  padding: 10px 2rem;
  border-bottom: 1px solid #EEEEEE;
  width: calc(100% - 80px);
  height: 50px;
  top: 0;
  left: 80px;
  background-color: white;
}
</style>