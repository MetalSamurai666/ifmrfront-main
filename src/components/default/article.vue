<script setup>
    defineProps(['article'])
</script>

<template>
    <div class="article pt-20 pb-40">
        <div class="container-m">
            <div class="article__box">
                <div class="article__title">{{ article?.title }}</div>

                <div class="article__text" v-html="article?.text"></div>

                <div class="more mt-40">
                    <div class="more__date">
                        <img src="@/assets/img/icons/cal-blue.svg" class="more__logo">

                        <div class="more__title">Дата публикации: {{ article?.date }}</div>
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

<style lang="scss" scoped>
.article{
    &__title{
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
    .more{
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: #EDF1F5;
        padding: 15px;
        border-radius: 8px;
        &__date{
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 18px;
            line-height: 135%;
        }
        &__cats{
            display: flex;
            align-items: center;
            gap: 15px;
            .item{
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
                &:hover{
                    opacity: 1;
                }
            }
        }
    }
}
</style>
<!-- ily -->