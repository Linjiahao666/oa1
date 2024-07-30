<template>
  <div class="w-64 h-full border-r-2 border-el">
    <div class="h-12 w-full border-b-2 border-el flex flex-row items-center pl-2">
      <el-icon class="text-xl mr-2">
        <Connection />
      </el-icon>
      <h1 class="text-xl">
        通讯录
      </h1>
    </div>
    <TreeSelector />
  </div>
</template>

<script setup>
import TreeSelector from '../../../components/selector/TreeSelector.vue';
</script>

<style scoped lang='scss'></style>