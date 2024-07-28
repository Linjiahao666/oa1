<template>
  <div class="flex flex-row items-center justify-center flex-auto">
    <el-form
      class="rounded-xl border-2 border-el px-8 py-8 w-2/5 relative will-change-transform"
      :model="formData"
      label-width="auto"
      status-icon
      :rules="rules"
      ref="formRef"
    >
      <base-toggle></base-toggle>
      <!-- <h1 class="text-3xl w-full text-center pb-4">
        Login
      </h1> -->
      <base-logo></base-logo>
      <el-form-item :label="LOGIN_FORM_LABEL.ACCOUNT" prop="account">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item :label="LOGIN_FORM_LABEL.PASSWORD" prop="password">
        <el-input type="password" v-model="formData.password"></el-input>
      </el-form-item>
      <el-form-item
        :label="LOGIN_FORM_LABEL.ASSUREPASSWORD"
        prop="assurePassword"
      >
        <el-input type="password" v-model="formData.assurePassword"></el-input>
      </el-form-item>
      <el-form-item
        class="relative"
        :label="LOGIN_FORM_LABEL.VALIDATEKEY"
        prop="validateKey"
      >
        <el-input class="w-2/4" v-model="formData.validateKey"></el-input>
        <div
          class="w-1/4 absolute right-0 border-2 border-white bg-slate-500 rounded-xl text-center"
        >
          yzm
        </div>
      </el-form-item>
      <el-form-item class="relative mt-12">
        <el-button
          class="w-2/5 absolute left-1/2 -translate-x-1/2"
          type="primary"
          @click="submitForm(formRef)"
          >login</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import BaseLogo from "../components/BaseLogo.vue";
import BaseToggle from "../components/BaseToggle.vue";
import { reactive, ref } from "vue";
import { loginFormData, LOGIN_FORM_LABEL } from "../const/loginFormData";
import type { FormInstance, FormRules } from "element-plus";
const formData = reactive<loginFormData>({
  account: "",
  password: "",
  assurePassword: "",
  validateKey: "",
});

const formRef = ref<FormInstance>();

const rules = reactive<FormRules<typeof formData>>({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  assurePassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value !== formData.password) {
          callback(new Error("两次输入密码不一致"));
        } else {
          callback();
        }
      },
    },
  ],
  validateKey: [{ required: true, message: "请输入验证码 ", trigger: "blur" }],
});

function submitForm(form: FormInstance) {
  form.validate((valid: any) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!");
    }
  });
}
</script>

<style scoped lang="scss"></style>
