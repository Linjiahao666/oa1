<template>
  <div class="border-el flex-auto h-full relative">
    <div class="scroll-bar h-full w-full absolute overflow-y-auto select-none overflow-x-hidden box-content">
      <ChatRoomContentBodyBar v-for="i in 100" />
    </div>
  </div>
</template>

<script setup>
import ChatRoomContentBodyBar from './ChatRoomContentBodyBar.vue';
</script>

<style scoped lang='scss'></style>