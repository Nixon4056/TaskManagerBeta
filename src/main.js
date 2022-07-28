/* Set up using Vue 3 */
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

/* FontAwesome */
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faUser, faCirclePlus, faXmark, faPlus)

/* DatePicker */
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

/* Custom Components */
import AddButton from './components/UI/addButton.vue';
import BaseModal from './components/UI/BaseModal.vue';
import AddTaskModal from './components/layouts/modals/AddTaskModal.vue';
import CloseButton from './components/UI/CloseButton.vue';
import TheSearchBox from './components/UI/TheSearchBox.vue';
import TheKanban from './components/sections/TheKanban.vue';
import TheCalendar from './components/sections/TheCalendar.vue';

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon); /* FontAwesome */
app.component('date-picker', Datepicker); /* DatePicker */

/* Components */
app.component('add-button', AddButton);
app.component('base-modal', BaseModal);
app.component('add-task-modal', AddTaskModal);
app.component('close-button', CloseButton);
app.component('the-search-box', TheSearchBox);

/* Router */
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {path: '/Kanban', component: TheKanban},
    {path: '/Calendar', component: TheCalendar},
  ]
});

app.use(router);
app.mount('#app');




/* const users = [
  {
    username: 'Nikodem Wicon'
  },
  {
    username: 'Mateusz Koszałka'
  },
  {
    username: 'Mariusz Moszczyński'
  },
  {
    username: 'Dawid Necel'
  },
]; */

/* const postUser = function() {
  fetch('https://serwis-planner-beta-default-rtdb.firebaseio.com/users.json', {
  method: 'POST',
  headers: {
    'Content-type': 'application/json'
  },
  body: JSON.stringify({
    username: 'Dawid Necel'
  }),
})
}
 */



/* const addCompanies = function(){
fetch('https://serwis-planner-beta-default-rtdb.firebaseio.com/companies.json', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      name: 'PIW Gdynia',
    }),
  })
}; */

