<template>
  <section class="CalendarWrapper">
    <nav>
      <add-button></add-button>
    </nav>
    <h1>KALENDARZ</h1>
  </section>  
</template>

<script>
export default {
  
}
</script>

<style scoped>
.CalendarWrapper{
  width: 100%;
  height: 100vh;
}
nav{
  padding: 10px 2rem;
  border-bottom: 1px solid #EEEEEE;
  width: calc(100% - 80px);
  height: 50px;
  top: 0;
  left: 80px;
  background-color: white;
}

</style>