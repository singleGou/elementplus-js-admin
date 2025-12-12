import { createApp } from 'vue'
import App from './App.vue'

// global css
import './styles/index.scss'

// store
import { createPinia } from 'pinia'

// router
import router from './router'

// icons
import 'virtual:svg-icons-register' // vite-plugin-svg-icons 插件注册，生成雪碧图并注入 DOM，不引入会导致 svg 图标无法正常显示
import SvgIcon from './components/SvgIcon.vue'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.component('SvgIcon', SvgIcon)
app.mount('#app')
