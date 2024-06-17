<template>
  <!-- <el-image v-if="type == 'photo'" :src="`${url}/${imageUrl}`" fit="cover" /> -->
  <div class="image"></div>
  <el-upload
    class="upload"
    drag
    :action="`${url}/upload/${model}`"
    :headers="{
      authorization: `Bearer ${cookies.get('test-token')}`
    }"
    :on-success="handleUpload"
    multiple
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">Загружите файл</div>
    <template #tip>
      <div class="el-upload__tip">Максималный размер файла 1мб</div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { UploadProps, UploadUserFile } from 'element-plus'
import { ref } from 'vue'
import cookies from 'vue-cookies'
import { url } from '../helpers/api'

const props = defineProps(['model', 'type'])
const emits = defineEmits(['uploaded'])

const fileList = ref<UploadUserFile[]>([])
const imageUrl = ref('')

const handleUpload = (file) => {
  console.log(file)

  emits('uploaded', file)
}
</script>

<style lang="scss" scoped>
.upload {
  width: 100%;
}
</style>
<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>
