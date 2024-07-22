<template>
  <div class="flex-shrink-0 flex-grow-0 flex flex-row w-full h-12 items-center">
    <el-skeleton class="h-full" :loading="loading" animated>
      <template #template>
        <div class="h-full w-full flex flex-row items-center">
          <el-skeleton-item variant="image" class="h-8 w-8 rounded-full ml-2" />
          <div class="flex flex-col h-full justify-between py-2">
            <el-skeleton-item variant="text" class="h-3 w-24 ml-4" />
            <el-skeleton-item variant="text" class="h-2 w-12 ml-4" />
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const loading = ref(true)
</script>

<style scoped lang='scss'></style>