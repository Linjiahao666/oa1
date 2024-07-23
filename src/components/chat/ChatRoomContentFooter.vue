<template>
  <div class="flex flex-col flex-grow-0 flex-shrink-0 w-full h-40 relative">
    <ChatRoomFooterToolBar />
    <ChatRoomFooterInput />
    <div class="flex w-full h-8 items-start justify-end ">
      <el-button class="mr-4 h-6">发送(s)</el-button>
    </div>
  </div>
</template>

<script setup>
import ChatRoomFooterToolBar from './ChatRoomFooterToolBar.vue';
import ChatRoomFooterInput from './ChatRoomFooterInput.vue';
</script>

<style scoped lang='scss'></style>