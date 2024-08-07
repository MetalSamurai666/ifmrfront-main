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
      <el-form-item label="Заголовок вакансии" prop="title">
        <el-input v-model="data.title" />
      </el-form-item>
      <el-form-item v-if="data.language == 'ru'" label="Время приема документов" prop="date">
        <el-date-picker
          v-model="data.date"
          type="daterange"
          range-separator="до"
          start-placeholder="Начала приёма"
          end-placeholder="Окончание время приёма"
        />
      </el-form-item>
      <el-form-item v-if="data.language == 'ru'" label="Ссылка к вакансии" prop="link">
        <el-input v-model="data.link" />
      </el-form-item>
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
import { ref, watch } from 'vue'
const emits = defineEmits(['close', 'save', 'checkslug'])
const props = defineProps(['toggle', 'id', 'type', 'option', 'vacancy'])
const dialogToggle = ref(false)
const lockToggle = ref(false)

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
  ],
  date: [
    {
      required: true,
      message: 'Заполните поля'
    }
  ],
  link: [
    {
      required: true,
      message: 'Заполните поля'
    }
  ]
})

const close = async () => {
  emits('close')
  dialogToggle.value = false
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
      // console.log({
      //   ...data.value,
      //   from: new Date(data.value.date.at(0)),
      //   to: new Date(data.value.date.at(1))
      // })
      emits('save', { ...data.value, from: data.value.date.at(0), to: data.value.date.at(1) })
      close()
    }
  })
}

watch(
  () => props.toggle,
  async (to) => {
    if (props.type) data.value = { ...props.vacancy }
    else
      data.value = {
        language: 'ru'
      }
    console.log(data.value)
    dialogToggle.value = to
  }
)
</script>

<style></style>
