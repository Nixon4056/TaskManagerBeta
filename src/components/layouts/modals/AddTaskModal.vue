<template>
  <base-modal>
    <div class="inputGroup">
      <label for="date">Data Wykonania</label>
      <date-picker 
        id="auto" 
        name="date" 
        v-model="date" 
        range locale="pl" 
        ></date-picker>
    </div>
    <div class="inputGroup">
      <label for="taskName">Nazwa zlecenia</label>
      <input 
        :class="{invalid: nameValidity === 'invalid'}" 
        type="text" name="taskName" 
        v-model.trim="taskName" 
        @blur="validateName">
      <p class="invalid invalidText" v-if="nameValidity === 'invalid'">Wprowadz nazwe zlecenia!</p>
    </div>
    <div class="inputGroup">
      <label for="responsible">Odpowiedzialny</label>
      <select name="responsible" id="responsible" 
        :class="{invalid: responsibleValidity === 'invalid'}" 
        v-model="responsible.name"
        @blur="validateResponsible">
        <option v-for="user in users" :key="user.id" :value="user.name">{{ user.name }}</option>
      </select>
      <p class="invalid invalidText" v-if="responsibleValidity === 'invalid'">Wprowadz pracownika!</p>
    </div>
    <div class="inputGroupSwitch">
      <h1>Dla Firmy</h1>
      <svg @click="switchCustomer" id="switch" width="53" height="28" viewBox="0 0 53 28" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="53" height="28" rx="14" fill="white"/>
        <circle id="switchCircle" cx="14" cy="14" r="11" fill="#EEEEEE"/>
      </svg>
      <h1>Indywidualnie</h1>
    </div>
    <div class="inputGroup">
      <label for="company">{{ isCompany ? 'Firma' : 'Imie i Nazwisko' }}</label>
      <input name="company" 
        v-model="searchCompany" 
        autocomplete="off"
        :class="{invalid: companyValidity === 'invalid'}">
      <transition name="fade">
        <the-search-box 
          v-if="searchCompany && !checkEqualityOfInput">
          <li 
            @click="choseCompany(company.name)" 
            v-for="company in filterCompanies" 
            :key="company.id"
            >{{ company.name }}</li>
        </the-search-box>
      </transition>
      <p class="invalid invalidText" v-if="companyValidity === 'invalid'">Wprowadz Klienta!</p>
    </div>
    <div class="inputGroup">
      <label for="description">Opis</label>
      <textarea name="description" id="" cols="30" rows="10" v-model="description"></textarea>
    </div>
    <div class="inputGroupButton">
      <add-button @click="addTaskToDB"></add-button>
    </div>
  </base-modal>
</template>

<script>
import DatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import { ref } from 'vue';

