<template>
  <div class=" border-el  border-b-2 shadow-lg relative flex flex-row justify-between items-center px-2 py-1">
    <a href="#" class="text-3xl flex items-center">
      <el-icon>
        <OfficeBuilding />
      </el-icon>
    </a>
    <tool-bar />
  </div>
</template>

<script setup>
import ToolBar from './ToolBar.vue';
</script>

<style scoped lang='scss'></style>