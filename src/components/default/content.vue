<script setup>
    defineProps(['content'])
</script>

<template>
    <div class="content pt-80 pb-80">
        <div class="container">
            <h2 class="content__title">{{ content?.title }}</h2>

            <div class="content__text" v-html="content?.text"></div>
        </div>
    </div>
</template>

<style lang="scss">
.content{
    &__text{
        font-family: 'Roboto Slab';
        line-height: 140%;
        font-size: 18px;
        p{
            line-height: 140%;
        }
        h3{
            font-family: 'Fira Sans';
        }
    }
}
</style>