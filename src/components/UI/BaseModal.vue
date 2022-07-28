<template>
  <div class="wrapper">
    <div class="modal">
      <header>
        <h1>Dodaj zlecenia</h1>
        <close-button @click="addTaskModalHandler"></close-button>
      </header>
      <slot>

      </slot>
    </div>
  </div>
</template>

<script>
export default {
  inject:['addTaskModalHandler'],
}
</script>

<style scoped>
.wrapper{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
.modal{
  position: fixed;
  width: 500px;
  height: 80%;
  left: calc(50% - 250px);
  top: calc(10%);
  background-color: #EEEEEE;
  border: 4px white solid;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  animation: slideUp 0.5s forwards;
}
@keyframes slideUp {
  0%{
    transform: translateY(200px);
    opacity: 0;
  }
  100%{
    transform: translateY(0px);
    opacity: 1;
  }
}
header{
  position: absolute;
  width: 100%;
  top: 0;
  display: flex;
  align-content: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  background-color: #ffffff;
}
header h1{
  font-size: 1rem;
  font-weight: 300;
  align-self: center;
}
</style>