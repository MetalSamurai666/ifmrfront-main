import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewsStore = defineStore('useNewsStore', () => {
  const newss = ref([])
  const newssCount = ref(0)
  const news = ref({})

  const addNews = async (data) => {
    let newNews = await api({
      url: 'api/news',
      method: 'post',
      data
    })
    newss.value = [newNews.data, ...newss.value]
    newssCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllNewss = async (params) => {
    // console.log(params)
    newss.value = []
    newssCount.value = 0
    let { data } = await api({
      url: `api/news`,
      params
    })
    // console.log(data.data)
    newss.value = [...data.data]
    newssCount.value = data.count
  }

  const deleteNews = async (id) => {
    await api({
      url: `api/news/${id}`,
      method: 'delete'
    })
    newss.value = newss.value.filter((news) => news._id !== id)
    newssCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusNews = async (data) => {
    await api({
      url: `api/news/${data._id}/${data.status}`
    })
    newss.value = [
      ...newss.value.map((news) => {
        return { ...news, status: news._id == data._id ? data.status : news.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveNews = async (data) => {
    let res = await api({
      url: `api/news`,
      method: 'put',
      data
    })
    newss.value = [
      ...newss.value.map((news) => {
        if (news._id == res.data._id) return { ...res.data }
        return { ...news }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getNews = async ({ id }) => {
    let { data } = await api({
      url: `api/news/${id}`
    })
    return data
  }

  const getTranslateNews = async ({ id, language }) => {
    let { data } = await api({
      url: `api/news/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `v1/news/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  const getNewss = async (params) => {
    newss.value = []
    newssCount.value = 0
    let { data } = await api({
      url: `v1/news`,
      params
    })
    newss.value = [...data.data]
    newssCount.value = data.count
  }

  return {
    newss,
    news,
    newssCount,
    getNewss,
    bySlug,
    getTranslateNews,
    getNews,
    addNews,
    getAllNewss,
    deleteNews,
    statusNews,
    saveNews
  }
})
