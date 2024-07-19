<template>
  <label class="fixed top-8 left-8 hover:-translate-x-1 transition-all inline-flex justify-center items-center  select-none" @click="handleToggle" >
    <el-icon class=" text-xl" >
        <Back />
    </el-icon>
    <span class="text-base ml-1"> {{ backTo }} </span>
  </label>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const routePath = computed(() => route.path.split('/').slice(-1)[0]);
const backTo = computed(() => routePath.value === 'login' ? 'sign' : 'login');
function handleToggle() {
  if (routePath.value === 'login') {
    router.push('/user/sign');
  } else if (routePath.value === 'sign') {
    router.push('/user/login');
  }
}
</script>

<style scoped lang='scss'></style>