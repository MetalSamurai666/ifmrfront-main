import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConnectStore = defineStore('useConnectStore', () => {
  const connects = ref([])
  const connectsCount = ref(0)
  const connect = ref({})

  const addConnect = async (data) => {
    let newConnect = await api({
      url: 'api/connect',
      method: 'post',
      data
    })
    connects.value = [newConnect.data, ...connects.value]
    connectsCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllConnects = async (params) => {
    connects.value = []
    connectsCount.value = 0
    let { data } = await api({
      url: `api/connect`,
      params
    })
    console.log(data.data)
    connects.value = [...data.data]
    connectsCount.value = data.count
  }

  const getConnects = async (params) => {
    connects.value = []
    connectsCount.value = 0
    let { data } = await api({
      url: `v1/connect`,
      params
    })
    connects.value = [...data]
  }

  const deleteConnect = async (id) => {
    await api({
      url: `api/connect/${id}`,
      method: 'delete'
    })
    connects.value = connects.value.filter((connect) => connect._id !== id)
    connectsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusConnect = async (data) => {
    await api({
      url: `api/connect/${data._id}/${data.status}`
    })
    connects.value = [
      ...connects.value.map((connect) => {
        return {
          ...connect,
          status: connect._id == data._id ? data.status : connect.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveConnect = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/connect`,
      method: 'put',
      data
    })
    console.log(res.data)
    connects.value = [
      ...connects.value.map((connect) => {
        if (connect._id == res.data._id) return { ...res.data }
        return { ...connect }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getConnect = async ({ id }) => {
    let { data } = await api({
      url: `api/connect/${id}`
    })
    return data
  }

  const getTranslateConnect = async ({ id, language }) => {
    let { data } = await api({
      url: `api/connect/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `connect/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    connects,
    connect,
    connectsCount,
    getConnects,
    bySlug,
    getTranslateConnect,
    getConnect,
    addConnect,
    getAllConnects,
    deleteConnect,
    statusConnect,
    saveConnect
  }
})
