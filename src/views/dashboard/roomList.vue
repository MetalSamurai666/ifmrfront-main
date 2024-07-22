<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'

import roomDialog from '@/components/room/room-dialog.vue'
import roomTable from '@/components/room/room-table.vue'

import router from '@/router'
import { useRoomStore } from '@/stores/data/room'
const store = useRoomStore()
const { rooms, roomsCount } = storeToRefs(store)

const toggle = ref(false)
const type = ref(false)
const room = ref({})
const page = ref(1)
const limit = ref(20)
const search = ref({})
const handleSave = async (value) => {
  let data = {    
    translates: [
      {
        title: value.title,
        language: value.language || 'ru',        
      }
    ]
  }
  if (type.value) {
    await store.saveRoom({
      _id: value._id,
      ...data
    })
  } else {
    await store.addRoom({ ...data })
  }
}

const handleEdit = async ({ id, language = null }) => {
  room.value = await store.getTranslateRoom({ id, language })
  let { key, ...translate } = room.value
  console.log(room.value)
  room.value = {
    ...key,    
    language: translate.language,
    title: translate.title,    
  }
  type.value = true
  toggle.value = true
}

const handleRemove = async (id) => {
  await store.deleteRoom(id)
}

const handleStatus = async (val) => {
  await store.statusRoom(val)
}

const handleClose = () => {
  toggle.value = false
  type.value = false
  room.value = {}
}

const handleOpen = () => {
  toggle.value = true
}

const getDate = async () => {
  window.scrollTo(0, 0)
  router.push({
    path: '/dashboard/room',
    query: { page: page.value }
  })
  await store.getAllRooms({
    page: page.value,
    limit: limit.value,
    search: search.value || {}
  })
}

const handleCurrentChange = async (val) => {
  page.value = val
  await getDate()
}

onMounted(async () => {
  await getDate()
})
</script>

<template>
  <div class="head mb-20">
    <div class="df align-item-center">
      <h1>Тип помещений</h1>
    </div>

    <div class="df align-item-center">
      <el-button type="primary" @click="handleOpen" class="add__btn">
        <el-icon>
          <plus />
        </el-icon>
        <span class="add__title">Добавить</span>
      </el-button>
    </div>
  </div>
  <room-table
    :data="rooms"
    :room="page"
    @remove="handleRemove"
    @edit="handleEdit"
    @status="handleStatus"
  />
  <div class="text-center mt-1" v-if="roomsCount > limit">
    <el-pagination
      :current-room="room"
      background
      @current-change="handleCurrentChange"
      :room-size="limit"
      :total="roomsCount"
    >
    </el-pagination>
  </div>
  <room-dialog @close="handleClose" @save="handleSave" :toggle="toggle" :type="type" :room="room" />
</template>

<style></style>
