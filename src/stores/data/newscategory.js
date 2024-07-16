import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNewscategoryStore = defineStore('useNewscategoryStore', () => {
  const newscategorys = ref([])
  const newscategorysCount = ref(0)
  const newscategory = ref({})

  const addNewscategory = async (data) => {
    console.log(data)
    let newNewscategory = await api({
      url: 'api/newscategory',
      method: 'post',
      data
    })
    newscategorys.value = [newNewscategory.data, ...newscategorys.value]
    newscategorysCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllNewscategorys = async (params) => {
    console.log(params)
    newscategorys.value = []
    newscategorysCount.value = 0
    let { data } = await api({
      url: `api/newscategory`,
      params
    })
    console.log(data)
    newscategorys.value = [...data.data]
    newscategorysCount.value = data.count
  }

  const getNewscategorys = async (params) => {
    newscategorys.value = []
    newscategorysCount.value = 0
    let { data } = await api({
      url: `v1/newscategory`,
      params
    })
    console.log(data)
    newscategorys.value = [...data]
  }

  const deleteNewscategory = async (id) => {
    await api({
      url: `api/newscategory/${id}`,
      method: 'delete'
    })
    newscategorys.value = newscategorys.value.filter((newscategory) => newscategory._id !== id)
    newscategorysCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusNewscategory = async (data) => {
    await api({
      url: `api/newscategory/${data._id}/${data.status}`
    })
    newscategorys.value = [
      ...newscategorys.value.map((newscategory) => {
        return {
          ...newscategory,
          status: newscategory._id == data._id ? data.status : newscategory.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveNewscategory = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/newscategory`,
      method: 'put',
      data
    })
    console.log(res.data)
    newscategorys.value = [
      ...newscategorys.value.map((newscategory) => {
        if (newscategory._id == res.data._id) return { ...res.data }
        return { ...newscategory }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getNewscategory = async ({ id }) => {
    let { data } = await api({
      url: `api/newscategory/${id}`
    })
    return data
  }

  const getTranslateNewscategory = async ({ id, language }) => {
    let { data } = await api({
      url: `api/newscategory/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `newscategory/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    newscategorys,
    newscategory,
    newscategorysCount,
    getNewscategorys,
    bySlug,
    getTranslateNewscategory,
    getNewscategory,
    addNewscategory,
    getAllNewscategorys,
    deleteNewscategory,
    statusNewscategory,
    saveNewscategory
  }
})
