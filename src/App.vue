<template>
  <div class="wrapper">
    <the-nav></the-nav>
    <router-view></router-view>
  </div>
</template>

<script type="module">
import TheNav from './components/UI/TheNav.vue';
export default {
  components: {
    TheNav,
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600&display=swap');
* {
  scroll-behavior: smooth;
  margin: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
  text-decoration: none;
}
.wrapper{
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
