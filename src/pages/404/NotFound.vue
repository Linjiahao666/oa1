<template>
  <div class=" w-full h-full flex flex-col items-center justify-center">
    <el-icon class="sm:text-5xl md:text-8xl lg:text-9xl">
      <Sunny v-if="!isDark" />
      <Moon v-else />
    </el-icon>
    <h1 class="lg:text-3xl md:text-2xl font-bold">404 Not Found</h1>
  </div>
</template>

<script setup>
import { useDark } from "@vueuse/core"
const isDark = useDark()
</script>

<style scoped lang='scss'></style>