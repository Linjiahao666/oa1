<template>
  <div class="flex flex-col h-screen w-screen">
    <base-navigator />
    <router-view></router-view>
  </div>
</template>

<script setup>
import BaseNavigator from "@/components/navigator/BaseNavigator.vue";
</script>

<style scoped lang="scss"></style>
