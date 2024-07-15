<script setup>
    import { url } from '@/helpers/api'

    defineProps(['list'])
</script>

<template>
    <ul class="docList">
        <li class="item" v-for="item of list" :key="item?._id">
            <div class="item__box">
                <div class="item__title">{{ item?.title }}</div>

                <a :href="url+'/'+item?.key.img[0].response" target="_blank" class="item__download">
                    <el-icon size="24"><Download /></el-icon>
                </a>

                <!-- <img :src="item?.key.img.url" alt=""> -->
            </div>
        </li>
    </ul>
</template>

<style lang="scss">
.docList{
    display: flex;
    flex-direction: column;
    gap: 15px;
    .item{
        &__box{
            padding: 10px 20px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            background-color: #f8f8f8;
            &:nth-child(even){
                background-color: #dfe3f5;
            }
        }
        &__title{
            font-size: 20px;
        }
        &__download{
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
}
</style>