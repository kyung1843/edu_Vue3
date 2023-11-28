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
  
  }).mount('#app')
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
### 인스턴스 옵션

