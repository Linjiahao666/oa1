<template>
  <div class="rounded-full">
    <el-input v-model="searchContent" :suffix-icon="Search" @blur="handleSearch" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
const searchContent = ref('')
const emit = defineEmits(['search'])
function handleSearch() {
  emit('search')
}
</script>

<style scoped lang="scss">
:deep(.el-input__wrapper) {
  border-radius: 9999px;
}
</style>