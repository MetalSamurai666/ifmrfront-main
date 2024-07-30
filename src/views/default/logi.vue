<script setup>
    import Rating from '@/components/default/rating.vue'
    import { useCenterStore } from '@/stores/data/center'
    // import { useI18n } from 'vue-i18n'
    // import { url } from '@/helpers/api'
    import {  onMounted } from 'vue'
    import { useRoute } from 'vue-router'

    // const { locale } = useI18n()
    const route = useRoute()

    const centerStore = useCenterStore()

    onMounted(() => {
        console.log(route?.params.id)
        centerStore.bySlug(route?.params.id)
    })

</script>

<template>
    <div class="logi">
        <div class="placeholder"></div>
        <div class="container">
            <div class="logi__box">
                <!-- <img :src="url+'/'+item?.img[0]?.response" class="logi__img"> -->

                <div class="logi__content" v-html="`<b> asd </b>`"></div>

                <div class="gallery">
                    <div class="logi__title">Галерея</div>
                    <div class="gallery__list">
                        <li class="item" v-for="item of 3" :key="item">
                            <img src="@/assets/img/photos/publish.jpg" class="item__img">
                        </li>
                    </div>
                </div>

                <div class="map">
                    <div class="logi__title">Где находится</div>
                    <iframe src="https://yandex.ru/map-widget/v1/-/CBucU6V~8B" width="100%" height="450"></iframe>
                </div>
            </div>
        </div>
        <Rating />
    </div>
</template>

<style lang="scss" scoped>
    .placeholder {
        background-color: #2a37af;
        height: 300px;
    }

    .logi{
        &__box{
            padding: 40px 0px;
        }
        &__content{
            padding: 20px 0px;
        }
        &__title{
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 20px;
        }
        .gallery{
            padding-bottom: 20px;
            &__list{
                display: flex;
                justify-content: space-between;
                .item{
                    &__img{
                        width: 300px;
                        height: 200px;
                        object-fit: cover;
                        object-position: center;
                    }
                }
            }
            @media (max-width: 600px) {
                &__list{
                    flex-direction: column;
                    gap: 30px;
                    .item{
                        &__img{
                            width: 100%;
                        }
                    }
                }
            }
        }   
    }
</style>