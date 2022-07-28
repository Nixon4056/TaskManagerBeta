<template>
  <div>
    <ul>
      <slot></slot>
    </ul>
  </div>
</template>

<style scoped>
div{
  transition: 0.3s all;
}
ul{
  width: 100%;
  padding-left: 0rem;
  border: 2px white solid;
  background-color: #EEEEEE;
  height: auto;
  display: flex;
  align-items: flex-start;
  justify-content: left;
  flex-direction: column;
  list-style: none;
  transition: 0.3s all;
  position: absolute;
}
</style>