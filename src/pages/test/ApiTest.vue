<template>
  <div class="flex flex-col h-full w-full">
    <h1 class="text-center">api-test</h1>
    <div class="flex flex-col justify-center items-center w-48">
      <el-input v-model="formData.username"></el-input>
      <el-input v-model="formData.password"></el-input>
      <el-button @click="login(formData.username, formData.password)"
        >login</el-button
      >
      <el-button @click="getUserInfo(1)">获取保护接口</el-button>
    </div>
  </div>
</template>

<script setup>
import { login, getUserInfo } from "@/api/user";
const formData = reactive({
  username: "",
  password: "",
});
</script>

<style scoped lang="scss"></style>
