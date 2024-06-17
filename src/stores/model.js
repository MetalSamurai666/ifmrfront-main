import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'

export const mainStore = defineStore('mainStore', () => {
  const state = ref({})

  const allData = async (params) => {
    const result =
      (await api({
        url: params.model,
        params: {
          ...params,
          limit: 20
        }
      })) || []

    const { data, count } = result.data || {}
    console.log(data)
    state.value[params.model] = [...data]
    state.value[`${params.model}_count`] = count
  }

  const addData = async (data, model) => {
    const result = await api({
      url: model,
      data,
      method: 'post'
    }).catch((e) => {
      console.log(e)
      return e
    })

    if (result.status == 201) {
      state.value[model]?.unshift(result.data)
      state.value[`${model}_count`] += 1
      ElMessage.success('Qo`shildi')
      return true
    }
    return false
  }

  const saveData = async (data, model) => {
    const result = await api({
      url: model,
      data,
      method: 'put'
    }).catch((e) => {
      console.log(e)
      return e
    })
    if (result.status == 201) {
      state.value[model] = state.value[model].map((item) => {
        if (item._id == data._id) return result.data
        return item
      })
      ElMessage.success('Yangilandi')
      return true
    }
    return false
  }

  

  const deleteData = async (model, id) => {
    console.log(model, id)

    await api({
      method: 'delete',
      url: `${model}/${id}`
    })

    state.value[model] = state.value[model]?.filter((item) => item._id !== id)
    state.value[`${model}_count`] -= 1
    ElMessage.warning('O`chirildi')
  }

  const changeStatus = async (data, model) => {
    await api({
      method: 'put',
      url: `${model}`,
      data
    })

    state.value[model] = state.value[model].map((item) => {
      if (item._id == data._id) {
        return {
          ...item,
          status: data.status
        }
      }
      return item
    })
    ElMessage.warning('Ma`lumot holati o`zgartirildi')
  }

  const getData = async (id, model) => {
    return await api({
      url: `${model}/${id}`
    })
  }

  const getDatas = async (params) => {
    return await api({
      url: `${params.model}`,
      params
    })
  }

  const getDefault = async () => {
    return await api({
      url: 'default'
    })
  }

  return {
    state,
    getDefault,
    changeStatus,
    allData,
    saveData,
    getDatas,
    addData,
    getData,
    deleteData
  }
})
