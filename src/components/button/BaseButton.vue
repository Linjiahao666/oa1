<template>
  <el-button>
    <slot>
      {{ text }}
    </slot>
  </el-button>
</template>

<script setup>
defineProps({
  text: {
    type: String,
    default: 'Button'
  }
})
</script>

<style lang="scss" scoped>
:deep(.el-button) {}
</style>