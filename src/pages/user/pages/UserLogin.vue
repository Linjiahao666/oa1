<template>
  <div class="flex flex-row items-center justify-center flex-auto">
    <el-form class="rounded-xl border-2 border-el px-8 py-8 w-2/5 relative will-change-transform" :model="formData" label-width="auto">
      <base-toggle></base-toggle>
      <!-- <h1 class="text-3xl w-full text-center pb-4">
        Login
      </h1> -->
      <base-logo></base-logo>
      <el-form-item :label="LOGIN_FORM_LABEL.ACCOUNT">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item :label="LOGIN_FORM_LABEL.PASSWORD">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item class='relative' :label="LOGIN_FORM_LABEL.VALIDATEKEY">
        <el-input class="w-2/4" v-model="formData.validateKey"></el-input>
        <div class="w-1/4 absolute right-0 border-2 border-white bg-slate-500 rounded-xl text-center">yzm</div>
      </el-form-item>
      <el-form-item class="relative mt-12">
        <el-button class="w-2/5 absolute left-1/2 -translate-x-1/2" type="primary"
          @click="handleLogin">login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import BaseLogo from '../components/BaseLogo.vue'
import BaseToggle from '../components/BaseToggle.vue';
import { reactive } from 'vue';
import { loginFormData, LOGIN_FORM_LABEL } from '../const/loginFormData';
const formData = reactive<loginFormData>({
  account: '',
  password: '',
  validateKey: ''
})

function handleLogin() {

}
</script>

<style scoped lang='scss'></style>