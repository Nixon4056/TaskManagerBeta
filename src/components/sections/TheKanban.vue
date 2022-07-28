<template>
  <add-task-modal v-if="modalIsVisible"></add-task-modal>
  <section>
    <nav>
      <add-button @click="addTaskModalHandler"></add-button>
    </nav>
    <section class="kanbanWrapper">
      <div class="column">
        <header>
          <h1>Nowe</h1>
          <div>
            <h1>{{filteredTasks('New').length}}</h1>
          </div>
        </header>
        <the-column>
          <the-task v-for="task in filteredTasks('New')" 
            :key="task.id"
            :id="task.id"
            :color="task.responsibleColor"
            :responsibleShorthand="task.responsibleInitials"
            :taskName="task.taskName"
            :description="task.description"
            :company="task.company">
          </the-task>
          <the-loading v-if="isLoading"></the-loading>
        </the-column>
      </div>
      <div class="column">
        <header>
          <h1>Przekazane</h1>
          <div>
            <h1>{{filteredTasks('Prepare').length}}</h1>
          </div>
        </header>
        <the-column>
          <the-task v-for="task in filteredTasks('Prepare')"
            :key="task.id"
            :id="task.id"
            :color="task.responsibleColor"
            :responsibleShorthand="task.responsibleInitials"
            :taskName="task.taskName"
            :description="task.description"
            :company="task.company">
          </the-task>
          <the-loading v-if="isLoading"></the-loading>
        </the-column>
      </div>
      <div class="column">
        <header>
          <h1>w Realizacji</h1>
          <div>
            <h1>{{filteredTasks('inRealize').length}}</h1>
          </div>
        </header>
        <the-column>
          <the-task v-for="task in filteredTasks('inRealize')"
            :key="task.id"
            :id="task.id"
            :color="task.responsibleColor"
            :responsibleShorthand="task.responsibleInitials"
            :taskName="task.taskName"
            :description="task.description"
            :company="task.company">
          </the-task>
          <the-loading v-if="isLoading"></the-loading>
        </the-column>
      </div>
      <div class="column">
        <header>
          <h1>Zakończone</h1>
          <div>
            <h1>{{filteredTasks('End').length}}</h1>
          </div>
        </header>
        <the-column>
          <the-task v-for="task in filteredTasks('End')"
            :key="task.id"
            :id="task.id"
            :color="task.responsibleColor"
            :responsibleShorthand="task.responsibleInitials"
            :taskName="task.taskName"
            :description="task.description"
            :company="task.company">
          </the-task>
          <the-loading v-if="isLoading"></the-loading>
        </the-column>
      </div>
    </section>
  </section>
</template>

<script>
import TheColumn from './TheColumn.vue';
import TheTask from '../layouts/TheTask.vue';
import TheLoading from '../UI/TheLoading.vue';
export default {
  components:{
    TheColumn,
    TheTask,
    TheLoading,
  },
  provide(){
    return{
      addTaskModalHandler: this.addTaskModalHandler,
      id: this.id,
      changeTaskStateRight: this.changeTaskStateRight,
      showLeftArrows: this.showLeftArrows,
      showRightArrows: this.showRightArrows,
      changeTaskStateLeft: this.changeTaskStateLeft,
    }
  },
  data() {
    return{
      isLoading: false,
      error: null,
      modalIsVisible: false,
      tasks: [],
      id: 0,
    };
  },
  methods:{
    addTaskModalHandler(){
      this.modalIsVisible = !this.modalIsVisible;
    },
    /* DATABASE HANDLERS: */
    loadTasks(){
      this.isLoading = true;
      this.error = null;
      fetch('https://serwis-planner-beta-default-rtdb.firebaseio.com/tasks.json')
      .then((response) => {
          if(response.ok){
            return response.json();
          }
        }).then((data) => {
        this.isLoading = false;
        const results = [];
        for (const id in data) {
          results.push({
            id: id,
            taskName: data[id].name,
            company: data[id].company,
            date: data[id].date,
            description: data[id].description,
            responsible: data[id].responsibleName,
            responsibleColor: data[id].responsibleColor,
            responsibleInitials: data[id].responsibleInitials,
            taskState: data[id].taskState,
          });
        }
        this.tasks = results;
      }).catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.error = 'failed to fetch data!';
      });
    },
    filteredTasks(state){
      return this.tasks.filter((task) => {
        return task.taskState.match(state);
      });
    },
    changeTaskStateRight(taskId){
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      const task = this.tasks[taskIndex];
      if(task.taskState === 'New'){
        task.taskState = 'Prepare';
      }else if(task.taskState === 'Prepare'){
        task.taskState = 'inRealize';
      }else if(task.taskState === 'inRealize'){
        task.taskState = 'End';
      }
    },
    changeTaskStateLeft(taskId){
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      const task = this.tasks[taskIndex];
      if(task.taskState === 'End'){
        task.taskState = 'inRealize';
      }else if(task.taskState === 'Prepare'){
        task.taskState = 'New';
      }else if(task.taskState === 'inRealize'){
        task.taskState = 'Prepare';
      }
    },
    showLeftArrows(taskId){
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      const task = this.tasks[taskIndex];
      if(task.taskState === 'New'){
        return false;
      }else{
        return true;
      }
    },
    showRightArrows(taskId){
      const taskIndex = this.tasks.findIndex(task => task.id === taskId);
      const task = this.tasks[taskIndex];
      if(task.taskState === 'End'){
        return false;
      }else{
        return true;
      }
    },
    countId(){
      console.log(this.tasks)
    }
  },
  mounted() {
    this.loadTasks();
  },
}
</script>

<style scoped>
* {
  overflow-x: hidden;
}
section{
  width: 100%;
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
.kanbanWrapper{
  width: 100%;
  height: calc(100vh - 50px);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  background-color: #EEEEEE;
}
.column{
  width: 100%;
  height: 100%;
  background-color: transparent;
  border-right: 1px white solid;
  overflow-x: visible;
}
.column header{
  background-color: white;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 2rem;
  font-size: 0.6rem;
  margin-bottom: 0.5rem;
  overflow-x: hidden;
}
.column header h1{
  font-weight: 300;
}
.column header div{
  background-color: #EEEEEE;
  width: 2.3rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
}

</style>