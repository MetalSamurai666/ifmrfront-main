import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePublisherStore = defineStore('usePublisherStore', () => {
  const publishers = ref([])
  const publishersCount = ref(0)
  const publisher = ref({})

  const addPublisher = async (data) => {
    let newPublisher = await api({
      url: 'api/publisher',
      method: 'post',
      data
    })
    publishers.value = [newPublisher.data, ...publishers.value]
    publishersCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllPublishers = async (params) => {
    // console.log(params)
    publishers.value = []
    publishersCount.value = 0
    let { data } = await api({
      url: `api/publisher`,
      params
    })
    // console.log(data.data)
    publishers.value = [...data.data]
    publishersCount.value = data.count
  }

  const deletePublisher = async (id) => {
    await api({
      url: `api/publisher/${id}`,
      method: 'delete'
    })
    publishers.value = publishers.value.filter((publisher) => publisher._id !== id)
    publishersCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusPublisher = async (data) => {
    await api({
      url: `api/publisher/${data._id}/${data.status}`
    })
    publishers.value = [
      ...publishers.value.map((publisher) => {
        return { ...publisher, status: publisher._id == data._id ? data.status : publisher.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const savePublisher = async (data) => {
    let res = await api({
      url: `api/publisher`,
      method: 'put',
      data
    })
    publishers.value = [
      ...publishers.value.map((publisher) => {
        if (publisher._id == res.data._id) return { ...res.data }
        return { ...publisher }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getPublisher = async ({ id }) => {
    let { data } = await api({
      url: `api/publisher/${id}`
    })
    return data
  }

  const getTranslatePublisher = async ({ id, language }) => {
    let { data } = await api({
      url: `api/publisher/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `v1/publish/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  const getPublishers = async (params) => {
    console.log(params)
    publishers.value = []
    publishersCount.value = 0
    let { data } = await api({
      url: `v1/publisher`,
      params
    })
    console.log(data)
    publishers.value = [...data.data]
    publishersCount.value = data.count
  }

  return {
    publishers,
    publisher,
    publishersCount,
    getPublishers,
    bySlug,
    getTranslatePublisher,
    getPublisher,
    addPublisher,
    getAllPublishers,
    deletePublisher,
    statusPublisher,
    savePublisher
  }
})
