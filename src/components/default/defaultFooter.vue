<template>
  <footer>
    <div class="container">
      <el-row :gutter="30">
        <el-col :md="12" :sm="24">
          <div class="title">Контакты</div>
          <div class="contact">
            <div class="name">Адрес</div>
            <div class="value">
              <img src="@/assets/img/icons/location.svg" alt="" />
              100011, Республика Узбекистан, г. Ташкент, массив Хадра, 33А
            </div>
          </div>
          <div class="contact">
            <div class="name">Приёмная</div>
            <div class="value">
              <img src="@/assets/img/icons/telephone.svg" alt="" />
              +998 71 244-01-17
            </div>
          </div>
          <div class="contact">
            <div class="name">Офис</div>
            <div class="value">
              <img src="@/assets/img/icons/telephone.svg" alt="" />
              +998 71 244-02-40
            </div>
          </div>
          <div class="contact">
            <div class="name">E-mail</div>
            <div class="value">
              <img src="@/assets/img/icons/mail.svg" alt="" />
              info@ifmr.uz
            </div>
          </div>
          <div class="social">
            <a href="#">
              <img src="@/assets/img/icons/youtube.svg" alt="" />
            </a>
            <a href="#">
              <img src="@/assets/img/icons/facebook.svg" alt="" />
            </a>
            <a href="#">
              <img src="@/assets/img/icons/instagram.svg" alt="" />
            </a>
          </div>
        </el-col>
        <el-col :md="6" :sm="12">
          <div class="title">О нас</div>
          <ul>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института</a
              >
            </li>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института</a
              >
            </li>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института</a
              >
            </li>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института</a
              >
            </li>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института</a
              >
            </li>
          </ul>
          <div class="title mt-50">Законы</div>
          <ul>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института
              </a>
            </li>
          </ul>
        </el-col>
        <el-col :md="6" :sm="12">
          <div class="title">Публикации</div>
          <ul>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института
              </a>
            </li>
            <li>
              <a href="#">
                <img src="@/assets/img/icons/right.svg" alt="" />
                Деятельность института
              </a>
            </li>
          </ul>
        </el-col>
      </el-row>
      <div class="copyright">
        <div class="author">Сайт разработан <a href="#">MD.uz</a></div>
        <div class="info">
          Институт прогнозирования и макроэкономических исследований при Министерстве экономического
          развития и сокращения бедности Республики Узбекистан.
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
@import '@/assets/style/component/footer';
</style>
