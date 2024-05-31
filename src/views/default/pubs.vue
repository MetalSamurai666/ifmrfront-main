<script setup>
    import { ref } from 'vue'
    import poster from "@/components/default/poster.vue";
    import posterImg from '@/assets/img/poster/pubs.png'

    const posterProps = ref({
        img: posterImg,
        title: 'Публикации',
        info: 'Результаты наших исследований, аналитические обзоры, статьи, кейсы успешных проектов и многое другое в области транспортной инфраструктуры и логистики. У нас вы можете ознакомиться с последними тенденциями в отрасли, получить экспертные мнения и расширить свои знания о текущих и будущих вызовах и возможностях в сфере транспорта.'
    })
</script>

<template>
    <div class="pubs">
        <poster :poster="posterProps" />
        
    </div>
</template>

<style lang="scss" scoped>

</style>