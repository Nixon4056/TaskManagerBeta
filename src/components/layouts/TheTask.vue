<template>
  <div class="taskContainer"> 
    <div class="logo-name-container">
      <div :style="{'background-color': color}" class="responsible-logo"><h1>{{ responsibleShorthand }}</h1></div>
      <div class="name">
        <h1>{{ id }}/USL/22/07</h1>
        <h2>{{ taskName }}</h2>
      </div>
    </div>
    <div class="description">
      <h1>Opis zlecenia:</h1>
      <h2>{{ description }}</h2>
    </div>
    <div class="company-container">
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="icon-park-outline:city-one">
        <g id="Group">
        <path id="Vector" d="M4 42H44" stroke="#6BA2E3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        <path id="Vector_2" d="M18 22H10C8.89543 22 8 22.8954 8 24V40C8 41.1046 8.89543 42 10 42H18C19.1046 42 20 41.1046 20 40V24C20 22.8954 19.1046 22 18 22Z" stroke="#6BA2E3" stroke-width="4" stroke-linejoin="round"/>
        <path id="Vector_3" d="M38 4H22C20.8954 4 20 4.89543 20 6V40C20 41.1046 20.8954 42 22 42H38C39.1046 42 40 41.1046 40 40V6C40 4.89543 39.1046 4 38 4Z" stroke="#6BA2E3" stroke-width="4" stroke-linejoin="round"/>
        <path id="Vector_4" d="M28 32.008H32M12 32.008H16M28 23.008H32M28 14.008H32" stroke="#6BA2E3" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
        </g>
        </g>
      </svg>
      <h1>{{ company }}</h1>
    </div>
    <svg  
      v-if="showRightArrows(id)"
      @click="changeTaskStateRight(id)"
      class="StateRightButton" width="68" height="51" viewBox="0 0 68 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="StateRightButton">
      <path id="polygon1" d="M68 25.5L29.75 47.5836L29.75 3.41635L68 25.5Z" fill="#D9D9D9" fill-opacity="0.47"/>
      <path id="polygon2" d="M51 25.5L12.75 47.5836L12.75 3.41635L51 25.5Z" fill="#D9D9D9" fill-opacity="0.74"/>
      </g>
    </svg>
    <svg 
      v-if="showLeftArrows(id)" 
      @click="changeTaskStateLeft(id)"
      class="StateLeftButton" width="68" height="51" viewBox="0 0 68 51" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="StateLeftButton">
      <path id="polygon3" d="M1.11464e-06 25.5L38.25 3.41635L38.25 47.5836L1.11464e-06 25.5Z" fill="#D9D9D9" fill-opacity="0.47"/>
      <path id="polygon4" d="M17 25.5L55.25 3.41635L55.25 47.5836L17 25.5Z" fill="#D9D9D9" fill-opacity="0.74"/>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  props: ['responsibleShorthand','id', 'taskName', 'description', 'company', 'color'],
  inject: ['changeTaskStateRight', 'changeTaskStateLeft', 'showLeftArrows', 'showRightArrows'],
}
</script>

<style scoped>
.taskContainer{
  margin-bottom: 0.4rem;
  padding: 0 0.5rem;
  width: 100%;
  height: auto;
  background-color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: flex-start;
  justify-content: left;
  flex-direction: column;
  border-radius: 5px;
  position: relative;
  overflow-x: visible;
  transition: 1s all;
}
.StateRightButton{
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0px;
  right: 10px;
  cursor: pointer;
  overflow: visible;
}
.StateLeftButton{
  position: absolute;
  width: 50px;
  height: 50px;
  top: 0px;
  right: 50px;
  cursor: pointer;
  overflow: visible;
}
#polygon1,
#polygon3{
  transition: 1s all;
}
#polygon2,
#polygon4{
  transition: 0.3s all;
}
.StateRightButton:hover #polygon1,
.StateRightButton:hover #polygon2{
  transform: translateX(10px);
}
.StateLeftButton:hover #polygon3,
.StateLeftButton:hover #polygon4{
  transform: translateX(-10px);
}

.logo-name-container{
  display: flex;
  align-content: center;
  justify-content: left;
}
.responsible-logo{
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #963E3E;
  align-self: center;
  display: flex;
  align-content: center;
  justify-content: center;
}
.responsible-logo h1{
  align-self: center;
  color: white;
  text-align: center;
  font-size: 0.8rem;
  font-weight: 400;
}
.responsible-logo,
.name{
  margin: 0.2rem 0.3rem;
}
.name h1{
  font-weight: 400;
  font-size: 0.9rem;
}
.name h2{
  font-weight: 300;
  font-size: 0.8rem;
  max-width: 250px;
  overflow: hidden;
  white-space:nowrap;
}

.description{
  display: flex;
  align-content: center;
  justify-content: left;
}
.description h1{
  font-size: 0.8rem;
  font-weight: 400;
  white-space:nowrap;
}
.description h1,
.description h2{
  margin: 0.1rem 0.3rem;
}
.description h2{
  font-size: 0.8rem;
  font-weight: 300;
  max-width: 250px;
  overflow: hidden;
  white-space:nowrap;
}
.company-container{
  color: #6BA2E3;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;
}
.company-container:hover > h1{
  text-decoration: underline;
}
.company-container svg{
  width: 20px;
  height: 20px;
}
.company-container h1{
  max-width: 250px;
  overflow: hidden;
  white-space:nowrap;
  transition: 0.3s all;
}
.company-container svg,
.company-container h1 {
  margin: 0.1rem 0.3rem;
  font-size: 0.9rem;
}
</style>