import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useSliderStore = defineStore('useSliderStore', () => {
  const sliders = ref([])
  const slidersCount = ref(0)
  const slider = ref({})

  const addSlider = async (data) => {
    let newSlider = await api({
      url: 'api/slider',
      method: 'post',
      data
    })
    sliders.value = [newSlider.data, ...sliders.value]
    slidersCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllSliders = async (params) => {
    sliders.value = []
    slidersCount.value = 0
    let { data } = await api({
      url: `api/slider`,
      params
    })
    sliders.value = [...data.data]
    slidersCount.value = data.count
  }

  const deleteSlider = async (id) => {
    await api({
      url: `api/slider/${id}`,
      method: 'delete'
    })
    sliders.value = sliders.value.filter((slider) => slider._id !== id)
    slidersCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusSlider = async (data) => {
    await api({
      url: `api/slider/${data._id}/${data.status}`
    })
    sliders.value = [
      ...sliders.value.map((slider) => {
        return { ...slider, status: slider._id == data._id ? data.status : slider.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveSlider = async (data) => {
    let res = await api({
      url: `api/slider`,
      method: 'put',
      data
    })
    sliders.value = [
      ...sliders.value.map((slider) => {
        if (slider._id == res.data._id) return { ...res.data }
        return { ...slider }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getSlider = async ({ id }) => {
    let { data } = await api({
      url: `api/slider/${id}`
    })
    return data
  }

  const getTranslateSlider = async ({ id, language }) => {
    let { data } = await api({
      url: `api/slider/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `slider/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    sliders,
    slider,
    slidersCount,

    bySlug,
    getTranslateSlider,
    getSlider,
    addSlider,
    getAllSliders,
    deleteSlider,
    statusSlider,
    saveSlider
  }
})
