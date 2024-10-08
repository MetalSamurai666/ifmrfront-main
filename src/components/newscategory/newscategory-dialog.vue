<template>
  <el-dialog
    v-model="dialogToggle"
    title="Добавить"
    width="800"
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
          <el-form-item label="Название тип" prop="title">
            <el-input v-model="data.title" @input="convertSlug" @blur="checkingSlug" />
          </el-form-item>
          <el-form-item v-if="data.language == 'ru'" label="Краткое название (для URL)">
            <el-input v-model="data.slug" @blur="checkingSlug" />
            <el-alert
              v-if="lockToggle"
              title="Такое короткое название занята"
              type="error"
              :closable="false"
            />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Краткий текст" class="editor small">
            <QuillEditor
              theme="snow"
              v-model:content="data.description"
              ref="editordesc"
              contentType="html"
            />
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
import { checkSlug } from '@/helpers/api'

import { convertToSlug } from '@/stores/env'
import { ref, watch } from 'vue'

import 'quill-image-uploader/dist/quill.imageUploader.min.css'

const emits = defineEmits(['close', 'save', 'checkslug'])
const props = defineProps(['toggle', 'id', 'type', 'option'])
const dialogToggle = ref(false)
const lockToggle = ref(false)


const editordesc = ref()

const form = ref()
const data = ref({
  language: 'ru'
})
const rules = ref({
  title: [
    {
      required: true,
      message: 'Напишите название категории'
    }
  ]
})



const convertSlug = () => {
  if (props.type && props.data?.resslug == data.value.slug) return false
  data.value.slug = convertToSlug(data.value.title)
}

const checkingSlug = async () => {
  if (data.value.slug < 1) return false
  if (props.data?.resslug == data.value.slug) return false
  lockToggle.value = await checkSlug('newscategory', data.value.slug)

}

const close = async () => {
  emits('close')
  dialogToggle.value = false
  editordesc.value.setHTML('')
  setTimeout(async () => {
    data.value = {}
    if (!form.value) return
    await form?.value?.resetFields()
  }, 100)
}

const save = async () => {
  if (!form.value) return
  await form.value.validate(async (valid) => {
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