export default {
  setup() {
    const date = ref();
        
    return {
        date,
    }
  },
  inject:['addTaskModalHandler'],
  components:{
    DatePicker,
  },
  data(){
    return{
      
      /* Temporary vars: */
      users: [],
      companies: [],
      isCompany: true,
      isLoading: false,
      error: null,
      searchCompany: '',
      companyChosen: false,
      invalidInput: false,
      id: 0,

      /* Properties of task: */
      taskName: '',
      responsible: {
        name: '',
        color: '',
        initials: ''
      },
      company: '',
      description: '',
      taskState: 'New',
      /* DatePicker Values: */
      /* VALIDATION*/
      nameValidity: 'pending',
      responsibleValidity: 'pending',
      companyValidity: 'pending',
    };
  },
  methods:{
    switchCustomer(){
      this.isCompany = !this.isCompany;
      this.company = '';
      const switchCircle = document.getElementById('switchCircle');
      if(!this.isCompany){
        switchCircle.style.transform = 'translateX(25px)';
      }
      else{
        switchCircle.style.transform = 'translateX(0px)';
      }
    },
    choseCompany(companyName){
      this.company = companyName;
      this.searchCompany = this.company;
    },
    /* Database Handlers */
    /* POBIERZ USERSÓW */
    loadUsers(){
      this.isLoading = true;
      this.error = null;
      fetch('https://serwis-planner-beta-default-rtdb.firebaseio.com/users.json')
      .then((response) => {
          if(response.ok){
            return response.json();
          }
        }
      )
      .then((data) => {
        this.isLoading = false;
        const results = [];
        for (const id in data) {
          results.push({
            name: data[id].username,
            color: data[id].color,
            initials: data[id].initials,
          });
        }
        this.users = results;
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.error = 'failed to fetch data!';
      });
    },
    /* POBIERZ FIRMY */
    loadCompanies(){
      this.isLoading = true;
      this.error = null;
      fetch('https://serwis-planner-beta-default-rtdb.firebaseio.com/companies.json')
      .then((response) => {
          if(response.ok){
            return response.json();
          }
        }
      )
      .then((data) => {
        this.isLoading = false;
        const results = [];
        for (const id in data) {
          results.push({
            name: data[id].name
          });
        }
        this.companies = results;
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.error = 'failed to fetch data!';
      });
    },
    /* DODAJ TASK */
    addTaskToDB(){
      this.validateName();
      this.validateResponsible();
      this.validateCompany();
      if (this.taskName === '' || this.responsible.name === '' || this.company === '') {
        this.invalidInput = true;
        return;
      }
      this.invalidInput = false;

      this.error = null;
      fetch('https://serwis-planner-beta-default-rtdb.firebaseio.com/tasks.json', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          id: this.id,
          date: this.date,
          name: this.taskName,
          responsibleName: this.responsible.name,
          responsibleColor: this.userFinder()[0].color,
          responsibleInitials: this.userFinder()[0].initials,
          company: this.company,
          description: this.description,
          taskState: this.taskState,
        }),
      })
      .then(response => {
        if(response.ok){
          console.log('response ok!')
        }else{
          throw new Error('Could not save data!');
        }
      }).catch(error =>{
        console.log(error);
        this.error = error.message;
      });
      this.addTaskModalHandler();
      /* console.log(this.colorFinder());  */
    },
    countId(){
      this.isLoading = true;
      this.error = null;
      fetch('https://serwis-planner-beta-default-rtdb.firebaseio.com/tasks.json')
      .then((response) => {
          if(response.ok){
            return response.json();
          }
        }
      )
      .then((data) => {
        this.isLoading = false;
        const results = [];
        for (const id in data) {
          results.push({
            index: data[id].id,
          });
        }
        this.id = results[results.length - 1].index + 1;
      })
      .catch((error) => {
        console.log(error);
        this.isLoading = false;
        this.error = 'failed to fetch ID!';
      });
    },
    /* BASIC METHODS */
    userFinder(){
      return this.users.filter((user) => {
        return user.name.match(this.responsible.name);
      });
    },
    validateName(){
      if(this.taskName === ''){
        this.nameValidity = 'invalid';
      }else{
        this.nameValidity = 'valid';
      }
    },
    validateResponsible(){
      if(this.responsible === ''){
        this.responsibleValidity = 'invalid';
      }else{
        this.responsibleValidity = 'valid';
      }
    },
    validateCompany(){
      if(this.company === ''){
        this.companyValidity = 'invalid';
      }else{
        this.companyValidity = 'valid';
      }
    },
  },

  computed:{
    filterCompanies(){
      return this.companies.filter((company) => {
        return company.name.toUpperCase().match(this.searchCompany.toUpperCase());
      });
    },
    checkEqualityOfInput(){
      if(this.searchCompany === this.company){
        return true;
      }else{
        return false;
      }
    }
  },
  mounted() {
    this.loadUsers();
    this.loadCompanies();
    this.countId();
  }
}
</script>

<style scoped>
.inputGroup{
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: auto;
  margin: 0.2rem;
  padding: 0 0.7rem;
}
.inputGroupButton{
  display: flex;
  align-content: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 5rem;
  margin: 0.2rem;
  padding: 0 0.7rem;
}
label{
  margin-left: 1rem;
}
input,
select{
  height: 2.2rem;
  border: 2px white solid;
  background-color: transparent !important;
}
textarea{
  border: 2px white solid;
  background-color: transparent;
  max-width: 100%;
  max-height: 400px;
  min-height: 100px;
}
select{
  cursor: pointer;
  /* -moz-appearance:none; 
  -webkit-appearance:none; 
  appearance:none; */
}
option{
  border: 1px white solid;
}

.inputGroupSwitch{
  margin: 1rem;
  margin-bottom: 0;
  padding: 0 6rem;
  width: 100%;
  height: auto;
  display: flex;
  align-content: center;
  justify-content: space-around;
}
.inputGroupSwitch h1{
  font-size: 1rem;
  font-weight: 400;
}
#switch{
  cursor: pointer;
  
}
#switchCircle{
  transition: 0.2s all;
}
li{
  cursor: pointer;
  transition: 0.3s all;
  width: 100%;
  padding: 0 1rem;
}
li:hover{
  background-color: #cccccc;
}

/* ANIMATIONS */
.fade-enter-from{
  transform: scaleY(0%);
  opacity: 0;
}
.fade-enter-to{
  transform: scaleY(100%);
  opacity: 1;
}
.fade-enter-active{
  transition: 0.3s all;
}

/* DYNAMIC STYLES */
.invalid{
  border-color: red;
}
.invalidText{
  font-size: 0.7rem;
  color: red;
}
</style>
