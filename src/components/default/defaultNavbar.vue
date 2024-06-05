<script setup>
  import { ref } from 'vue';

  const sideState = ref(false)

  function doMenu(i) {
    sideState.value = i
  }
</script>

<template>
  <nav class="navbar">
    <div class="container d-flex justify-content-between align-items-end">
      <a class="logo" href="index.html">LOGO</a>
      <div class="navbar__elements">
        <div class="info d-flex justify-content-end align-items-center">
          <a class="email" href="#">
            <img src="@/assets/img/icons/email.svg"/>info@ifmr.uz</a
          >
          <div class="languages d-flex">
            <a href="#">O'z </a><a href="#">Уз </a><a class="current" href="#">Ру </a>
          </div>
        </div>
        <ul class="menu d-flex">
          <li>
            <router-link to="/"> <img src="@/assets/img/icons/news.svg"/>Главная</router-link>
          </li>
          <li>
            <router-link to="/about"> <img src="@/assets/img/icons/about.svg"/>О нас</router-link>
          </li>
          <li>
            <router-link to="/pubs"> <img src="@/assets/img/icons/articles.svg"/>Публикации</router-link>
          </li>
          <li>
            <router-link to="/news"> <img src="@/assets/img/icons/news.svg"/>Новости</router-link>
          </li>
          <!-- <li>
            <router-link to="/"> <img src="@/assets/img/icons/partners.svg"/>Партнёры</router-link>
          </li> -->
          <li>
            <router-link to="/contacts"> <img src="@/assets/img/icons/phone.svg"/>Контакты</router-link>
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
