<template>
  <div class="w-full h-full bg-slate-100" id="wrapper"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Paper } from "./utils/core";
// import { ga, gr } from "./utils/listen.ts";

const activeElement = ref(undefined);
onMounted(() => {
  const paper = new Paper({
    wrapper: "#wrapper",
    color: "#f8e",
  });
  paper.init();
});
</script>

<style scoped lang="scss"></style>
