# Vue3
- TypeScript 기반 라이브러리 로직
- vetur(vue2 플러그인) -> volar(vue3 플러그인)
- webPack -> Vite 기반 프로젝트 생성
[vue2 공식문서](https://ko.vuejs.org/guide/introduction.html)
[vue3 공식문서](https://v3-docs.vuejs-korea.org/guide/introduction.html)

## 코드 작성 방법
1. Options API : 초심자 추천
```vue
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp } = Vue

  createApp({
    data() {
      return {
        message: 'Hello Vue!'
      }
    }
  }).mount('#app')
</script>
```
2. Composition API 
```vue
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<div id="app">{{ message }}</div>

<script>
  const { createApp, ref } = Vue

  createApp({
    setup() {
      const message = ref('Hello vue!')
      return {
        message
      }
    }
  }).mount('#app')
</script>
```
## 개발환경 구성
- vscode
- node.js Lts 설치 
- cmder 설치(cmd 명령어가 잘 안먹는 경우)
- 플러그인
  - vue vscode snippets
  - live server
  - material icon theme
  - night owl
  - volar
- vue.js devtools 플러그인
![화면 캡처 2023-11-28 085929](https://github.com/kyung1843/Vue3/assets/149764469/c10e2330-00e4-4779-9d76-dabb7860d6f7)

(강의교안)[https://joshua1988.github.io/vue-camp/]

(Repository)[https://github.com/joshua1988/learn-vue-js.git]
## helloWorld 출력
```vue
<!-- vue 라이브러리 사용위한 cdn -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<div id="app">
  {{message}}
</div>
<script>
  Vue.createApp({ //인스턴스 생성
    data(){
      return {
        message : 'helloWorld!!'
      }
    }
  }).mount('#app'); //id가 app인 dom에 생성한 인스턴스를 붙이겠다.
</script>
```
## 기본 동작 원리 reactivity 
객체의 내용 변화에 따라 화면의 내용 변경되는 것

(vue 공식문서 Reactivity)[https://v2.vuejs.org/v2/guide/reactivity.html]
- vue2의 Object.defineProperty(){} 의 경우 사용하려는 속성이 모두 정의 되어 있어야 하는 한계가 있어 Proxy 사용
- proxy api 사용 : 객체에 대한 기본 작업을 가로채고 재정의
(Proxy_API doc)[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Proxy/Proxy]

```vue
<div id="app"></div>
<script>
    //객체 생성
    var data = {
        message : 10
    }

    //화면 변화 주기 위한 render 함수
    function render (sth){
        const div = document.querySelector('#app');
        div.innerHTML = sth;
    }

    //Proxy api: 객체에 대한 기본 작업을 가로채고 재정의
    //data객체를 모방 후 동작  추가
    var app = new Proxy(data, {
       //data 동작 정의하는 인자 get/set
       get() {
        console.log('값 접근');
       }, 
       set(target, prop, newValue){
        //객체의 속성값에 새로운 값 넣어준다.
        target[prop] = newValue;
        render(newValue);
        console.log('값 갱신');
       }
    })
    //app.message = newValue; 새로운 값을 지정해주면 '값 갱신'
</script>
```
## 인스턴스
- vue는 어플리케이션 인스턴스를 작성해 인스턴스를 적용할 화면영역을 정해서 사용
### 인스턴스 작성
- vue2
```vue
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
new Vue({
    el: '#app'
  })
</script>
```
```vue
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
new Vue({
  
  }).$mount('#app')
</script>
```
- vue3
```vue
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
<script>
Vue.createApp({
    data() {
      return {
        message: 'hi'
      }
    }
  }).mount('#app');
</script>
```
### 인스턴스(컴포넌트) 옵션속성
- vue2
```vue
<script>
  new Vue({
  el: ,
  template: ,
  data: ,
  methods: ,
  created: ,
  watch: ,
});
</script>
```
-vue3
```vue
<컴포넌트명></컴포넌트명>  <!-- componenets 사용 -->
<script>
Vue.createApp({
  components : {
   '컴포넌트명' : 컴포넌트 내용,
   '컴포넌트명' : {template : '<h1>컴포넌트 등록</h1>'}
  },
  template: ,  // 화면에 표시할 요소
  data: ,      // 데이터
  methods: ,   // 화면 동작/ 이벤트 제어
  created: ,   // 라이프사이클 관련 속성
  watch: ,     // data에서 정의한 속성 변화시 추가동작 정의
}).mount();
//vue2에서 el에 선언했던 것을 mount에 선언하게 바뀜
</script>
```
## v-디렉티브
- v-for
  ```vue
  <!-- HTML -->
    <div id="app">
    <ul>
      <li v-for="item in items">
        {{ item }}
      </li>
    </ul> 
  </div>
  <!-- JavaScript -->
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    Vue.createApp({
      data() {
        return {
          items: ['삼성', '네이버', '인프런']
        }
      },
    }).mount('#app');
  </script>
  ```
  ## 컴포넌트 통신방식
  - 상위(부모) => 하위(자식)  : props
  ```vue
  <div id="app">
  <!-- <app-header v-bind:프롭스이름="상위컴포넌트의 데이터이름"></app-header> -->
  <app-header v-bind:title="appTitle"></app-header>
  </div>
  
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
  Vue.createApp({
    data() {
      return {
        appTitle: '프롭스 넘기기'
      }
    },
    components: {
      'app-header': {
        template: '<h1>{{ title }}</h1>',
        props: ['title']
      }
    },
  }).mount('#app');
  </script>
  ```
  - 하위(자식) => 상위(하위)  : $emit('event')
 
  - 동일 컴포넌트 간 통신 : event로  상위 root 컴포넌트로 올려서 props로 바뀐 데이터를 하위로 내리는 형식
  ```vue
  <!-- HTML -->
  <div id="app">
    <app-header v-bind:app-title="message"></app-header>
    <app-contents v-on:login="receive"></app-contents>
  </div>
  <!-- JavaScript --> 
  <script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>
  <script>
    var appHeader = {
      props: ['appTitle'],
      template: '<h1>{{ appTitle }}</h1>',
    }

    var appContents = {
      template: `
        <p>
          <button @click="sendEvent">로그인</button>
        </p>
      `,
      methods: {
        sendEvent() {
          this.$emit('login');
        }
      }
    }
    // 루트 컴포넌트
    Vue.createApp({
      data() {
        return {
          message: '로그인 하셈'
        }
      },
      methods: {
        receive() {
          console.log('받았다');
          this.message = '로그인 됨'
        }
      },
      components: {
        // '컴포넌트 이름': 컴포넌트 내용
        'app-header': appHeader,
        'app-contents': appContents
      }  
    }).mount('#app');
  </script>
  ```
  ## vue 프로젝트 생성(vue/cli)
  [https://www.notion.so/a49345942f5242b9b1ae6f51bb5a64ff]
  
    
  ## vue/cli 프로젝트 구조
  - package.json
  ```json
  {
    "name": "vue3-form",
    "version": "0.1.0",
    "private": true,
  
    //vue프로젝트와 관련된 명령어 커스텀
    "scripts": {
      "serve": "vue-cli-service serve",
      "build": "vue-cli-service build",
      "lint": "vue-cli-service lint"
    },
    //프로젝트 라이브러리
    "dependencies": {
      "axios": "^1.5.0",
      "core-js": "^3.8.3",
      "vue": "^3.2.13"
    },
    //개발 위한 부수적 라이브러리
    "devDependencies": {
      "@babel/core": "^7.12.16",
      "@babel/eslint-parser": "^7.12.16",
      "@vue/cli-plugin-babel": "~5.0.0",
      "@vue/cli-plugin-eslint": "~5.0.0",
      "@vue/cli-service": "~5.0.0",
      "eslint": "^7.32.0",
      "eslint-plugin-vue": "^8.0.3"
    },
    // 자바스크립트 문법 검사 도구 
    "eslintConfig": {
      "root": true,
      "env": {
        "node": true
      },
      "extends": [
        "plugin:vue/vue3-essential",
        "eslint:recommended"
      ],
      "parserOptions": {
        "parser": "@babel/eslint-parser"
      },
      "rules": {}
    },
    // 브라우저 혼합성 관련 설정
    "browserslist": [
      "> 1%",
      "last 2 versions",
      "not dead",
      "not ie 11"
    ]
  }
  ```
  - vue.config.js
    - vue/cli-service 관련 내용
    - 웹팩 설정 옵선
    ```js
    const { defineConfig } = require('@vue/cli-service')
      module.exports = defineConfig({
      transpileDependencies: true
    })
    ```
  - index.html
    - 서버 연결시 뜨는 vue-cli로 main.js에서 빌드된 결과물이 뜨는 시작 페이지
    ```html
    <!DOCTYPE html>
    <html lang="">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width,initial-scale=1.0">
        <link rel="icon" href="<%= BASE_URL %>favicon.ico">
        <title><%= htmlWebpackPlugin.options.title %></title>
      </head>
      <body>
        <noscript>
          <strong>We're sorry but <%= htmlWebpackPlugin.options.title %> doesn't work properly without JavaScript enabled.     Please enable it to continue.</strong>
        </noscript>
        <!-- localhost:8080 접근시 뜨는 페이지 -->
        <div id="app">
          <!-- 이 안에 표시되는 결과물이 vue cli로 빌드된 결과물 -->
        </div>
      </body>
    </html>
    ```
  - main.js
  ```js
  // vue프로젝트 생성시 npm install 형태로 vue 라이브러리들이 설치되고  node-modules 안에 들어가게됨
  // node-modules의 라이브러리 package.json파일 dependencies에 선언됨
  // import {여기서 사용할 이름}   from '라이브러리 이름'
  import { createApp } from 'vue'

  // vue 파일
  import App from './App.vue'

  //인스턴스 삽입
  createApp(App).mount('#app')
  ```
  ## SingleFileComponent
  .vue 확장자를 가진 모든 파일
  html, css, js코드를 한 파일에서 관리
  뷰로더(vue컴포넌트를 자바스크립트로 변환하는 webpack 로더)에 의해 분리실행
  - vue vscode snippets 익스텐션 설치
    - vbc + tab -> sfc구조 자동생성
    - vda + tab -> data옵션 자동생성
  ```html
  <!-- html요소 -->
  <template>
  <div>
  </div>
  </template>
   <!-- js -->
  <script>
    export default {
      data() {
        return {
          key: value
        }
      },
    }
  </script>
  <!-- css -->
  <style lang="scss" scoped>
  </style>
  ```
  
