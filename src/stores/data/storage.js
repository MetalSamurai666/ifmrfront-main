import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStorageStore = defineStore('useStorageStore', () => {
  const storages = ref([])
  const storagesCount = ref(0)
  const storage = ref({})

  const addStorage = async (data) => {
    let newStorage = await api({
      url: 'api/storage',
      method: 'post',
      data
    })
    storages.value = [newStorage.data, ...storages.value]
    storagesCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllStorages = async (params) => {
    storages.value = []
    storagesCount.value = 0
    let { data } = await api({
      url: `api/storage`,
      params
    })

    storages.value = [...data.data]
    storagesCount.value = data.count
  }

  const getStorages = async (params) => {
    storages.value = []
    storagesCount.value = 0
    let { data } = await api({
      url: `v1/storage`,
      params
    })
    storages.value = [...data]
  }

  const deleteStorage = async (id) => {
    await api({
      url: `api/storage/${id}`,
      method: 'delete'
    })
    storages.value = storages.value.filter((storage) => storage._id !== id)
    storagesCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusStorage = async (data) => {
    await api({
      url: `api/storage/${data._id}/${data.status}`
    })
    storages.value = [
      ...storages.value.map((storage) => {
        return {
          ...storage,
          status: storage._id == data._id ? data.status : storage.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveStorage = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/storage`,
      method: 'put',
      data
    })
    console.log(res.data)
    storages.value = [
      ...storages.value.map((storage) => {
        if (storage._id == res.data._id) return { ...res.data }
        return { ...storage }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getStorage = async ({ id }) => {
    let { data } = await api({
      url: `api/storage/${id}`
    })
    return data
  }

  const getTranslateStorage = async ({ id, language }) => {
    let { data } = await api({
      url: `api/storage/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `storage/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    storages,
    storage,
    storagesCount,
    getStorages,
    bySlug,
    getTranslateStorage,
    getStorage,
    addStorage,
    getAllStorages,
    deleteStorage,
    statusStorage,
    saveStorage
  }
})
