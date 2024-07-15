<script setup>
    import newsItem from '@/components/news/news_item.vue'

    import { useNewsStore } from '@/stores/data/news'
    import { storeToRefs } from 'pinia'
    import { onMounted } from 'vue';

    const store = useNewsStore()
    const { newss } = storeToRefs(store)

    onMounted(() => {
        store.getAllNewss()
    })
</script>

<template>
    <div class="homeNews">
        <div class="container">
            <h2 class="mb-30">
                <img src="@/assets/img/icons/publisher.svg"/>
                {{ $t('message.nav.news') }}
            </h2>

            <div class="homeNews__box">
                <div class="homeNews__left">
                    <div v-for="item of newss.slice(0, 1)" :key="item?._id">
                        <newsItem :publish="item"/>
                    </div>
                </div>
                <div class="homeNews__right">
                    <div v-for="item of newss.slice(1)" :key="item?._id" class="homeNews__list">
                        <newsItem :publish="item" class="alt"/>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .homeNews{
        &__box{
            display: flex;
            gap: 30px;
        }
        &__left{
            flex-basis: 50%;
            width: 50%;
        }
        &__right{
            flex: 1;
        }
        &__list{
            display: flex;
            flex-direction: column;
        }

        @media (max-width: 600px) {
            &__box{
                flex-direction: column;
                gap: 0px;
            }
            &__left{
                flex-basis: 100%;
                width: 100%;
            }
        }
    }
</style>