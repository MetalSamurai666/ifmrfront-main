<script setup>
  import { ref } from 'vue';
  import { useI18n } from 'vue-i18n';

  const {locale} = useI18n()

  const sideState = ref(false)

  function doMenu(i) {
    sideState.value = i
  }
  
  const currentLang = ref('ru')
  function doLang(i) {
    currentLang.value = i
    locale.value = i
  }
</script>

<template>
  <nav class="navbar">
    <div class="container d-flex justify-content-between align-items-end">
      <router-link class="logo" to="/">LOGO</router-link>
      <div class="navbar__elements">
        <div class="info d-flex justify-content-end align-items-center">
          <router-link class="email" to="/">
            <img src="@/assets/img/icons/email.svg"/>info@ifmr.uz
          </router-link>

          <div class="languages d-flex">
            <!-- <button
              type="submit"
              @click="$i18n.locale = item"
              v-for="item of $i18n.availableLocales"
              :key="item"
            >
              {{ $t('localeTitle') }}
            </button> -->
            <button
              type="submit"
              @click="doLang('ru')"
              :class="currentLang === 'ru' ? 'active' : ''"
            >
              Ру
            </button>
            <button
              type="submit"
              @click="doLang('uz')"
              :class="currentLang === 'uz' ? 'active' : ''"
            >
              O`z
            </button>
            <button
              type="submit"
              @click="doLang('uzk')"
              :class="currentLang === 'uzk' ? 'active' : ''"
            >
              Уз
            </button>
          </div>

        </div>
        <ul class="menu d-flex">
          <li>
            <router-link to="/"> <img src="@/assets/img/icons/news.svg"/>{{ $t('message.nav.main') }}</router-link>
          </li>
          <li>
            <router-link to="/about"> <img src="@/assets/img/icons/about.svg"/>{{ $t('message.nav.about') }}</router-link>
          </li>
          <li>
            <router-link to="/pubs"> <img src="@/assets/img/icons/articles.svg"/>{{ $t('message.nav.pubs') }}</router-link>
          </li>
          <li>
            <router-link to="/news"> <img src="@/assets/img/icons/news.svg"/>{{ $t('message.nav.news') }}</router-link>
          </li>
          <!-- <li>
            <router-link to="/"> <img src="@/assets/img/icons/partners.svg"/>{{ $t('message.nav.partners') }}</router-link>
          </li> -->
          <li>
            <router-link to="/contacts"> <img src="@/assets/img/icons/phone.svg"/>{{ $t('message.nav.contacts') }}</router-link>
          </li>
        </ul>

        <button class="button" @click="doMenu(true)">
          <img src="@/assets/img/icons/menu.svg">
        </button>

        <div :class="sideState ? 'side active' : 'side'">
          <div class="side__box">
            <button class="side__close" @click="doMenu(false)">
              <img src="@/assets/img/icons/close.svg">
            </button>

            <ul class="side__list md-pt-20">
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/"> <img src="@/assets/img/icons/news.svg"/>Главная</router-link>
              </li>
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/about"> <img src="@/assets/img/icons/about.svg"/>О нас</router-link>
              </li>
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/pubs"> <img src="@/assets/img/icons/articles.svg"/>Публикации</router-link>
              </li>
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/news"> <img src="@/assets/img/icons/news.svg"/>Новости</router-link>
              </li>
              <!-- <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/"> <img src="@/assets/img/icons/partners.svg"/>Партнёры</router-link>
              </li> -->
              <li class="item">
                <router-link @click="doMenu(false)" class="item__box" to="/contacts"> <img src="@/assets/img/icons/phone.svg"/>Контакты</router-link>
              </li>
            </ul>

            <div class="side__more ">
              <a class="email md-pt-10 md-pb-10" href="#">
                <img src="@/assets/img/icons/email.svg"/>info@ifmr.uz</a
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
