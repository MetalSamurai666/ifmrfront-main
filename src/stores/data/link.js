import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useLinkStore = defineStore('useLinkStore', () => {
  const links = ref([])
  const linksCount = ref(0)
  const link = ref({})

  const addLink = async (data) => {
    let newLink = await api({
      url: 'api/link',
      method: 'post',
      data
    })
    links.value = [newLink.data, ...links.value]
    linksCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllLinks = async (params) => {
    links.value = []
    linksCount.value = 0
    let { data } = await api({
      url: `api/link`,
      params
    })
    links.value = [...data.data]
    linksCount.value = data.count
  }

  const deleteLink = async (id) => {
    await api({
      url: `api/link/${id}`,
      method: 'delete'
    })
    links.value = links.value.filter((link) => link._id !== id)
    linksCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusLink = async (data) => {
    await api({
      url: `api/link/${data._id}/${data.status}`
    })
    links.value = [
      ...links.value.map((link) => {
        return { ...link, status: link._id == data._id ? data.status : link.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveLink = async (data) => {
    let res = await api({
      url: `api/link`,
      method: 'put',
      data
    })
    links.value = [
      ...links.value.map((link) => {
        if (link._id == res.data._id) return { ...res.data }
        return { ...link }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getLink = async ({ id }) => {
    let { data } = await api({
      url: `api/link/${id}`
    })
    return data
  }

  const getTranslateLink = async ({ id, language }) => {
    let { data } = await api({
      url: `api/link/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `link/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    links,
    link,
    linksCount,

    bySlug,
    getTranslateLink,
    getLink,
    addLink,
    getAllLinks,
    deleteLink,
    statusLink,
    saveLink
  }
})
