<template>
  <div class="flex flex-col w-full h-full">
    <ChatRoomContentHead />
    <ChatRoomContentBody ref="body" />
    <ChatRoomContentFooter ref="footer" v-drag-size="[120, 150]" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import ChatRoomContentBody from './ChatRoomContentBody.vue';
import ChatRoomContentFooter from './ChatRoomContentFooter.vue';
import ChatRoomContentHead from './ChatRoomContentHead.vue';
</script>

<style scoped lang='scss'></style>