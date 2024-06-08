<template>
  <section class="usefull pt-80 md-pt-40 pb-80 md-pb-40">
    <div class="container">
      <h2 class="mb-30 md-mb-10">
        <img src="@/assets/img/icons/link.svg" alt="" />
        {{ $t('message.useful.title') }}
      </h2>
      <el-row :gutter="30">
        <el-col :md="12" :xs="24" v-for="item of 6" :key="item">
          <a href="#" class="link">
            <img src="@/assets/img/icons/gerb.svg" alt="" />
            {{ $t('message.useful.info') }}
          </a>
        </el-col>
      </el-row>
    </div>
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.link {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  font-size: 16px;
  margin-bottom: 10px;
  border-bottom: 1px solid #aaaaaa;
  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 0;
  }
}

</style>
