<template>
  <el-dialog
    v-model="toggle"
    :title="editToggle ? 'Tahrirlash' : 'Yangi ma`lumot'"
    @close="closeToggle"
    :width="option?.width || 600"
  >
    <el-form ref="form" :model="data" label-position="top">
      <el-row :gutter="30">
        <el-col
          v-for="(inp, index) of inputs.filter(
            (inp) => !['hidden', 'union', 'populate'].includes(inp.type)
          )"
          :key="index"
          :span="inp.span"
        >
          <el-form-item
            :prop="`${inp.name}`"
            :label="inp.label"
            :rules="
              (inp.type == 'password' && !editToggle) || inp.type !== 'password'
                ? inp.rules || []
                : []
            "
            v-show="inp.type !== 'hidden'"
          >
            <el-input
              class="full__input"
              v-maska="'##############'"
              v-if="['number'].includes(inp.type)"
              v-model="data[inp.name]"
            />
            <el-input-number
              :step="1"
              class="full__input"
              :min="inp.minValue"
              :max="inp.maxValue"
              v-if="['phone'].includes(inp.type)"
              v-model="data[inp.name]"
              v-maska="inp.option?.maska || false"
              :show-password="inp.type == 'password'"
            />
            <el-date-picker
              v-model="data[inp.name]"
              v-if="['date'].includes(inp.type)"
              type="date"
              placeholder="Выберите дату"
            />
            <el-time-select
              v-model="data[inp.name]"
              v-if="['time'].includes(inp.type)"
              start="08:30"
              step="00:05"
              end="18:30"
              placeholder="Выберите время"
            />
            <el-input
              v-if="['input', 'password'].includes(inp.type)"
              :maxlength="inp.maxLength || null"
              v-model="data[inp.name]"
              v-maska="inp.option?.maska || false"
              :show-password="inp.type == 'password'"
            />
            <el-input
              v-if="['phone'].includes(inp.type)"
              v-model="data[inp.name]"
              v-maska="'(##) ###-##-##'"
            >
              <template #prepend>+998</template>
            </el-input>
            <el-input
              v-if="['textarea'].includes(inp.type)"
              v-model="data[inp.name]"
              type="textarea"
              rows="5"
            />
            <uploaderFile
              v-if="['upload', 'file'].includes(inp.type)"
              :model="inp.model"
              @success="
                (file) => {
                  handleUpload(file, inp.name, inp.type)
                }
              "
            />
            <el-select
              v-if="inp.type == 'allow'"
              v-model="data[inp.name]"
              :placeholder="inp.placeholder || ''"
              multiple
              filterable
              allow-create
              default-first-option
              :reserve-keyword="false"
            >
              <el-option
                v-for="item in allowCreate[inp.model]"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-if="inp.type == 'select'"
              v-model="data[inp.name]"
              :placeholder="inp.placeholder || ''"
              filterable
              remote
              clearable
              reserve-keyword
              :remote-method="
                (query) => {
                  removeMethod(query, {
                    search: inp.search,
                    select: inp.select,
                    model: inp.model,
                    api: inp.api,
                    byvalue: inp?.byValue || '',
                    query: inp.query || [],
                    separator: inp.separator || ' '
                  })
                }
              "
            >
              <el-option
                v-for="opt of options[inp.model]"
                :key="opt._id"
                :value="opt._id"
                :label="opt.label"
              />
            </el-select>

            <el-checkbox
              v-if="inp.type == 'checkbox'"
              v-model="data[inp.name]"
              :value="false"
              :label="inp.placeholder"
            />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="closeToggle">Bekor qilish</el-button>
        <el-button type="primary" @click="send(form)" :loading="loadingBtn"> Saqlash </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { api } from '../helpers/api'

const props = defineProps(['inputs', 'option'])
const form = ref()

import { mainStore } from '@/stores/model'
const store = mainStore()

import { useFullStore } from '@/stores/usefull'
import { useRoute } from 'vue-router'

const useFull = useFullStore()
const { toggle, editToggle, id } = storeToRefs(useFull)

const data = ref({})

const loadingBtn = ref(false)
const route = useRoute()
const send = async (formEl) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      props.inputs.forEach((el) => {
        if (el.type == 'hidden') data.value[el.name] = el.default
      })
      // return console.log(valid, formEl.value)
      await store[editToggle.value ? 'saveData' : 'addData'](data.value, route.meta?.api)
      closeToggle()
    } else {
      return false
    }
  })
}

const options = ref({})
const allowCreate = ref({})
const removeMethod = async (query, option) => {
  // console.log(option)

  if (option?.byvalue) {
    option.search[option?.byvalue] = data.value[option?.byvalue]
  }

  let res = await api({
    url: option.api,
    params: {
      select: option.select,
      limit: 20,
      sort: JSON.stringify({ _id: -1 }),
      search: {
        ...option.search,
        query
      }
    }
  })
  // console.log(data.data)
  options.value[option.model] = [
    ...res.data.data.map((item) => {
      let label = ''
      for (let key of option?.select) if (key !== '_id') label += item[key] + option.separator
      return {
        _id: item._id,
        label: label.slice(0, label.length - 1)
      }
    })
  ]
}

const handleUpload = (file, name, type = 'upload') => {
  if (type == 'upload') {
    if (data.value[name]) data.value[name].push(file)
    else data.value[name] = [file]
  }
  if (type == 'file') {
    data.value[name] = file
  }
}

watch(
  () => toggle.value,
  async () => {
    console.log(form)

    props.inputs.forEach((inp) => {
      if (inp.type == 'checkbox') {
        data.value[inp.name] = false
      }
    })
  }
)

watch(
  () => editToggle.value,
  async (to) => {
    if (to && id.value) {
      let res = await store.getData(id.value, route.meta?.api)
      let selectValue = {}
      props.inputs
        ?.filter((opt) => opt.type == 'select')
        .forEach((inp) => {
          let label = ''
          for (let key of inp.select) {
            if (res.data[inp.name][key]) label += res.data[inp.name][key] + ' '
          }

          selectValue[inp.name] = res.data[inp.name]._id

          options.value[inp.model] = [
            {
              _id: res.data[inp.name]._id,
              label
            }
          ]
        })
      data.value = { ...res.data, ...selectValue }
      console.log('edit', data.value)
      useFull.setToggle(true)
    }
  }
)

const closeToggle = () => {
  setTimeout(async () => {
    data.value = {}
    await form.value.resetFields()
  }, 100)
  data.value = useFull.setToggle(false)
  useFull.setEditToggle(false, '')
  data.value = {}
}
</script>

<style lang="scss"></style>
