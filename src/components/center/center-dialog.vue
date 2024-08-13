<template>
  <el-dialog
    v-model="dialogToggle"
    title="Добавить"
    width="70%"
    top="2vh"
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
        <el-col :span="16">
          <el-form-item label="Название центра" prop="title" :rules="blurRule">
            <el-input v-model="data.title" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Рейтинг (балл)" prop="rating" :rules="blurRule">
            <el-input v-model="data.rating" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Область" prop="region" :rules="blurRule">
            <el-select
              @change="getDistricts"
              v-model="data.region"
              placeholder="Выберите из списка"
            >
              <el-option
                v-for="item of regions"
                :key="item._id"
                :label="item.translates?.at(0)?.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Район/город" prop="district" :rules="blurRule">
            <el-select v-model="data.district" placeholder="Выберите из списка">
              <el-option
                v-for="item of districts"
                :key="item._id"
                :label="item?.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="16">
          <el-form-item label="Адрес" prop="address" :rules="blurRule">
            <el-input v-model="data.address" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Код карты (яндекс карты)">
            <el-input v-model="data.map" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Ссылка сайта" prop="site">
            <el-input v-model="data.site" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Общ.Площадь" prop="square" :rules="blurRule">
            <el-input v-model="data.square" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Свободная площадь " prop="freesquare" :rules="blurRule">
            <el-input v-model="data.freesquare" />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Тип склада" prop="type" :rules="blurRule">
            <el-select v-model="data.type" placeholder="Выберите из списка">
              <el-option
                v-for="item of types"
                :key="item._id"
                :label="item.translates?.at(0)?.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Тип хранения" prop="storage" :rules="blurRule">
            <el-select v-model="data.storage" placeholder="Выберите из списка">
              <el-option
                v-for="storage of storages"
                :key="storage._id"
                :label="storage.translates?.at(0)?.title"
                :value="storage._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="Транспортная связь" prop="connect" :rules="blurRule">
            <el-select v-model="data.connect" placeholder="Выберите из списка">
              <el-option
                v-for="item of connects"
                :key="item._id"
                :label="item.translates?.at(0)?.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Классификация" prop="classification" :rules="blurRule">
            <el-select v-model="data.classification" placeholder="Выберите из списка">
              <el-option
                v-for="item of classifications"
                :key="item._id"
                :label="item.translates?.at(0)?.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Специализация" prop="spec" :rules="blurRule">
            <el-select v-model="data.spec" placeholder="Выберите из списка">
              <el-option
                v-for="item of specs"
                :key="item._id"
                :label="item.translates?.at(0)?.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Список специальных услуг " prop="service">
            <el-select v-model="data.service" placeholder="Выберите из списка" multiple filterable>
              <el-option
                v-for="item of services"
                :key="item._id"
                :label="item.translates?.at(0)?.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Вспомогательных помещений" prop="room">
            <el-select v-model="data.room" placeholder="Выберите из списка" multiple filterable>
              <el-option
                v-for="item of rooms"
                :key="item._id"
                :label="item.translates?.at(0)?.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Безопасность" prop="safe">
            <el-select v-model="data.safe" placeholder="Выберите из списка" multiple filterable>
              <el-option
                v-for="item of safes"
                :key="item._id"
                :label="item.translates?.at(0)?.title"
                :value="item._id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <div>Контактные данные:</div>
          <el-row :gutter="30" v-for="(phone, index) of data.phones" :key="index">
            <el-col :span="6">
              <el-form-item :label="index == 0 ? 'Имя контакта/должности' : index">
                <el-input v-model="data.phones[index].who" placeholder="Название контакта" />
              </el-form-item>
            </el-col>
            <el-col :span="18">
              <el-form-item :label="index == 0 ? 'Номер телефон' : ''">
                <div
                  class="mr-10 mb-10"
                  v-for="(numb, numbIndex) of phone.numbers"
                  :key="`number-${numbIndex}`"
                >
                  <el-input
                    v-maska="'+998 (##) ###-##-##'"
                    v-model="data.phones[index].numbers[numbIndex]"
                  />
                </div>

                <el-button @click="addNumber(index)" type="primary">
                  <el-icon> <plus /> </el-icon>Добавить телефон
                </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-button @click="addContact" type="primary">
            <el-icon> <plus /> </el-icon>Добавить контакт
          </el-button>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Наличие дополнительных услуг">
            <el-input v-model="data.text" type="textarea" :rows="4" />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="Логотип">
            <el-upload
              v-model:file-list="data.logo"
              class="avatar-uploader"
              list-type="picture-card"
              :action="`${url}/api/center/upload`"
              :headers="{
                Authorization: `Bearer ${cookies.get('sitetoken') || ''}`
              }"
              :limit="1"
            >
              <el-icon><plus /></el-icon>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="18">
          <el-form-item label="Галерея">
            <el-upload
              v-model:file-list="data.img"
              multiple
              class="avatar-uploader"
              list-type="picture-card"
              :action="`${url}/api/center/upload`"
              :headers="{
                Authorization: `Bearer ${cookies.get('sitetoken') || ''}`
              }"
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
import { vMaska } from 'maska/vue'

