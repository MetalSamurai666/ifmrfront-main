<template>
  <section class="usefull pt-80 pb-80">
    <div class="container">
      <h2 class="mb-30">
        <img src="@/assets/img/icons/link.svg" alt="" />
        Полезные ссылки
      </h2>
      <el-row :gutter="30">
        <el-col :md="12" :xs="24" v-for="item of 6" :key="item">
          <a href="#" class="link">
            <img src="@/assets/img/icons/gerb.svg" alt="" />
            Министерство развития информационных технологий и коммуникаций Республики Узбекистан
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
}
</style>
