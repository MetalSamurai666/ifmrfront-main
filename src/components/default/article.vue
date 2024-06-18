<script setup>
import { useI18n } from 'vue-i18n'
import { convertDate } from '@/stores/env'
const { t, locale } = useI18n()
import { url } from '@/helpers/api'
defineProps(['article'])
</script>

<template>
  <div class="article pt-20 pb-40">
    <div class="container-m">
      <div class="article__box">
        <div
          class="article__title mb-20"
          :style="{
            backgroundImage: `url('${url}/${article?.key?.img?.at(0)?.response}')`
          }"
        >
          {{ article?.title || '' }}
        </div>

        <div class="article__text" v-html="article?.text || ''" />

        <div class="more mt-40 md-mt-20">
          <div class="more__date">
            <img src="@/assets/img/icons/cal-blue.svg" class="more__logo" />

            <div class="more__title">Дата публикации: {{ convertDate(article.createdAt) }}</div>
          </div>

          <ul class="more__cats">
            <li class="item" v-for="item in article?.cats" :key="item">
              <router-link to="/">{{ item?.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.article {
  &__title {
    background-image: url('@/assets/img/photos/publish.png');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    height: 600px;
    font-weight: 700;
    font-size: 64px;
    line-height: 100%;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 25px;
  }
  .more {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #edf1f5;
    padding: 15px;
    border-radius: 8px;
    &__date {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 18px;
      line-height: 135%;
    }
    &__cats {
      display: flex;
      align-items: center;
      gap: 15px;
      .item {
        opacity: 0.6;
        padding: 4px 8px;
        border: 1px solid #000;
        border-radius: 2px;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        text-transform: uppercase;
        line-height: 135%;
        &:hover {
          opacity: 1;
        }
      }
    }
  }

  @media (max-width: 600px) {
    &__title {
      font-size: 34px;
      height: 350px;
    }
    &__text {
      p {
        font-size: 14px;
      }
    }
    .more {
      flex-direction: column;
      gap: 10px;
      &__title {
        font-size: 14px;
      }
      &__cats {
        .item {
          font-size: 14px;
        }
      }
    }
  }
}
</style>
<!-- ily -->
