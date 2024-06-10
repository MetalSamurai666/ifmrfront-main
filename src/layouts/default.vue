<template>
  <defaultNavbar />

    <RouterView class="router-view" v-slot="{ Component }" >
      <Transition name="page-opacity" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  
  <defaultFooter />
</template>

<script setup>
  import defaultNavbar from '@/components/default/defaultNavbar.vue'
  import defaultFooter from '@/components/default/defaultFooter.vue'
</script>

<style>
.page-opacity-enter-active,
.page-opacity-leave-active{
  transition: .3s ease all;
}

.page-opacity-enter-from,
.page-opacity-leave-to{
  opacity: 0;
}
</style>
