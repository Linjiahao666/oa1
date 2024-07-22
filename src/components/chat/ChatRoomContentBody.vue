<template>
  <div class="overflow-y-auto body scroll-bar">
    <div v-for="i in 100">{{ i }}</div>
  </div>
</template>

<script setup>

</script>

<style scoped lang='scss'>
.body {
  max-height: calc(100vh - 14rem);
}
</style>