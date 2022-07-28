<template>
  <button>
    <font-awesome-icon icon="fa-solid fa-plus" />
    <h1>Dodaj</h1>
  </button>
</template>

<style scoped>
button{
  font-size: 0.6rem;
  display: flex;
  align-content: center;
  justify-content: space-between;
  background-color: #EEEEEE;
  border: none;
  border-radius: 20px;
  width: 100px;
  padding: 0.3rem 1rem;
  cursor: pointer;
  transition: 0.3s all;
  border: 1px white solid;
}
button:hover{
  background-color: #cccccc;
  transform: scale(1.1);
  filter: drop-shadow(4px 4px 5px rgba(0, 0, 0, 0.15));
}
button h1{
  font-weight: 300;
}
svg{
  align-self: center;
}
</style>