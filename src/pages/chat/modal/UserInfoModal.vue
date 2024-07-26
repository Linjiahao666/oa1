<template>
  <div class="h-full w-full bg-slate-700 bg-opacity-80 absolute top-0 left-0">
    <div class="absolute top-1/2 left-1/2 h-3/4 w-1/3 -translate-x-1/2 -translate-y-1/2 bg-slate-600 rounded">

      <head class="flex flex-row h-8 justify-end items-center mr-2">
        <el-icon class="text-xl" @click="closeModal">
          <Close />
        </el-icon>
      </head>
    </div>
  </div>
</template>

<script setup>
import { useBus } from '@/hooks/useBus.ts'
const { bus } = useBus()
function closeModal() {
  bus.emit('close:modal')
}
</script>

<style scoped lang='scss'></style>