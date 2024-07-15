<template>
  <section class="rating pt-60 mb-80 md-pt-40 md-mb-40 pb-40">
    <div class="container">
      <el-row :gutter="30">
        <el-col :xs="24" :md="12">
          <!-- <h2 class="mb-30">
            <img src="@/assets/img/icons/bigstar.svg" alt="" />
            {{ $t('message.rating.title') }}
          </h2> -->
          
          <!-- <div class="list md-pb-20">
            <div class="item" v-for="item, idx of 5" :key="idx">
              <span> {{ idx + 1 }} {{ $t('message.rating.star') }}: </span>
              <el-progress :stroke-width="15" :percentage="70" color="#E7CE79" />
            </div>
          </div> -->
          <div class="title">{{ $t('message.rating.leaveReview') }}</div>
          <div class="text">
            Здесь вы можете оставить свои обращения, жалобы, вопросы и предложения
          </div>

          <el-form :model="data" label-position="top" class="pt-20">
            <el-form-item :label="$t('message.rating.fullname')">
              <el-input v-model="data.name" />
            </el-form-item>
            <el-form-item :label="$t('message.rating.number')">
              <el-input v-model="data.number" />
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :xs="24" :md="12">
          <el-form :model="data" label-position="top">
            <el-form-item :label="$t('message.rating.mail')">
              <el-input v-model="data.mail" />
            </el-form-item>
            <el-form-item :label="$t('message.rating.review')">
              <el-input v-model="data.comment" type="textarea" :row="4" />
            </el-form-item>
            <div class="d-flex justify-content-end">
              <button class="sendBtn">
                {{ $t('message.rating.send') }}
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

<style lang="scss">
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
  border: 3px solid #fff;
  padding: 12px 16px;
  font-weight: 500;
  color: #fff;
  // img{
  //   filter: invert(1);
  // }
}
.el-rate__icon {
  font-size: 32px;
}

.rating{
  background-image: url('@/assets/img/web.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  color: #fff;
}
.el-form-item__label{
  color: #fff !important;
}
* {
  label{
    color: #fff !important;
  }
}

.sendBtn{
  img{
    filter: invert(1);
  }
}

.el-form-item__label{
  color: #fff !important;
}
</style>
