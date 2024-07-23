<template>
  <div class="flex flex-col w-full h-full border-r-2 border-el" @click="handleClick">
    <ChatRoomListSearchBar class="px-4 mt-4" @search="handleSearch" />
    <div class="mt-4 overflow-y-auto overflow-x-hidden px-4 list scroll-bar">
      <ChatRoomListItem class='hover:opacity-80 duration-300' v-for="(chatItem, index) in 100" :key="index"
        :item="chatItem" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ChatRoomListSearchBar from './ChatRoomListSearchBar.vue';
import ChatRoomListItem from './ChatRoomListItem.vue';
const chatList = ref([1, 2, 3, 4]);
const emit = defineEmits(['listItemClick']);
const fetchChatLists = async () => {
  const response = await fetch('https://api.example.com/chat-lists');
  chatList.value = await response.json();
};

function handleClick(): void {
  emit('listItemClick')
}

function handleSearch() {
  console.log(123);
}
</script>

<style scoped lang="scss">
.list {
  height: calc(100vh - 7rem);
}
</style>
