<template>
  <base-page-layout>
    <el-form
      class="border-2 border-el px-8 py-8 w-2/5 relative will-change-transform"
      :model="formData"
      ref="formRef"
      :rules="rules"
    >
      <base-logo></base-logo>
      <base-toggle></base-toggle>
      <el-form-item :label="SIGN_FORM_LABEL.ACCOUNT" prop="account">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item :label="SIGN_FORM_LABEL.PASSWORD" prop="password">
        <el-input v-model="formData.password" type="password"></el-input>
      </el-form-item>
      <el-form-item class="relative mt-12">
        <el-button
          class="w-2/5 absolute left-1/2 -translate-x-1/2"
          type="primary"
          @click="submitForm(formRef)"
          >登录</el-button
        >
      </el-form-item>
      <div class="mt-8 w-full h-8 flex flex-row items-center justify-center">
        <div
          class="w-2/5 h-full flex flex-row items-center justify-center select-none hover:cursor-pointer border-1 border-el hover:bg-slate-700 hover:bg-opacity-20"
        >
          <el-icon><Search /></el-icon>
          <div class="ml-2 text-[14px] font-light">使用github登录</div>
        </div>
      </div>
    </el-form>
  </base-page-layout>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import BasePageLayout from "../../../components/layout/BasePageLayout.vue";
import BaseLogo from "../components/BaseLogo.vue";
import BaseToggle from "../components/BaseToggle.vue";
import { reactive, ref } from "vue";
import { SIGN_FORM_LABEL } from "../const/loginFormData";
import type { FormInstance } from "element-plus";
import { login } from "@/api/user";
import { router } from "@/router/router";
const formData = reactive({
  account: "",
  password: "",
});
const rules = reactive({
  account: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
});
const formRef = ref();
function submitForm(form: FormInstance) {
  form.validate(async (valid: any) => {
    if (valid) {
      try {
        await login(formData.account, formData.password);
        // 持久化用户信息
        router.push("/");
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log("error");
    }
  });
}
</script>

<style scoped lang="scss"></style>
