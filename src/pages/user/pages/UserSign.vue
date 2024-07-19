<template>
  <base-page-layout>
    <el-form
      class="rounded-xl border-2 border-el px-8 py-8 w-2/5 relative will-change-transform"
      :model="formData"
    >
      <base-logo></base-logo>
      <base-toggle></base-toggle>
      <el-form-item :label="SIGN_FORM_LABEL.ACCOUNT">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item :label="SIGN_FORM_LABEL.PASSWORD">
        <el-input v-model="formData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item class="relative mt-12">
        <el-button
          class="w-2/5 absolute left-1/2 -translate-x-1/2"
          type="primary"
          @click="handleSign"
          >sign</el-button
        >
      </el-form-item>
    </el-form>
  </base-page-layout>
</template>

<script setup lang="ts">
import BasePageLayout from "../../../components/layout/BasePageLayout.vue";
import BaseLogo from "../components/BaseLogo.vue";
import BaseToggle from "../components/BaseToggle.vue";
import { reactive } from "vue";
import { SIGN_FORM_LABEL, signFormData } from "../const/loginFormData";
const formData = reactive<signFormData>({
  account: "",
  password: "",
});

function handleSign() {}
</script>

<style scoped lang="scss"></style>
