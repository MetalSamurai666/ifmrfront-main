import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePartnerStore = defineStore('usePartnerStore', () => {
  const partners = ref([])
  const partnersCount = ref(0)
  const partner = ref({})

  const addPartner = async (data) => {
    let newPartner = await api({
      url: 'api/partner',
      method: 'post',
      data
    })
    partners.value = [newPartner.data, ...partners.value]
    partnersCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllPartners = async (params) => {
    partners.value = []
    partnersCount.value = 0
    let { data } = await api({
      url: `api/partner`,
      params
    })
    partners.value = [...data.data]
    partnersCount.value = data.count
  }

  const deletePartner = async (id) => {
    await api({
      url: `api/partner/${id}`,
      method: 'delete'
    })
    partners.value = partners.value.filter((partner) => partner._id !== id)
    partnersCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusPartner = async (data) => {
    await api({
      url: `api/partner/${data._id}/${data.status}`
    })
    partners.value = [
      ...partners.value.map((partner) => {
        return { ...partner, status: partner._id == data._id ? data.status : partner.status }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const savePartner = async (data) => {
    let res = await api({
      url: `api/partner`,
      method: 'put',
      data
    })
    partners.value = [
      ...partners.value.map((partner) => {
        if (partner._id == res.data._id) return { ...res.data }
        return { ...partner }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getPartner = async ({ id }) => {
    let { data } = await api({
      url: `api/partner/${id}`
    })
    return data
  }

  const getTranslatePartner = async ({ id, language }) => {
    let { data } = await api({
      url: `api/partner/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `partner/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    partners,
    partner,
    partnersCount,

    bySlug,
    getTranslatePartner,
    getPartner,
    addPartner,
    getAllPartners,
    deletePartner,
    statusPartner,
    savePartner
  }
})
