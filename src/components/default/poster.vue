<script setup>
    defineProps(['poster'])
</script>

<template>
    <div 
        :class="poster?.alt ? 'poster alt' : 'poster'" 
        :style="{backgroundImage: 'url(' + poster?.img + ')'}"
    >
        <div class="container">
            <div class="poster__box">
                <div class="poster__title">{{ poster?.title }}</div>

                <div class="poster__info">{{ poster?.info }}</div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
    .poster{
        width: 100%;
        height: 760px;
        background-color: $blue;
        background-size: 60%;
        background-position: 0 100%;
        background-repeat: no-repeat;
        &.alt{
            background-position: 100% 100%;
            .poster__box{
                margin-right: auto;
                margin-left: unset;
                align-items: flex-start;
            }
            .poster__info{
                text-align: left;
            }
        }
        .container{
            height: 100%;
        }
        &__box{
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            justify-content: center;
            gap: 50px;
            max-width: 45%;
            height: 100%;
            text-align: right;
            margin-left: auto;
            color: #fff;
            padding-top: 150px;
            
        }
        &__title{
            font-size: 36px;
            font-weight: 700;
            line-height: 100%;
            text-transform: uppercase;
        }
        &__info{
            font-family: 'Roboto Slab';
            font-size: 18px;
            line-height: 140%;
        }
    }
</style>