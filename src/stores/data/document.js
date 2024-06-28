import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDocumentStore = defineStore('useDocumentStore', () => {
  const documents = ref([])
  const documentsCount = ref(0)
  const document = ref({})

  const addDocument = async (data) => {
    let newDocument = await api({
      url: 'api/document',
      method: 'post',
      data
    })
    documents.value = [newDocument.data, ...documents.value]
    documentsCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllDocuments = async (params) => {
    // console.log(params)
    documents.value = []
    documentsCount.value = 0
    let { data } = await api({
      url: `api/document`,
      params
    })
    console.log(data.data)
    documents.value = [...data.data]
    documentsCount.value = data.count
  }

  const deleteDocument = async (id) => {
    await api({
      url: `api/document/${id}`,
      method: 'delete'
    })
    documents.value = documents.value.filter((document) => document._id !== id)
    documentsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusDocument = async (data) => {
    await api({
      url: `api/document/${data._id}/${data.status}`
    })
    documents.value = [
      ...documents.value.map((document) => {
        return { ...document, status: document._id == data._id ? data.status : document.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveDocument = async (data) => {
    let res = await api({
      url: `api/document`,
      method: 'put',
      data
    })
    documents.value = [
      ...documents.value.map((document) => {
        if (document._id == res.data._id) return { ...res.data }
        return { ...document }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getDocument = async ({ id }) => {
    let { data } = await api({
      url: `api/document/${id}`
    })
    return data
  }

  const getTranslateDocument = async ({ id, language }) => {
    let { data } = await api({
      url: `api/document/translate/${id}/${language}`
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

  const getDocuments = async (params) => {
    documents.value = []
    documentsCount.value = 0
    let { data } = await api({
      url: `v1/document`,
      params
    })
    documents.value = [...data.data]
    documentsCount.value = data.count
  }

  return {
    documents,
    document,
    documentsCount,
    getDocuments,
    bySlug,
    getTranslateDocument,
    getDocument,
    addDocument,
    getAllDocuments,
    deleteDocument,
    statusDocument,
    saveDocument
  }
})
