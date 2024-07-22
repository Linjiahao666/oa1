<template>
  <div class="flex flex-col w-full h-full">
    <ChatRoomContentHead />
    <ChatRoomContentBody />
    <ChatRoomContentFooter />
  </div>
</template>

<script setup>
import ChatRoomContentBody from './ChatRoomContentBody.vue';
import ChatRoomContentFooter from './ChatRoomContentFooter.vue';
import ChatRoomContentHead from './ChatRoomContentHead.vue';
</script>

<style scoped lang='scss'></style>