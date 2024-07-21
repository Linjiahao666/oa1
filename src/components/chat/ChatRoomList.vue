<template>
  <div class="flex flex-col bg-slate-400 bg-opacity-30 w-full h-full ">
    <ChatRoomListSearchBar class="px-4 mt-4" />
    <div class="mt-4 bg-red-200 overflow-y-auto overflow-x-hidden px-4" style="height: calc(100vh - 120px)">
      <ChatRoomListItem v-for="(chatItem, index) in 100" :key="index" :item="chatItem" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import ChatRoomListSearchBar from './ChatRoomListSearchBar.vue';
import ChatRoomListItem from './ChatRoomListItem.vue';
const chatList = ref([1, 2, 3, 4]);

const fetchChatLists = async () => {
  const response = await fetch('https://api.example.com/chat-lists');
  chatLists.value = await response.json();
};
</script>

<style scoped lang="scss"></style>
