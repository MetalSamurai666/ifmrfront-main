<template>
  <section class="rating pt-60 mb-80">
    <div class="container">
      <el-row :gutter="30">
        <el-col :xs="24" :md="12">
          <h2 class="mb-30">
            <img src="@/assets/img/icons/bigstar.svg" alt="" />
            Рейтинг сайта
          </h2>
          <div class="list">
            <div class="item" v-for="item of 5" :key="item">
              <span> 5 звёзд: </span>
              <el-progress :stroke-width="15" :percentage="70" color="#E7CE79" />
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :md="12">
          <div class="title">Оставьте ваш отзыв</div>
          <el-form :model="data" label-position="top">
            <el-form-item label="Ваша оценка">
              <el-rate v-model="data.rate" allow-half size="large" />
            </el-form-item>
            <el-form-item label="Ф. И. О.">
              <el-input v-model="data.name" />
            </el-form-item>
            <el-form-item label="Отзыв">
              <el-input v-model="data.comment" type="textarea" :row="4" />
            </el-form-item>
            <div class="d-flex justify-content-end">
              <button>
                Отправить
                <img src="@/assets/img/icons/send.svg" alt="" />
              </button>
            </div>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const percentage = ref(20)
const data = ref({})
</script>

<style lang="scss" scoped>
.el-progress-bar__outer {
  border-radius: 4px !important;
}
.el-progress {
  flex: 1;
}
.item {
  display: flex;
  gap: 10px;
  font-size: 16px;
}
.list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}
.title {
  font-size: 32px;
  margin-bottom: 16px;
  font-weight: 600;
}
.el-textarea > *,
.el-input > * {
  background-color: #f2f2f2;
  resize: false;
}
.el-form--default.el-form--label-top .el-form-item div.el-form-item__label {
  font-size: 16px;
  font-family: 'Roboto Slab';
}
button {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  border: 3px solid #000;
  padding: 12px 16px;
  font-weight: 500;
}
.el-rate__icon {
  font-size: 32px;
}
</style>
