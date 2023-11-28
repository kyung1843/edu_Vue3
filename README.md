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


https://joshua1988.github.io/vue-camp/

https://github.com/joshua1988/learn-vue-js.git
