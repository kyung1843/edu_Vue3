<!-- vue vscode snippets 설치후 vbc + tab 하면 자동으로 sfc 구조 생성됨  -->
<template>
  <div>
    <app-header></app-header>
    <div>
      {{ msg }}
    </div>
    <button @click="showAlert"> 경고 </button>
  </div>
</template>

<script>

import AppHeader from './components/AppHeader.vue'

  export default {
    // vda + tab => data옵션 자동생성
    components :{
      /*
      컴포넌츠 이름과 내용객체가 같은 경우 다음과 같이 사용가능
        1. 'AppHeader' : AppHeader
          또는
        2. 'app-header' : AppHeader
          또는
        AppHeader  
      */ 
      AppHeader
    },
    data() {
      return {
        msg: 'hi'
      }
    },
    methods :{
      showAlert(){
        alert('hello');
      }
    }
  }
</script>

<style scoped>

</style>
