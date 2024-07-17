<script setup>
import { onMounted, ref, watch } from 'vue'
import { usePageStore } from '@/stores/data/page'
const store = usePageStore()
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
let data = ref({})

const getData = async () => {
  let res = await store.bySlug('contact', locale.value)

  data.value = { ...res }
}

watch(
  () => locale.value,
  async () => await getData()
)

onMounted(async () => {
  await getData()
})
import poster from '@/components/default/poster.vue'
</script>

<template>
  <div class="contacts">
    <poster
      :poster="{
        title: data.title || '',
        info: data.description || '',
        img: data?.img?.at(0)?.response,
        alt: true
      }"
    />

    <div class="container">
      <div class="contacts__box">
        <ul class="contacts__list pt-30 pb-70">
          <li class="item">
            <a href="#" class="item__box">
              <img src="@/assets/img/icons/telephone-blue.svg" class="item__logo" />

              <div class="item__wrap">
                <div class="item__title">Телефон приёмной</div>

                <div class="item__info">+998 71 244-01-17</div>
              </div>
            </a>
          </li>
          <li class="item">
            <a href="#" class="item__box">
              <img src="@/assets/img/icons/yt.svg" class="item__logo" />

              <div class="item__wrap">
                <div class="item__title">Канал на YouTube</div>

                <div class="item__info">youtube.com/@ifmr.uz</div>
              </div>
            </a>
          </li>
          <li class="item">
            <a href="#" class="item__box">
              <img src="@/assets/img/icons/telephone-blue.svg" class="item__logo" />

              <div class="item__wrap">
                <div class="item__title">Телефон офиса</div>

                <div class="item__info">+998 71 244-01-17</div>
              </div>
            </a>
          </li>
          <li class="item">
            <a href="#" class="item__box">
              <img src="@/assets/img/icons/fb.svg" class="item__logo" />

              <div class="item__wrap">
                <div class="item__title">Facebook</div>

                <div class="item__info">@ifmr.uz</div>
              </div>
            </a>
          </li>
          <li class="item">
            <a href="#" class="item__box">
              <img src="@/assets/img/icons/mail-blue.svg" class="item__logo" />

              <div class="item__wrap">
                <div class="item__title">E-mail</div>

                <div class="item__info">info@infmr.uz</div>
              </div>
            </a>
          </li>
          <li class="item">
            <a href="#" class="item__box">
              <img src="@/assets/img/icons/ig.svg" class="item__logo" />

              <div class="item__wrap">
                <div class="item__title">Instagram</div>

                <div class="item__info">@ifmr.uz</div>
              </div>
            </a>
          </li>
          <li class="item">
            <a href="#" class="item__box">
              <img src="@/assets/img/icons/geo.svg" class="item__logo" />

              <div class="item__wrap">
                <div class="item__title">Адрес</div>

                <div class="item__info">
                  100011, Республика Узбекистан, г. Ташкент, массив Хадра, 33А
                </div>
              </div>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.contacts {
  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 15px;
    .item {
      &__box {
        background-color: #edf1f5;
        display: flex;
        gap: 15px;
        padding: 15px;
        font-weight: 500;
        line-height: 120%;
        border-radius: 4px;
        &:hover {
          background-color: rgb(230, 235, 241);
        }
      }
      &__title {
        font-size: 12px;
        color: $blue;
      }
      &__info {
        font-family: 'Montserrat';
      }
    }
  }

  @media (max-width: 600px) {
    &__list {
      grid-template-columns: 1fr;
    }
  }
}
</style>
