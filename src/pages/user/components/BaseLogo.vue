<template>
  <div class="flex w-full flex-row justify-center items-center mb-4">
    <el-icon class="text-8xl">
      <Sunrise v-if="!isDark" />
      <MoonNight v-else />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { useDark } from '@vueuse/core'
const isDark = useDark()
</script>