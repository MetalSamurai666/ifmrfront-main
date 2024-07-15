<script setup>
import { onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
import cookies from 'vue-cookies'
import { useRouter } from 'vue-router'

const sideState = ref(false)

function setDefaultLocale(lang) {
  // console.log(lang);
  currentLang.value = lang
  cookies.set('sitelocal', lang)
  locale.value = lang
}

function doMenu(i) {
  sideState.value = i
}

const currentLang = ref('ru')

const router = useRouter()
const routeTo = (url) => {
  router.push(url)
}

import { useCategoryStore } from '@/stores/data/category'
import { storeToRefs } from 'pinia'
const categoryStore = useCategoryStore()
const { categorys } = storeToRefs(categoryStore)

import { usePageStore } from '@/stores/data/page'
const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)

import { useDoccategoryStore } from '@/stores/data/doccategory'
const doccategoryStore = useDoccategoryStore()
const { doccategorys } = storeToRefs(doccategoryStore)

const need = ref(['about', 'leadership', 'structure', 'vacancy', 'partners'])

const get = async () => {
  categoryStore.getCategorys({
    language: locale.value || 'ru'
  })

  await pageStore.allPage({
    language: locale.value || 'ru'
  })

  await doccategoryStore.getDoccategorys({
    language: locale.value || 'ru'
  })
}

watch(
  () => locale.value,
  () => {
    get()
  }
)
import ru from '@/assets/logo/ru.svg'
import en from '@/assets/logo/en.svg'
import uz from '@/assets/logo/uz.svg'
const logo = {
  ru,
  en,
  uz
}

const activeExpand = ref(0)
function doExpand(id) {
  if (activeExpand.value == id) {
    activeExpand.value = 0
  } else {
    activeExpand.value = id
  }
  console.log(activeExpand.value)
}

onMounted(async () => {
  if (cookies.get('sitelocal')) {
    setDefaultLocale(cookies.get('sitelocal'))
  }
  get()
})
</script>

