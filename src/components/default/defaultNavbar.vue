<script setup>
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import cookies from 'vue-cookies'
import { useRouter } from 'vue-router'
const { t, locale } = useI18n()

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
function doLang(i) {
  locale.value = i
}
const router = useRouter()
const routeTo = (url) => {
  router.push(url)
}

onMounted(() => {
  if (cookies.get('sitelocal')) {
    setDefaultLocale(cookies.get('sitelocal'))
  }
})
</script>

<template>
  <nav class="navbar">
    <div class="container d-flex justify-content-between align-items-end">
      <router-link class="logo" to="/">
        <img src="@/assets/logo.png" alt="" />
        <span>
          {{ t('title') }}
        </span>
      </router-link>
      <div class="navbar__elements">
        <div class="info d-flex justify-content-end align-items-center">
          <router-link class="email" to="/">
            <img src="@/assets/img/icons/email.svg" />markaz@mintrans.uz
          </router-link>

          <div class="languages d-flex">
            <button
              type="submit"
              @click="setDefaultLocale('ru')"
              :class="currentLang === 'ru' ? 'active' : ''"
            >
              Ру
            </button>
            <button
              type="submit"
              @click="setDefaultLocale('uz')"
              :class="currentLang === 'uz' ? 'active' : ''"
            >
              O`z
            </button>
            <button
              type="submit"
              @click="setDefaultLocale('uzk')"
              :class="currentLang === 'uzk' ? 'active' : ''"
            >
              Уз
            </button>
          </div>
        </div>
        <ul class="menu d-flex">
          <li>
            <router-link to="/">
              <img src="@/assets/img/icons/news.svg" />{{ $t('message.nav.main') }}</router-link
            >
          </li>
          <li>
            <el-dropdown>
              <div class="link" @click="routeTo('/about')">
                <img src="@/assets/img/icons/about.svg" />
                <span>{{ $t('message.nav.about') }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>Action 1</el-dropdown-item>
                  <el-dropdown-item>Action 2</el-dropdown-item>
                  <el-dropdown-item>Action 3</el-dropdown-item>
                  <el-dropdown-item>Action 4</el-dropdown-item>
                  <el-dropdown-item>Action 5</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
          <li>
            <router-link to="/pubs">
              <img src="@/assets/img/icons/articles.svg" />{{ $t('message.nav.pubs') }}</router-link
            >
          </li>
          <li>
            <router-link to="/news">
              <img src="@/assets/img/icons/news.svg" />{{ $t('message.nav.news') }}</router-link
            >
          </li>
          <li>
            <router-link to="/contacts">
              <img src="@/assets/img/icons/phone.svg" />{{
                $t('message.nav.contacts')
              }}</router-link
            >
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
                <router-link @click="doMenu(false)" class="item__box" to="/">
                  <img src="@/assets/img/icons/news.svg" />Главная</router-link
                >
              </li>
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/about">
                  <img src="@/assets/img/icons/about.svg" />О нас</router-link
                >
              </li>
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/pubs">
                  <img src="@/assets/img/icons/articles.svg" />Публикации</router-link
                >
              </li>
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/news">
                  <img src="@/assets/img/icons/news.svg" />Новости</router-link
                >
              </li>
              <!-- <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/"> <img src="@/assets/img/icons/partners.svg"/>Партнёры</router-link>
              </li> -->
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/contacts">
                  <img src="@/assets/img/icons/phone.svg" />Контакты</router-link
                >
              </li>
            </ul>

            <div class="side__more">
              <a class="email md-pt-10 md-pb-10" href="#">
                <img src="@/assets/img/icons/email.svg" />info@ifmr.uz</a
              >
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
