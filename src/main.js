import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import VueSplide from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'


const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(VueCookies, { expires: '7d' })
app.use(createPinia())
app.use(VueSplide)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
