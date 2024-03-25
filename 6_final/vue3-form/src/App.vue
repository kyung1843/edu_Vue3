<template>
  <form action="" @submit.prevent="submitForm"> 
    <!-- form내에서 submit 이벤트가 동작했을경우 submitForm이라는 메소드로 제어하겠다. -->
    <!-- @이벤트.prevent 하면 이벤트 기본동작 막기 가능  -->
    <div>
      <label for="userId">ID:</label>
      <input id="userId" type="text" v-model="username">
    </div>
    <div>
      <label for="password">PW:</label>
      <input type="text" v-model="password">
    </div>
    <button type="submit">로그인</button>
  </form>
</template>

<script>
  import axios from 'axios'
  import { ref } from 'vue';  

  export default {
  /*
  //1. 인스턴스 옵션 API로 작성
  data() {
    return {
      username : '',
      password : '',
     }
   },
   methods: {
     submitForm() {
       // event.preventDefault();
       console.log('제출됨')
       //jsonplaceholder fakeAPI 사용 
       const data = {
         username : this.username,
         password : this.password,
       }
       axios.post('https://jsonplaceholder.typicode.com/users/', data)
       .then(response => {
         console.log(response);
       })
     }
   }
   */
  
    /*2. 인스턴스API 사용한 코드를  setupAPI로 작성한 코드
        : 모듈화할 경우 훨씬 좋은 코드
    */
    setup(){
      //data
      var username = ref('');
      var password = ref('');
      //methods
      var submitForm = () => {
        axios.post('https://jsonplaceholder.typicode.com/users/',{
          username : username.value,
          password : password.value
        }).then(response => {
          console.log(response);
        })
      }
      return {username, password, submitForm}
    },

  }
</script>

<style scoped>

</style>