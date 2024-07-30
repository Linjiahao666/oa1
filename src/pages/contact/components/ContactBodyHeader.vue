<template>
  <div
    class="flex flex-row justify-between w-full h-12 items-center px-2 flex-shrink-0 flex-grow-0 border-b-2 border-el">
    <h1>{{ title }}</h1>
    <el-button @click="setFn">{{ setName }}</el-button>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
const { title, setFn, setName } = defineProps({
  title: {
    type: String,
    default: 'company-A'
  },
  setFn: {
    type: Function,
    default: () => { }
  },
  setName: {
    type: String,
    default: 'set A'
  }
}) 
</script>

<style scoped lang='scss'></style>