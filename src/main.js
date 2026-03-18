import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/styles/variables.css'
import './assets/styles/global.css'
import './style.css'

const app = createApp(App)

app.use(router)
app.mount('#app')

// 设置默认主题
document.documentElement.setAttribute('data-theme', 'dark')