import { ref, watch } from 'vue'
const emits = defineEmits(['close', 'save', 'checkslug'])
const props = defineProps(['toggle', 'id', 'type', 'option', 'center'])
const dialogToggle = ref(false)
const lockToggle = ref(false)
import { url } from '@/helpers/api'

import cookies from 'vue-cookies'

const form = ref()
const data = ref({
  language: 'ru'
})

const blurRule = [
  {
    required: true,
    message: 'Заполните поля'
  }
]
const rules = ref({
  title: [
    {
      required: true,
      message: 'Напишите название категории'
    }
  ]
})

import { storeToRefs } from 'pinia'

import { useStorageStore } from '@/stores/data/storage'
const storage_store = useStorageStore()
const { storages } = storeToRefs(storage_store)

import { useTypeStore } from '@/stores/data/type'
const type_store = useTypeStore()
const { types } = storeToRefs(type_store)

import { useRoomStore } from '@/stores/data/room'
const room_store = useRoomStore()
const { rooms } = storeToRefs(room_store)

import { useServiceStore } from '@/stores/data/service'
const service_store = useServiceStore()
const { services } = storeToRefs(service_store)

import { useSafeStore } from '@/stores/data/safe'
const safe_store = useSafeStore()
const { safes } = storeToRefs(safe_store)

import { useConnectStore } from '@/stores/data/connect'
const connect_store = useConnectStore()
const { connects } = storeToRefs(connect_store)

import { useClassificationStore } from '@/stores/data/classification'
const classification_store = useClassificationStore()
const { classifications } = storeToRefs(classification_store)

import { useSpecStore } from '@/stores/data/spec'
const spec_store = useSpecStore()
const { specs } = storeToRefs(spec_store)

import { useRegionStore } from '@/stores/data/region'
const region_store = useRegionStore()
const { regions } = storeToRefs(region_store)

import { placeStore } from '@/stores/data/place'
const place_store = placeStore()

const districts = ref([])
const getDistricts = async () => {
  let res = await place_store.getDistricts({
    region: data.value.region
  })
  console.log(res.data)
  districts.value = [...res.data]
}

const addNumber = (index) => {
  data.value.phones[index].numbers.push('')
}

const addContact = () => {
  data.value.phones.push({
    who: '',
    numbers: ['']
  })
}

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
      // console.log(data.value)
      emits('save', { ...data.value })
      close()
    }
  })
}

watch(
  () => props.toggle,
  async (to) => {
    if (props.type) {
      data.value = { ...props.center }
      if (data.value.region) {
        await getDistricts()
      }
    } else
      data.value = {
        language: 'ru',
        phones: [
          {
            who: '',
            numbers: ['']
          }
        ]
      }
    console.log(data.value)
    dialogToggle.value = to
  }
)
</script>

<style></style>
