import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCategoryStore = defineStore('useCategoryStore', () => {
  const categorys = ref([])
  const categorysCount = ref(0)
  const category = ref({})

  const addCategory = async (data) => {

    let newCategory = await api({
      url: 'api/category',
      method: 'post',
      data
    })
    categorys.value = [newCategory.data, ...categorys.value]
    categorysCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllCategorys = async (params) => {
    categorys.value = []
    categorysCount.value = 0
    let { data } = await api({
      url: `api/category`,
      params
    })
    categorys.value = [...data.data]
    categorysCount.value = data.count
  }

  const getCategorys = async (params) => {
    categorys.value = []
    categorysCount.value = 0
    let { data } = await api({
      url: `v1/category`,
      params
    })
    categorys.value = [...data]
  }

  const deleteCategory = async (id) => {
    await api({
      url: `api/category/${id}`,
      method: 'delete'
    })
    categorys.value = categorys.value.filter((category) => category._id !== id)
    categorysCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusCategory = async (data) => {
    await api({
      url: `api/category/${data._id}/${data.status}`
    })
    categorys.value = [
      ...categorys.value.map((category) => {
        return { ...category, status: category._id == data._id ? data.status : category.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveCategory = async (data) => {
    let res = await api({
      url: `api/category`,
      method: 'put',
      data
    })
    categorys.value = [
      ...categorys.value.map((category) => {
        if (category._id == res.data._id) return { ...res.data }
        return { ...category }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getCategory = async ({ id }) => {
    let { data } = await api({
      url: `api/category/${id}`
    })
    return data
  }

  const getTranslateCategory = async ({ id, language }) => {
    let { data } = await api({
      url: `api/category/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `category/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    categorys,
    category,
    categorysCount,
    getCategorys,
    bySlug,
    getTranslateCategory,
    getCategory,
    addCategory,
    getAllCategorys,
    deleteCategory,
    statusCategory,
    saveCategory
  }
})
