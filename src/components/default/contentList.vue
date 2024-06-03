<script setup>
    import publisherList from '@/components/publisher/publisher_list.vue'
</script>

<template>
    <div class="content">
        <div class="container">
            <div class="content__box pt-80 pb-80">
                <div class="content__list">
                    <publisherList :md="8" :count="6"/>
                </div>

                <ul class="content__cats">
                    <li class="item">
                        <router-link to="/" class="item__box"> 
                            Всё
                            <img src="@/assets/img/icons/arrow-right.svg">
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link to="/" class="item__box"> 
                            Исследования
                            <img src="@/assets/img/icons/arrow-right.svg">
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link to="/" class="item__box"> 
                            Экология
                            <img src="@/assets/img/icons/arrow-right.svg">
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link to="/" class="item__box"> 
                            Интервью
                            <img src="@/assets/img/icons/arrow-right.svg">
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link to="/" class="item__box"> 
                            Проекты
                            <img src="@/assets/img/icons/arrow-right.svg">
                        </router-link>
                    </li>
                    <li class="item">
                        <router-link to="/" class="item__box"> 
                            Обзоры рынка
                            <img src="@/assets/img/icons/arrow-right.svg">
                        </router-link>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.content{
    &__box{
        display: grid;
        grid-template-columns: 3fr 1fr;
        gap: 30px;
    }
    &__cats{
        display: flex;
        flex-direction: column;
        padding: 0px 15px;
        .item{
            &__box{
                padding: 25px 0px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                border-bottom: 2px solid #000;
                font-weight: 500;
                line-height: 120%;
                text-transform: uppercase;
                &:hover{
                    color: $blue;
                    border-color: $blue;
                }
            }
            img{
                width: 20px;
                filter: invert(1);
            }
        }
    }
}
</style>