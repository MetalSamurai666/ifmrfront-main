<template>
  <!-- <el-image v-if="type == 'photo'" :src="`${url}/${imageUrl}`" fit="cover" /> -->
  <div
    :class="{
      image: true,
      'image-uploaded': imageUrl?.response?.length > 0
    }"
    :style="{
      backgroundImage: imageUrl?.response ? `url('${url}/${imageUrl?.response}')` : ''
    }"
  >
    <el-button
      class="image-remove"
      @click="removeFile(imageUrl?.response)"
      v-show="imageUrl?.response"
    >
      <el-icon><close /></el-icon>
    </el-button>
    <el-upload
      :show-file-list="false"
      class="upload-demo"
      :action="`${url}/upload/employee`"
      :headers="{
        authorization: `Bearer ${cookies.get('test-token')}`
      }"
      :on-change="handleUpload"
    >
      <div class="df justify-center">
        <el-button type="primary">
          <el-icon class="mr-1"><Picture /></el-icon>
          Загрузить фотографии
        </el-button>
      </div>
    </el-upload>
  </div>
</template>

<script setup lang="ts">
import { UploadProps, UploadUserFile } from 'element-plus'
import { ref } from 'vue'
import cookies from 'vue-cookies'
import { url } from '../helpers/api'

const emits = defineEmits(['uploaded', 'remove'])

const fileList = ref([])
const imageUrl = ref({})

const removeFile = (file) => {
  emits('remove', file)
  imageUrl.value = {}
  fileList.value = []
}

const handleUpload = (file) => {
  imageUrl.value = { ...file }

  emits('uploaded', file)
}
</script>

<style lang="scss">
.image {
  width: 100%;
  border: 1px solid $gray-200;
  aspect-ratio: 1/1;
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-size: cover;
  background-position: center;
  &-remove {
    position: absolute;
    right: 10px;
    top: 10px;
    z-index: 1;
  }
  &-uploaded {
    .upload-demo {
      opacity: 0;
      .el-upload {
      }
    }
  }
}
.upload-demo {
  .el-upload {
    width: 100%;
    justify-content: center;
  }
}
</style>
