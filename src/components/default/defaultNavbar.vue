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
            <router-link to="/"> <img src="@/assets/img/icons/news.svg"/>Новости</router-link>
          </li>
          <li>
            <router-link to="/"> <img src="@/assets/img/icons/partners.svg"/>Партнёры</router-link>
          </li>
          <li>
            <router-link to="/"> <img src="@/assets/img/icons/phone.svg"/>Контакты</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/style/component/navbar';
</style>
