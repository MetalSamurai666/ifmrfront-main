import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import App from './App.vue'
import router from './router'
import VueCookies from 'vue-cookies'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

import VueSplide from '@splidejs/vue-splide'
import '@splidejs/vue-splide/css'

// global components
import PhotoUploadeer from '@/components/usefull/photo-uploader.vue'

import ru from './lang/ru'
import uz from './lang/uz'
import en from './lang/en'

const i18n = createI18n({
  legacy: false,
  locale: 'ru',
  detectBrowserLanguage: false,
  strategy: 'prefix',
  fallbackLocale: 'ru',
  messages: {
    ru,
    uz,
    en
  }
})

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(VueCookies, { expires: '7d' })
app.use(createPinia())
app.component('PhotoUploader', PhotoUploadeer)
app.component('QuillEditor', QuillEditor)
app.use(i18n)
app.use(VueSplide)
app.use(router)
app.use(ElementPlus)
app.mount('#app')
