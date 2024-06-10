<script setup>
    import { ref } from 'vue'
    import poster from "@/components/default/poster.vue"
    import posterImg from '@/assets/img/poster/news.png'
    import publisherList from '@/components/publisher/publisher_list.vue'

    const posterProps = ref({
        img: posterImg,
        title: 'Публикации',
        info: 'Результаты наших исследований, аналитические обзоры, статьи, кейсы успешных проектов и многое другое в области транспортной инфраструктуры и логистики. У нас вы можете ознакомиться с последними тенденциями в отрасли, получить экспертные мнения и расширить свои знания о текущих и будущих вызовах и возможностях в сфере транспорта.',
        alt: true
    })

    const list = ref([
        {

        }
    ])
</script>

<template>
    <div class="news">
        <poster :poster="posterProps" />
        <publisherList :md="8" :count="1" class="pt-80 pb-80" :list="list"/>
    </div>
</template>

<style>

</style>