<script setup>
    import Article from '@/components/default/article.vue';
    import publisherList from '@/components/publisher/publisher_list.vue'
import { computed } from 'vue';
    import { useI18n } from 'vue-i18n'

    const {t} = useI18n()

    const articleItem = computed(() => {
        return {
            title: t('message.publish.title'),
            text: t('message.publish.text'),
            date: '05.06.2024',
            cats: [
                {
                    title: 'Исследования'
                },
                {
                    title: 'Проекты'
                },
            ]
        }
    })
</script>

<template>
    <div class="publish">
        <Article :article="articleItem"/>
        <publisherList :title="'Другие материалы по теме'" :noLogo="true" :md="8" :count="6" :small="true"/>
    </div>
</template>

<style>

</style>