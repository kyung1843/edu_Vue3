// vue프로젝트 생성시 npm install 형태로 vue 라이브러리들이 설치되고  node-modules 안에 들어가게됨
// node-modules의 라이브러리 package.json파일 dependencies에 선언됨
// import {여기서 사용할 이름}   from '라이브러리 이름'
import { createApp } from 'vue'

// vue 파일
import App from './App.vue'

//인스턴스 삽입
createApp(App).mount('#app')
