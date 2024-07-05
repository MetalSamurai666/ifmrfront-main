<script setup>
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { onMounted, watch } from 'vue'
import DocList from '@/components/default/docList.vue'

const { locale } = useI18n()
import { useDocumentStore } from '@/stores/data/document'
const store = useDocumentStore()
const { documents } = storeToRefs(store)

import { useDoccategoryStore } from '@/stores/data/doccategory'
const doccategoryStore = useDoccategoryStore()
const { doccategorys } = storeToRefs(doccategoryStore)

watch(
  () => locale.value,
  async () => {
    await getDate()
  }
)

const getDate = async () => {
  await store.getDocuments({
    language: locale.value || 'ru'
  })
  await doccategoryStore.getDoccategorys({
    language: locale.value || 'ru'
  })
}

onMounted(async () => {
  await getDate()
})
</script>

<template>
  <div class="docs">
    <div class="container">
      <div class="docs__box">

        <doc-list :list="documents" />

        <ul class="docs__cats">
        <li class="item">
          <router-link :to="{ name: 'documents' }" class="item__box">
            Всё
            <img src="@/assets/img/icons/arrow-right.svg" />
          </router-link>
        </li>
        <li class="item" v-for="cat of doccategorys" :key="cat._id">
          <router-link :to="{ name: 'documents', query: { id: cat?.key?._id } }" class="item__box">
            {{ cat?.title }}

            <img src="@/assets/img/icons/arrow-right.svg" />
          </router-link>
        </li>
        </ul>

      </div>
    </div>
  </div>
</template>

<style lang="scss">
  .docs{
    &__box{
      display: grid;
      grid-template-columns: 3fr 1fr;
      gap: 30px;
      padding: 40px 0px;
    }
    &__cats{
      display: flex;
      flex-direction: column;
      padding: 0px 15px;
      .item {
        &__box {
          padding: 25px 0px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 2px solid #000;
          font-weight: 500;
          line-height: 120%;
          text-transform: uppercase;
          &:hover {
          color: $blue;
          border-color: $blue;
          }
        }
        img {
          width: 20px;
          filter: invert(1);
        }
      }
    }
  }
</style>
