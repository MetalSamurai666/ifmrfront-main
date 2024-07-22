import { api } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useRoomStore = defineStore('useRoomStore', () => {
  const rooms = ref([])
  const roomsCount = ref(0)
  const room = ref({})

  const addRoom = async (data) => {
    let newRoom = await api({
      url: 'api/room',
      method: 'post',
      data
    })
    rooms.value = [newRoom.data, ...rooms.value]
    roomsCount.value += 1
    ElMessage.success('Добавлено')
  }

  const getAllRooms = async (params) => {
    rooms.value = []
    roomsCount.value = 0
    let { data } = await api({
      url: `api/room`,
      params
    })

    rooms.value = [...data.data]
    roomsCount.value = data.count
  }

  const getRooms = async (params) => {
    rooms.value = []
    roomsCount.value = 0
    let { data } = await api({
      url: `v1/room`,
      params
    })
    rooms.value = [...data]
  }

  const deleteRoom = async (id) => {
    await api({
      url: `api/room/${id}`,
      method: 'delete'
    })
    rooms.value = rooms.value.filter((room) => room._id !== id)
    roomsCount.value -= 1
    ElMessage.warning('Удалено')
  }

  const statusRoom = async (data) => {
    await api({
      url: `api/room/${data._id}/${data.status}`
    })
    rooms.value = [
      ...rooms.value.map((room) => {
        return {
          ...room,
          status: room._id == data._id ? data.status : room.status
        }
      })
    ]
    ElMessage.warning('Статус изменено')
  }

  const saveRoom = async (data) => {
    console.log(data)
    let res = await api({
      url: `api/room`,
      method: 'put',
      data
    })
    console.log(res.data)
    rooms.value = [
      ...rooms.value.map((room) => {
        if (room._id == res.data._id) return { ...res.data }
        return { ...room }
      })
    ]
    ElMessage.success('Сохранено')
  }

  const getRoom = async ({ id }) => {
    let { data } = await api({
      url: `api/room/${id}`
    })
    return data
  }

  const getTranslateRoom = async ({ id, language }) => {
    let { data } = await api({
      url: `api/room/translate/${id}/${language}`
    })
    return data
  }

  const bySlug = async (slug, language) => {
    let { data } = await api({
      url: `room/${slug}`,
      params: {
        language
      }
    })
    return data
  }

  return {
    rooms,
    room,
    roomsCount,
    getRooms,
    bySlug,
    getTranslateRoom,
    getRoom,
    addRoom,
    getAllRooms,
    deleteRoom,
    statusRoom,
    saveRoom
  }
})
