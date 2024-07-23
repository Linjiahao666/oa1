<template>
  <div class="flex-auto">
    <el-input class="w-full h-full  overflow-hidden" v-model="text" type="textarea" placeholder="Please input" />
  </div>
</template>

<script setup>
import { ref } from 'vue';

const text = ref('');
</script>

<style scoped lang='scss'>
@import '@/style/preload.scss';

:deep(.el-textarea__inner) {
  box-shadow: none !important;
  resize: none;
  @include scrollBar;
}
</style>