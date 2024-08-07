import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useVacancyStore = defineStore('useVacancyStore', () => {
  const vacancys = ref([])
  const vacancysCount = ref(0)
  const vacancy = ref({})

  const addVacancy = async (data) => {
    let newVacancy = await api({
      url: 'api/vacancy',
      method: 'post',
      data
    })
    vacancys.value = [newVacancy.data, ...vacancys.value]
    vacancysCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllVacancys = async (params) => {
    // console.log(params)
    vacancys.value = []
    vacancysCount.value = 0
    let { data } = await api({
      url: `api/vacancy`,
      params
    })
    console.log(data.data)
    vacancys.value = [...data.data]
    vacancysCount.value = data.count
  }

  const deleteVacancy = async (id) => {
    await api({
      url: `api/vacancy/${id}`,
      method: 'delete'
    })
    vacancys.value = vacancys.value.filter((vacancy) => vacancy._id !== id)
    vacancysCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusVacancy = async (data) => {
    await api({
      url: `api/vacancy/${data._id}/${data.status}`
    })
    vacancys.value = [
      ...vacancys.value.map((vacancy) => {
        return { ...vacancy, status: vacancy._id == data._id ? data.status : vacancy.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveVacancy = async (data) => {
    let res = await api({
      url: `api/vacancy`,
      method: 'put',
      data
    })
    vacancys.value = [
      ...vacancys.value.map((vacancy) => {
        if (vacancy._id == res.data._id) return { ...res.data }
        return { ...vacancy }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getVacancy = async ({ id }) => {
    let { data } = await api({
      url: `api/vacancy/${id}`
    })
    return data
  }

  const getTranslateVacancy = async ({ id, language }) => {
    let { data } = await api({
      url: `api/vacancy/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `v1/vacancy/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  const getVacancys = async (params) => {
    vacancys.value = []
    let { data } = await api({
      url: `v1/vacancy`,
      params
    })
    console.log(data)
    vacancys.value = [...data]
  }

  return {
    vacancys,
    vacancy,
    vacancysCount,
    getVacancys,
    bySlug,
    getTranslateVacancy,
    getVacancy,
    addVacancy,
    getAllVacancys,
    deleteVacancy,
    statusVacancy,
    saveVacancy
  }
})
