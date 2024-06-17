import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePageStore = defineStore('usePageStore', () => {
  const pages = ref([])
  const pagesCount = ref(0)
  const page = ref({})

  const addPage = async (data) => {
    let newPage = await api({
      url: 'api/page',
      method: 'post',
      data
    })
    pages.value = [newPage.data, ...pages.value]
    pagesCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllPages = async (params) => {
    pages.value = []
    pagesCount.value = 0
    let { data } = await api({
      url: `api/page`,
      params
    })
    console.log(data)
    pages.value = [...data.data]
    pagesCount.value = data.count
  }

  const deletePage = async (id) => {
    await api({
      url: `api/page/${id}`,
      method: 'delete'
    })
    pages.value = pages.value.filter((page) => page._id !== id)
    pagesCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusPage = async (data) => {
    await api({
      url: `api/page/${data._id}/${data.status}`
    })
    pages.value = [
      ...pages.value.map((page) => {
        return { ...page, status: page._id == data._id ? data.status : page.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const savePage = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/page`,
      method: 'put',
      data
    })
    console.log(res.data)
    pages.value = [
      ...pages.value.map((page) => {
        if (page._id == res.data._id) return { ...res.data }
        return { ...page }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getPage = async ({ id }) => {
    let { data } = await api({
      url: `api/page/${id}`
    })
    return data
  }

  const getTranslatePage = async ({ id, language }) => {
    let { data } = await api({
      url: `api/page/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `page/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    pages,
    page,
    pagesCount,

    bySlug,
    getTranslatePage,
    getPage,
    addPage,
    getAllPages,
    deletePage,
    statusPage,
    savePage
  }
})
