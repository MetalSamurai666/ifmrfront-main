<template>
  <footer>
    <div class="container">
      <el-row :gutter="30">
        <el-col :md="12" :sm="24">
          <div class="title">{{ t('message.nav.contacts') }}</div>
          <div class="contact">
            <div class="name">{{ t('contacts.addresstitle') }}</div>
            <div class="value">
              <img src="@/assets/img/icons/location.svg" alt="" />
              {{ t('contacts.address') }}
            </div>
          </div>
          <div class="contact">
            <div class="name">{{ t('contacts.officeTitle1') }}</div>
            <div class="value">
              <img src="@/assets/img/icons/telephone.svg" alt="" />
              +998 (71) 202-05-00 (531)
            </div>
          </div>
          <div class="contact">
            <div class="name">{{ t('contacts.officeTitle2') }}</div>
            <div class="value">
              <img src="@/assets/img/icons/telephone.svg" alt="" />
              +998 (71) 244-59-55
            </div>
          </div>
          <div class="contact">
            <div class="name">E-mail</div>
            <div class="value">
              <img src="@/assets/img/icons/mail.svg" alt="" />
              markaz@mintrans.uz
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
          {{ t('copyright') }}
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<style lang="scss" scoped>
@import '@/assets/style/component/footer';
</style>
