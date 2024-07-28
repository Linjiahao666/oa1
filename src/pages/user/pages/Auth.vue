<template>
  <div>
    <el-button @click="userlogin">
      login
    </el-button>
    <el-button @click="getData">
      data
    </el-button>
    <el-button @click="refreshToken">
      refresh
    </el-button>
  </div>
</template>

<script setup>
import { login, req, getAccessToken } from '@/api/request'
async function userlogin() {
  const res = await login()
}
async function getData() {
  const data = await req({
    url: '/protected',
    method: 'get'
  })
}

async function refreshToken() {
  const data = await getAccessToken()
}
</script>

<style scoped lang='scss'></style>