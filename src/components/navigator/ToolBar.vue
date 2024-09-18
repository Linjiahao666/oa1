<template>
  <div class="flex flex-row items-center px-4 justify-around w-32">
    <theme-toggle />
    <el-icon class="text-2xl ic">
      <HomeFilled />
    </el-icon>
    <el-icon class="text-2xl ic" @click="goChat"><ChatDotRound /></el-icon>
  </div>
</template>

<script setup>
import ThemeToggle from "./ThemeToggle.vue";
import { router } from "@/router/router";
const goChat = () => {
  router.push("/chat");
};
</script>

<style scoped lang="scss">
i {
  cursor: pointer;
}
.ic {
  margin-right: 10px;
}
.ic:first-child {
  margin-left: 10px;
}
</style>
