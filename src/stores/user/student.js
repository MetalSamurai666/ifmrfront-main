import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import router from '@/router'

export const studentStore = defineStore('studentStore', () => {
  const studentes = ref([])
  const studentes_count = ref(0)

  const all = async (params) => {
    const result =
      (await api({
        url: 'student',
        params
      })) || []

    const { data, count } = result.data || {}
    console.log(data)
    studentes.value = [...data]
    studentes_count.value = count
  }

  const add = async (data) => {
    await api({
      url: 'student',
      data,
      method: 'post'
    }).catch((e) => {
      console.log(e)
      return e
    })
    ElMessage.success('Yangi abiturient qo`shildi')
    router.push({ name: 'student' })
  }

  const deleteData = async (id) => {
    await api({
      method: 'delete',
      url: `student/${id}`
    })

    studentes.value = studentes.value?.filter((item) => item._id !== id)
    studentes_count.value -= 1
    ElMessage.warning('O`chirildi')
  }

  const savestudent = async (data) => {
    await api({
      method: 'put',
      url: `student`,
      data
    })

    ElMessage.success('student yangilandi')
    router.push({ name: 'student' })
  }

  const getstudent = async (id, isPopulate) => {
    return await api({
      url: `student/${id}`,
      params: {
        isPopulate
      }
    })
  }

  //   const changeStatus = async (data, model) => {
  //     await api({
  //       method: 'put',
  //       url: `${model}`,
  //       data
  //     })

  //     state.value[model] = state.value[model].map((item) => {
  //       if (item._id == data._id) {
  //         return {
  //           ...item,
  //           status: data.status
  //         }
  //       }
  //       return item
  //     })
  //     ElMessage.warning('Ma`lumot holati o`zgartirildi')
  //   }

  //   const getData = async (id, model) => {
  //     return await api({
  //       url: `${model}/${id}`
  //     })
  //   }

  return {
    studentes,
    studentes_count,
    deleteData,
    all,
    savestudent,
    getstudent,
    add
  }
})
