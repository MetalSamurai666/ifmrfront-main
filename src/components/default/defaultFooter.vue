<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

import { useCategoryStore } from '@/stores/data/category'
import { storeToRefs } from 'pinia'
const categoryStore = useCategoryStore()
const { categorys } = storeToRefs(categoryStore)

import { usePageStore } from '@/stores/data/page'
const pageStore = usePageStore()
const { pages } = storeToRefs(pageStore)
const need = ref(['about', 'leadership', 'structure', 'vacancy', 'partners'])

import { useDoccategoryStore } from '@/stores/data/doccategory'
const doccategoryStore = useDoccategoryStore()
const { doccategorys } = storeToRefs(doccategoryStore)

import { useNewscategoryStore } from '@/stores/data/newscategory'
const newscategoryStore = useNewscategoryStore()
const { newscategorys } = storeToRefs(newscategoryStore)
</script>

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
          <router-link to="/about" class="title">{{ $t('message.nav.about') }}</router-link>
          <ul>
            <li v-for="page of pages.filter((p) => need.includes(p?.key?.slug))"
              :key="page._id">
              <router-link
                
                :to="{ name: 'pageshow', params: { slug: page?.key?.slug } }"
              >
                <img src="@/assets/img/icons/right.svg" />
                {{ page.title }}
              </router-link>
            </li>
          </ul>
          <router-link to="/document" class="title mt-50">{{ $t('message.nav.document') }}</router-link>
          <ul>
            <li v-for="category of doccategorys" :key="category._id">
              <router-link
                :to="{ name: 'pageshow', params: { slug: category?.key?.slug } }"
              >
                <img src="@/assets/img/icons/right.svg" />
                {{ category?.title }}
              </router-link>
            </li>
          </ul>
          
        </el-col>
        <el-col :md="6" :sm="12">
          <router-link to="/pubs" class="title">{{ $t('message.nav.pubs') }}</router-link>
          <ul>
            <li v-for="category of newscategorys" :key="category._id">
              <router-link
                :to="{ name: 'pageshow', params: { slug: category?.key?.slug } }"
              >
                <img src="@/assets/img/icons/right.svg" />
                {{ category?.title }}
              </router-link>
            </li>
          </ul>

          <router-link to="/pubs" class="title mt-50">{{ $t('message.nav.news') }}</router-link>
          <ul>
            <li v-for="category of categorys" :key="category._id">
              <router-link
                :to="{ name: 'pageshow', params: { slug: category?.key?.slug } }"
              >
                <img src="@/assets/img/icons/right.svg" />
                {{ category?.title }}
              </router-link>
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

<style lang="scss" scoped>
@import '@/assets/style/component/footer';
</style>
