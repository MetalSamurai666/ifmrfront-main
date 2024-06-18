<template>
  <el-dialog
    v-model="dialogToggle"
    title="Добавить"
    width="600"
    center
    @close="close"
    :close-on-click-modal="false"
  >
    <el-form
      @submit.prevent="save"
      :rules="rules"
      :model="data"
      name="form"
      ref="form"
      label-position="top"
    >
      <el-row :gutter="30">
        <el-col :span="24">
          <el-form-item label="Заголовка слайдера" prop="title">
            <el-input v-model="data.title" @blur="checkingSlug" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item v-if="data.language == 'ru'" label="Фотография слайдер">
            <el-upload
              v-model:file-list="data.img"
              class="avatar-uploader"
              list-type="picture-card"
              :action="`${url}/api/slider/upload`"
              :on-preview="handlePictureCardPreview"
              :headers="{
                Authorization: `Bearer ${cookies.get('sitetoken') || ''}`
              }"
              :limit="1"
            >
              <el-icon><plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="close">Отменить</el-button>
        <el-button type="primary" @click="save" :disabled="lockToggle"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { url, api, checkSlug } from '@/helpers/api'
import cookies from 'vue-cookies'
import { convertToSlug, langs } from '@/stores/env'
import { computed, ref, watch } from 'vue'
import ImageUploader from 'quill-image-uploader'

import 'quill-image-uploader/dist/quill.imageUploader.min.css'

const emits = defineEmits(['close', 'save', 'checkslug'])
const props = defineProps(['toggle', 'id', 'type', 'data', 'option'])
const dialogToggle = ref(false)
const lockToggle = ref(false)
import axios from 'axios'

const form = ref()
const data = ref({
  language: 'ru'
})
const rules = ref({
  title: [
    {
      required: true,
      message: 'Заполните поля'
    }
  ]
})

const list = ref([])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview = () => {
  dialogVisible.value = true
}

const handleUpload = (path) => {
  data.value.img = [...path]
}

const convertSlug = () => {
  if (props.type && props.data?.resslug == data.value.slug) return false
  data.value.slug = convertToSlug(data.value.title)
}

const checkingSlug = async () => {
  if (data.value.slug < 1) return false
  if (props.data?.resslug == data.value.slug) return false
  lockToggle.value = await checkSlug('slider', data.value.slug)
  console.log(lockToggle.value)
}

const close = async () => {
  setTimeout(async () => {
    data.value = {}
    await form.value.resetFields()
  }, 100)
  emits('close')
  dialogToggle.value = false
}

const save = async () => {
  if (!form.value) return
  await form.value.validate(async (valid, fields) => {
    if (valid) {
      // console.log(data.value)
      emits('save', { ...data.value })
      close()
    }
  })
}

watch(
  () => props.toggle,
  async (to) => {
    if (props.type) data.value = { ...props.data }
    else
      data.value = {
        language: 'ru'
      }
    dialogToggle.value = to
  }
)
</script>

<style></style>
