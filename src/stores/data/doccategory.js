import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useDoccategoryStore = defineStore('useDoccategoryStore', () => {
  const doccategorys = ref([])
  const doccategorysCount = ref(0)
  const doccategory = ref({})

  const addDoccategory = async (data) => {
    console.log(data)
    let newDoccategory = await api({
      url: 'api/doccategory',
      method: 'post',
      data
    })
    doccategorys.value = [newDoccategory.data, ...doccategorys.value]
    doccategorysCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllDoccategorys = async (params) => {
    doccategorys.value = []
    doccategorysCount.value = 0
    let { data } = await api({
      url: `api/doccategory`,
      params
    })
    console.log(data)
    doccategorys.value = [...data.data]
    doccategorysCount.value = data.count
  }

  const getDoccategorys = async (params) => {
    doccategorys.value = []
    doccategorysCount.value = 0
    let { data } = await api({
      url: `v1/doccategory`,
      params
    })
    console.log(data)
    doccategorys.value = [...data]
  }

  const deleteDoccategory = async (id) => {
    await api({
      url: `api/doccategory/${id}`,
      method: 'delete'
    })
    doccategorys.value = doccategorys.value.filter((doccategory) => doccategory._id !== id)
    doccategorysCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusDoccategory = async (data) => {
    await api({
      url: `api/doccategory/${data._id}/${data.status}`
    })
    doccategorys.value = [
      ...doccategorys.value.map((doccategory) => {
        return { ...doccategory, status: doccategory._id == data._id ? data.status : doccategory.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveDoccategory = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/doccategory`,
      method: 'put',
      data
    })
    console.log(res.data)
    doccategorys.value = [
      ...doccategorys.value.map((doccategory) => {
        if (doccategory._id == res.data._id) return { ...res.data }
        return { ...doccategory }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getDoccategory = async ({ id }) => {
    let { data } = await api({
      url: `api/doccategory/${id}`
    })
    return data
  }

  const getTranslateDoccategory = async ({ id, language }) => {
    let { data } = await api({
      url: `api/doccategory/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `doccategory/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    doccategorys,
    doccategory,
    doccategorysCount,
    getDoccategorys,
    bySlug,
    getTranslateDoccategory,
    getDoccategory,
    addDoccategory,
    getAllDoccategorys,
    deleteDoccategory,
    statusDoccategory,
    saveDoccategory
  }
})