<template>
  <nav class="navbar">
    <div class="container d-flex justify-content-between align-items-end">
      <router-link class="logo" to="/">
        <img :src="logo[locale]" alt="" />
      </router-link>
      <div class="navbar__elements">
        <div class="info d-flex justify-content-end align-items-center">
          <router-link class="email" to="/">
            <img src="@/assets/img/icons/email.svg" />markaz@mintrans.uz
          </router-link>

          <div class="languages d-flex">
            <button type="submit" @click="setDefaultLocale('ru')" :class="currentLang === 'ru' ? 'active' : ''">
              Ру
            </button>
            <button type="submit" @click="setDefaultLocale('uz')" :class="currentLang === 'uz' ? 'active' : ''">
              O`z
            </button>
            <button type="submit" @click="setDefaultLocale('en')" :class="currentLang === 'en' ? 'active' : ''">
              En
            </button>
          </div>
        </div>
        <ul class="menu d-flex">
          <li>
            <router-link to="/">
              <img src="@/assets/img/icons/home.svg" />{{ $t('message.nav.main') }}</router-link>
          </li>
          <li>
            <el-dropdown>
              <div class="link" @click="routeTo('/about')">
                <img src="@/assets/img/icons/aboutus.svg" />
                <span>{{ $t('message.nav.about') }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="page of pages.filter((p) => need.includes(p?.key?.slug))" :key="page._id"
                    @click="routeTo({ name: 'pageshow', params: { slug: page?.key?.slug } })">
                    {{ page.title }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <el-dropdown>
              <div class="link" @click="routeTo('/document')">
                <el-icon>
                  <document />
                </el-icon>
                <span>{{ $t('message.nav.document') }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="category of doccategorys" :key="category._id"
                    @click="routeTo({ name: 'publishes', query: { id: category?._id } })">
                    {{ category?.title }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <el-dropdown>
              <div class="link" @click="routeTo('/pubs')">
                <img src="@/assets/img/icons/articles.svg" />
                <span>{{ $t('message.nav.pubs') }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item v-for="category of categorys" :key="category._id"
                    @click="routeTo({ name: 'publishes', query: { id: category?._id } })">
                    {{ category?.title }}
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <router-link to="/news">
              <img src="@/assets/img/icons/news.svg" />
              {{ $t('message.nav.news') }}</router-link>
          </li>
          <li>
            <router-link to="/contacts">
              <img src="@/assets/img/icons/phone.svg" />{{
                $t('message.nav.contacts')
              }}</router-link>
          </li>
        </ul>

        <button class="button" @click="doMenu(true)">
          <img src="@/assets/img/icons/menu.svg" />
        </button>

        <div :class="sideState ? 'side active' : 'side'">
          <div class="side__box">
            <button class="side__close" @click="doMenu(false)">
              <img src="@/assets/img/icons/close.svg" />
            </button>

            <ul class="side__list md-pt-20">
              <li class="item">
                <div class="item__main">
                  <router-link @click="doMenu(false)" class="item__box" to="/">
                    <img src="@/assets/img/icons/news.svg" />
                    Главная
                  </router-link>
                </div>
              </li>
              <li :class="activeExpand === 2 ? 'item active' : 'item'">
                <div class="item__main">
                  <router-link @click="doMenu(false)" class="item__box" to="/about">
                    <img src="@/assets/img/icons/about.svg" />
                    {{ $t('message.nav.about') }}
                  </router-link>

                  <button class="item__expand" @click="doExpand(2)">
                    <el-icon size="14" color="white"><ArrowRightBold /></el-icon>
                  </button>
                </div>

                <div class="item__list">
                  <div 
                    class="item__sub"
                    v-for="page of pages.filter((p) => need.includes(p?.key?.slug))" 
                    :key="page._id"
                    @click="routeTo({ 
                      name: 'pageshow', 
                      params: { slug: page?.key?.slug } 
                    }), doMenu(false)"
                  >
                    - {{ page.title }}
                  </div>
                </div>
              </li>
              <li :class="activeExpand === 3 ? 'item active' : 'item'">
                <div class="item__main">
                  <router-link @click="doMenu(false)" class="item__box" to="/document">
                    <el-icon size="20">
                      <document />
                    </el-icon>
                    {{ $t('message.nav.document') }}
                  </router-link>

                  <button class="item__expand" @click="doExpand(3)">
                    <el-icon size="14" color="white"><ArrowRightBold /></el-icon>
                  </button>
                </div>

                <div class="item__list">
                  <div 
                    class="item__sub"
                    v-for="category of doccategorys" :key="category._id"
                    @click="routeTo({ name: 'publishes', query: { id: category?._id } }), doMenu(false)"
                  >
                    - {{ category.title }}
                  </div>
                </div>
              </li>
              <li :class="activeExpand === 4 ? 'item active' : 'item'">
                <div class="item__main">
                  <router-link @click="doMenu(false)" class="item__box" to="/pubs">
                    <img src="@/assets/img/icons/articles.svg" />
                    {{ $t('message.nav.pubs') }}
                  </router-link>

                  <button class="item__expand" @click="doExpand(4)">
                    <el-icon size="14" color="white"><ArrowRightBold /></el-icon>
                  </button>
                </div>

                <div class="item__list">
                  <div 
                    class="item__sub"
                    v-for="category of categorys" :key="category._id"
                    @click="
                      routeTo({ name: 'publishes', query: { id: category?._id } }), 
                      doMenu(false)
                    "
                  >
                    - {{ category.title }}
                  </div>
                </div>
              </li>
              <!-- <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/"> 
                  <img src="@/assets/img/icons/partners.svg"/>
                  Партнёры
                </router-link>
              </li> -->
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/contacts">
                  <img src="@/assets/img/icons/phone.svg" />
                  Контакты
                </router-link>
              </li>
            </ul>

            <div class="side__more">
              <a class="email md-pt-10 md-pb-10" href="#">
                <img src="@/assets/img/icons/email.svg" />info@ifmr.uz</a>
              <div class="side__languages d-flex md-pt-10">
                <a href="#">O'z </a><a href="#">Уз </a><a class="current" href="#">Ру </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<style lang="scss" scoped>
@import '@/assets/style/component/navbar';
</style>
